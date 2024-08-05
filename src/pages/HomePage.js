import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import HomeCalendar from "../components/HomeCalendar/HomeCalendar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../images/HomePage/홈페이지잔수아이콘.png";
import logoImage from "./images/logo.png";

const BASE_URL = "https://drinkit.pythonanywhere.com/";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const HomePage = () => {
  const [user, setUser] = useState({
    nickname: "",
    image: "",
    goal: 0,
    drinks: 0,
  });

  const [goalData, setGoalData] = useState({
    totalGoal: 0.0,
    totalRecord: 0.0,
    percentage: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const userResponse = await axios.get(`${BASE_URL}accounts/mypage/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);

        const goalResponse = await axios.get(`${BASE_URL}goals/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGoalData({
          totalGoal: goalResponse.data.goal.total_goal,
          totalRecord: goalResponse.data.record.record_alcohol.total_record,
          percentage: goalResponse.data.percentage,
        });
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchUserData();
  }, []);

  const goToGoal = () => {
    navigate("/goal");
  };

  const currentMonth = new Date().getMonth() + 1 + "월";
  const progressPercentage = goalData.totalGoal
    ? (goalData.totalRecord / goalData.totalGoal) * 100
    : 0;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <img src={logoImage} />
        </Header>

        <Content>
          <GoalReachContainer>
            <ProfileImage src={user.image} alt="Profile" />

            {goalData.totalGoal ? (
              <>
                <Nickname>
                  {user.nickname}
                  <span style={{ fontSize: "12px", color: "#7A7881" }}>
                    의 {currentMonth} 음주 목표
                  </span>
                </Nickname>
                <ProgressBar>
                  <Progress style={{ width: `${progressPercentage}%` }} />
                </ProgressBar>
                <div className="numerical">
                  <div>{goalData.totalRecord}잔</div>/{goalData.totalGoal}잔
                </div>
              </>
            ) : (
              <div className="NoRecord">
                {user.nickname}님<br />{" "}
                <span style={{ fontSize: "12px", color: "#7A7881" }}>
                  {currentMonth}의 음주 목표를 설정해주세요!!
                </span>
              </div>
            )}
            <button onClick={goToGoal}>수정</button>
          </GoalReachContainer>
          <DrinkingCalendar>
            <div className="goal">
              <img
                src={HomeIcon}
                style={{ width: "31.092px", height: "37.801px" }}
                alt="Goal Icon"
              ></img>
              이번 달의 목표치에 도달하려면{" "}
              {goalData.totalGoal - goalData.totalRecord}잔만 마셔야 해요!
            </div>
            <div className="calendarTitle">음주 달력</div>
            <HomeCalendar></HomeCalendar>
          </DrinkingCalendar>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default HomePage;

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  width: 100%;
  height: 54px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  box-shadow: 0px 4px 10px -12px black;
  z-index: 10;

  img {
    width: 69px;
    height: 28.273px;
    margin-left: 20px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-top: 54px; /* Space for the fixed header */
  padding-bottom: 84px; /* Space for the fixed footer */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 100%;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const GoalReachContainer = styled.div`
  margin-top: 20px;
  font-family: Pretendard;
  background-color: #ebebeb;
  border-radius: 8px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 4fr 7fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 350px;
  height: 111px;
  min-height: 111px; /* 최소 높이 */

  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 4px 6.7px 0px rgba(0, 0, 0, 0.08);
  > div {
    grid-column: 2/3;
  }
  button {
    grid-column: 3/4;
    grid-row: 1/3;
    width: 39px;
    height: 23px;
    padding: 2px 7px;
    font-family: Pretendard;
    font-size: 10px;
    color: #17d6b5;
    border-radius: 8px;
    background: #c1fef4;
    border: none;
    align-self: end;
    cursor: pointer;
  }
  .NoRecord {
    grid-row: 2/3;
  }

  .numerical {
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    flex-direction: row;

    div {
      color: #17d6b5;
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-right: 3px;
    }
  }
`;

const ProfileImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  grid-row: 1/4;
  align-self: center;
  justify-self: center;
`;

const Nickname = styled.div`
  font-family: Pretendard;
  font-size: 17.606px;
  font-weight: 600;
  grid-column: 2/3;
  grid-row: 1/2;
  align-self: flex-end;

  span {
    align-items: center;
    margin-left: 4px;
  }
`;

const ProgressBar = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  width: 100%;
  height: 20px;
  background: #f3f3f3;
  border-radius: 10px;
  overflow: hidden;
  width: 144px;
  height: 12px;
  align-self: center;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: linear-gradient(281deg, #9aeafb -1.06%, #17d6b5 88.73%);
`;

const DrinkingCalendar = styled.div`
  .goal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 53px;
    flex-shrink: 0;
    font-size: 14px;
    border-radius: 8px;
    background: linear-gradient(108deg, #96e3ff 24.44%, #c8fdf8 105.38%);
    border-radius: 8px;
    text-align: center;
    line-height: 36px;
    font-family: Pretendard;
    margin-bottom: 26px;
    font-weight: 500;
  }
  .calendarTitle {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  > div {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 133.8%;
  }
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;
