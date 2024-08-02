import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import sendIcon from "../images/SocialPage/보내기.png";
import defaultProfileImage from "../pages/images/기본프로필이미지.png"; // 기본 프로필 이미지

const BASE_URL = "https://drinkit.pythonanywhere.com/";

// 친구 목록 가져오기 API 호출 함수
export const getFriendList = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}accounts/friends/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 로컬 스토리지에서 토큰을 가져옵니다.
      },
    });
    const friendsList = response.data.friends_list.map((friend) => ({
      ...friend,
      image: friend.image ? `${BASE_URL}${friend.image}` : defaultProfileImage, // 이미지가 있는 경우 URL을 설정, 없으면 기본 이미지 사용
    }));
    return friendsList;
  } catch (error) {
    console.error("친구 목록을 가져오는 중 오류 발생:", error);
    return [];
  }
};

const getPercentageData = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}goals/social/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.friends;
  } catch (error) {
    console.error("퍼센티지 데이터를 가져오는 중 오류 발생:", error);
    return [];
  }
};

const getFriendRecord = async (friendId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}goals/social/${friendId}`, // URL에 friendId 추가
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("친구 기록을 가져오는 중 오류 발생:", error);
    return {
      friend_name: "",
      soju_goal: 0,
      beer_goal: 0,
      mak_goal: 0,
      wine_goal: 0,
      soju_record: 0,
      beer_record: 0,
      mak_record: 0,
      wine_record: 0,
    };
  }
};

// FriendList 컴포넌트
const FriendList = () => {
  const [progressList, setProgressList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFriendrecord, setShowFriendrecord] = useState(false);
  const [selectedFriendName, setSelectedFriendName] = useState("");
  const [friendRecord, setFriendRecord] = useState({
    friend_name: "",
    soju_goal: 0,
    beer_goal: 0,
    mak_goal: 0,
    wine_goal: 0,
    soju_record: 0,
    beer_record: 0,
    mak_record: 0,
    wine_record: 0,
  });

  useEffect(() => {
    const fetchFriends = async () => {
      const friendList = await getFriendList();
      const percentageData = await getPercentageData();
      const progressData = friendList.map((friend) => {
        const friendPercentage = percentageData.find(
          (item) => item.friend_id === friend.friend_pk
        );
        return {
          ...friend,
          progress: friendPercentage ? friendPercentage.percentage * 100 : 0,
          cheer_count: friend.cheer_count || 0, // 초기 응원수 설정
        };
      });
      setProgressList(progressData);
    };

    fetchFriends();
  }, []);

  if (progressList.length === 0) {
    return (
      <div
        style={{
          color: "#CCCCCC",
          fontSize: "14px",
          fontFamily: "Pretendard",
          lineHeight: "25px",
          marginTop: "60px",
          padding: "10px",
        }}
      >
        아직 음주 목표 달성률을 공유할 친구를 추가하지 않았어요. 마이페이지에서
        친구를 추가하고 응원해보세요.
      </div>
    );
  }

  const popupFriendRecord = async (friendName, friendId) => {
    const record = await getFriendRecord(friendId);
    setSelectedFriendName(friendName);
    setFriendRecord(record);
    setShowFriendrecord(true);
  };

  const sendCheering = async (friendName, friendId) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}goals/social/cheer/${friendId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const updatedCheerCount = response.data.cheer_count;
      setProgressList((prevList) =>
        prevList.map((friend) =>
          friend.friend_pk === friendId
            ? { ...friend, cheer_count: updatedCheerCount }
            : friend
        )
      );

      setSelectedFriendName(friendName);
      setShowModal(true);
    } catch (error) {
      console.error("응원을 보내는 중 오류 발생:", error);
    }
  };

  return (
    <FriendListWrapper>
      {progressList.map((friend) => (
        <div className="FriendListContainer" key={friend.friend_pk}>
          <img
            className="profile"
            src={friend.image}
            alt={`${friend.nickname}'s profile`}
            onClick={() => popupFriendRecord(friend.nickname, friend.friend_pk)}
          />
          <div className="FriendProgress" key={friend.friend_pk}>
            <div
              className="friendName"
              onClick={() =>
                popupFriendRecord(friend.nickname, friend.friend_pk)
              }
            >
              {friend.nickname}
            </div>
            <ProgressContainer>
              <ProgressBar progress={friend.progress}></ProgressBar>
            </ProgressContainer>
            <div className="percent">{friend.progress.toFixed(2)}%</div>

            <div
              className="sendMessage"
              onClick={() => sendCheering(friend.nickname, friend.friend_pk)}
            >
              <img src={sendIcon} alt="send icon" />
              응원보내기
            </div>
          </div>
        </div>
      ))}
      {showModal && (
        <>
          <Overlay onClick={() => setShowModal(false)} />
          <Modal>
            <div className="cheerCompleteMessage">
              {selectedFriendName}님에게 응원을 보냈어요
            </div>
            <CloseButton onClick={() => setShowModal(false)}>닫기</CloseButton>
          </Modal>
        </>
      )}
      {showFriendrecord && (
        <>
          <Overlay onClick={() => setShowFriendrecord(false)} />
          <Modal>
            <div className="modalTop">
              <span style={{ fontWeight: "bold" }}>{selectedFriendName}</span>
              님의
            </div>
            <div className="ThisMonthGoal">
              이번 달 목표
              <div>
                <div>소주: {friendRecord.soju_goal}잔</div>
                <div>맥주: {friendRecord.beer_goal}잔</div>
                <div>와인: {friendRecord.wine_goal}잔</div>
                <div>막걸리: {friendRecord.mak_goal}잔</div>
              </div>
            </div>
            <div className="ThisMonthRecord">
              이번 달 섭취량
              <div>
                <div>소주: {friendRecord.soju_record}잔</div>
                <div>맥주: {friendRecord.beer_record}잔</div>
                <div>와인: {friendRecord.wine_record}잔</div>
                <div>막걸리: {friendRecord.mak_record}잔</div>
              </div>
            </div>
            <CloseButton onClick={() => setShowFriendrecord(false)}>
              닫기
            </CloseButton>
          </Modal>
        </>
      )}
    </FriendListWrapper>
  );
};

export default FriendList;

// Styled Components
const FriendListWrapper = styled.div`
  font-family: Pretendard;
  .FriendListContainer {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
  }
  .profile {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    cursor: pointer;
  }
  .FriendProgress {
    display: grid;
    grid-template-columns: 10fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    height: 65px;
    width: 250px;
    .friendName {
      font-size: 16px;
      font-family: Pretendard;
      font-weight: bold;
      cursor: pointer;
    }
    .sendMessage {
      grid-row: 3/4;
      font-size: 11px;
      cursor: pointer;
    }
    .percent {
      grid-row: 2/3;
    }
  }
`;

const ProgressContainer = styled.div`
  background-color: #cbc9d3;
  width: 215px;
  height: 10px;
  border-radius: 5px;
  grid-row: 2/3;
  display: flex;
`;

const ProgressBar = styled.div`
  transition: width 0.3s ease;
  background: linear-gradient(281deg, #9aeafb -1.06%, #17d6b5 88.73%);
  width: ${(props) => props.progress}%;

  height: 10px;
  border-radius: 5px;
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 230px;
  text-align: center;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .cheerCompleteMessage {
    font-weight: bold;
    padding: 15px;
  }

  .ThisMonthGoal {
    display: flex;
    justify-content: space-between;
    width: 90%;
    font-size: 14px;
    > div {
      font-size: 12px;
      text-align: right;
    }
  }
  .ThisMonthRecord {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    width: 90%;
    > div {
      font-size: 12px;
      text-align: right;
    }
  }
  .modalTop {
    text-align: left;
    margin-bottom: 20px;
    align-self: self-start;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CloseButton = styled.button`
  font-family: Pretendard;
  background: #d9d9d9;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 10px;
  width: 209px;
  height: 24px;
  line-height: 2px;
  background-color: #17d6b5;
  margin-bottom: 5px;
`;
