import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sendIcon from "../images/SocialPage/보내기.png";
import mockProfileImage from "../images/SocialPage/mockProfile.png";

// 임시 데이터 및 API 호출 함수 (Mock Data)
const mockFriends = [
  { id: 1, name: "예원" },
  { id: 2, name: "채연" },
];

const mockProgress = {
  1: 75,
  2: 75,
};

const mockProfile = {
  1: mockProfileImage,
  2: mockProfileImage,
};

const getFriendList = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFriends);
    }, 1000);
  });
};

const getDrinkingGoalProgress = async (friendId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProgress[friendId] || 0);
    }, 1000);
  });
};

const getFriendProfile = async (friendId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProfile[friendId] || "");
    }, 1000);
  });
};

const getFriendRecord = async (friendId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        targetCups: 10, // 예시 데이터, 실제 데이터로 교체 필요
        consumedCups: 8, // 예시 데이터, 실제 데이터로 교체 필요
      });
    }, 1000);
  });
};

// FriendList 컴포넌트
const FriendList = ({ friends }) => {
  const [progressList, setProgressList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFriendrecord, setShowFriendrecord] = useState(false);
  const [selectedFriendName, setSelectedFriendName] = useState("");
  const [friendRecord, setFriendRecord] = useState({
    targetCups: 0,
    consumedCups: 0,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      const progressData = await Promise.all(
        friends.map(async (friend) => {
          const progress = await getDrinkingGoalProgress(friend.id);
          const profile = await getFriendProfile(friend.id);
          return { ...friend, progress, profile };
        })
      );
      setProgressList(progressData);
    };

    fetchProgress();
  }, [friends]);

  if (friends.length === 0) {
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

  const sendCheering = (friendName) => {
    setSelectedFriendName(friendName);
    setShowModal(true);
  };

  return (
    <FriendListWrapper>
      {progressList.map((friend) => (
        <div className="FriendListContainer" key={friend.id}>
          <img
            className="profile"
            src={friend.profile}
            alt={`${friend.name}'s profile`}
            onClick={() => popupFriendRecord(friend.name, friend.id)}
          />
          <div className="FriendProgress" key={friend.id}>
            <div
              className="friendName"
              onClick={() => popupFriendRecord(friend.name, friend.id)}
            >
              {friend.name}
            </div>
            <ProgressContainer>
              <ProgressBar progress={friend.progress}></ProgressBar>
            </ProgressContainer>
            <div className="percent">{friend.progress}%</div>
            <div
              className="sendMessage"
              onClick={() => sendCheering(friend.name)}
            >
              <img src={sendIcon} alt="send icon" />
              응원보내기
            </div>
          </div>
        </div>
      ))}
      <Overlay show={showModal} onClick={() => setShowModal(false)} />
      <Modal show={showModal}>
        <div className="cheerCompleteMessage">
          {selectedFriendName}님에게 응원을 보냈어요
        </div>
        <CloseButton onClick={() => setShowModal(false)}>닫기</CloseButton>
      </Modal>

      <Overlay
        show={showFriendrecord}
        onClick={() => setShowFriendrecord(false)}
      />
      <Modal show={showFriendrecord}>
        <div>
          <span style={{ fontWeight: "bold" }}>{selectedFriendName}</span>님의
        </div>
        <div>이번 달 목표: {friendRecord.targetCups}잔</div>
        <div>이번 달 섭취량: {friendRecord.consumedCups}잔</div>
        <CloseButton onClick={() => setShowFriendrecord(false)}>
          닫기
        </CloseButton>
      </Modal>
    </FriendListWrapper>
  );
};

export { FriendList, getFriendList };

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
  background-color: #4f82f7;
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
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 230px;
  text-align: center;
  border-radius: 5px;
  .cheerCompleteMessage {
    font-weight: bold;
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
  font-weight: bold;
  background: #d9d9d9;
  color: black;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
  width: 209px;
`;
