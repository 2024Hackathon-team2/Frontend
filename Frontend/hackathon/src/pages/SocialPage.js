import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import CheerImage from "../images/SocialPage/소셜응원수아이콘.png";
import BeerImage from "../images/SocialPage/맥주.png";
import SojuImage from "../images/SocialPage/소주.png";
import MakgeolliImage from "../images/SocialPage/막걸리.png";
import WineImage from "../images/SocialPage/와인.png";

import ProgressBar from "../components/Progressbar_Goal";
import { FriendList, getFriendList } from "../components/FriendList";
import Navbar from "../components/Navbar";
const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const SocialPage = ({ userId }) => {
  const [data, setData] = useState({ targetCups: 0, consumedCups: 0 });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // 임시 데이터 사용
    const fetchData = async () => {
      // 백엔드 API를 대신할 임시 데이터
      const tempData = {
        targetCups: 8,
        consumedCups: 6,
      };

      setData(tempData);
      setPercentage((tempData.consumedCups / tempData.targetCups) * 100);
    };

    fetchData();
  }, []);

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      const friendsData = await getFriendList(userId);
      setFriends(friendsData);
    };

    fetchFriends();
  }, [userId]);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Container>
        <Header>소셜</Header>
        <Content>
          <Goal>
            <div className="goalTitle">
              <div className="userName">지원님</div>
              <div className="goalAchieveMonth">
                2개월째 목표를 달성하고 있어요
              </div>
            </div>

            <div className="CheerNumber">
              <img src={CheerImage}></img>
              <div>이번 달 받은 응원 수: N</div>
            </div>

            <DrinkingGoals>
              <div className="Drinks" id="Beer">
                <div className="img">
                  <img src={BeerImage}></img>
                </div>
                <div>맥주</div>
                <div>
                  <ProgressBar percentage={percentage} />
                </div>
                <div className="cups">
                  {data.targetCups}/{data.consumedCups}잔
                </div>
              </div>

              <div className="Drinks" id="Soju">
                <div className="img">
                  <img src={SojuImage}></img>
                </div>
                <div>소주</div>
                <div>
                  <ProgressBar percentage={percentage} />
                </div>
                <div className="cups">
                  {data.targetCups}/{data.consumedCups}잔
                </div>
              </div>

              <div className="Drinks" id="Makgeolli">
                <div className="img">
                  <img src={MakgeolliImage}></img>
                </div>
                <div>막걸리</div>
                <div>
                  <ProgressBar percentage={percentage} />
                </div>
                <div className="cups">
                  {data.targetCups}/{data.consumedCups}잔
                </div>
              </div>

              <div className="Drinks" id="Wine">
                <div className="img">
                  <img src={WineImage}></img>
                </div>
                <div>와인</div>
                <div>
                  <ProgressBar percentage={percentage} />
                </div>
                <div className="cups">
                  {data.targetCups}/{data.consumedCups}잔
                </div>
              </div>
            </DrinkingGoals>

            <div className="GoalSpecificButton">
              <div>목표 자세히 보기</div>
            </div>
          </Goal>
          <Friends>
            <div>친구의 달성률</div>
            <FriendList friends={friends} />
          </Friends>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default SocialPage;

// Styled components
const Container = styled.div`
  width: 390px;
  margin: 0 auto;
  background-color: white;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 390px;
  height: 54px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.408px;
  box-shadow: 0px 4px 10px -12px black;
  background-color: white;
`;

const Content = styled.div`
  padding: 20px;
  padding-top: 70px;
  height: 652px; // 최대 높이를 설정합니다.
  overflow-y: auto; // 세로 스크롤을 허용합니다.
  overflow-x: hidden; /* 스크롤바 숨기기 */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Goal = styled.div`
  width: 100%;
  .userName {
    font-family: "Pretendard-Bold";
    src: url("../styles/Pretendard-Bold.woff") format("woff");
  }
  .CheerNumber {
    display: flex;
    font-size: 12px;
    font-family: Pretendard-Medium;
    justify-content: end;
  }
  .GoalSpecificButton {
    display: flex;
    justify-content: center;
    div {
      width: 164px;
      height: 35px;
      background-color: #4f82f7;
      text-align: center;
      line-height: 35px;
      border-radius: 20px;
      color: white;
      box-shadow: rgba(99, 99, 99, 0.45) 0px 4px 4px 0px;
    }
  }
`;
const DrinkingGoals = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .Drinks {
    width: 95%;
    display: grid;
    grid-template-columns: 43px 50px 220px;
    justify-items: end;
    align-items: center;
    margin-bottom: 15px;
  }
  .img {
    grid-row: 1/3;
  }
  .cups {
    grid-column: 3/4;
    font-family: Pretendard-Medium;
    font-size: 10px;
  }
`;

const Friends = styled.div`
  width: 100%;
`;
const Footer = styled.footer`
  display: flex;
  width: 390px;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: var(--unnamed, gray);
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;
