import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import HomeCalendar from "../components/HomeCalendar/HomeCalendar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../images/HomePage/홈페이지잔수아이콘.png";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await axios.get(`${BASE_URL}accounts/mypage/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const goToGoal = () => {
    navigate("/goal");
  };

  const currentMonth = new Date().getMonth() + 1 + "월";
  const progressPercentage = user.goal ? (user.drinks / user.goal) * 100 : 0;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>서비스명</Header>

        <Content>
          <GoalReachContainer>
            <ProfileImage src={user.image} alt="Profile" />

            {user.goal ? (
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
                <div>
                  {user.drinks}잔/{user.goal}잔
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
              이번 달의 목표치에 도달하려면 N회만 마셔야 해요!
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
  width: 390px;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 390px;
  height: 54px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  box-shadow: 0px 4px 10px -12px black;
  z-index: 10;
`;

const Content = styled.div`
  padding: 20px;
  padding-top: 74px;
  padding-bottom: 84px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const GoalReachContainer = styled.div`
  font-family: Pretendard;
  width: 350px;
  background-color: #ebebeb;
  border-radius: 8px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 2.5fr 7fr 1.5fr;
  grid-template-rows: 1fr 1.5fr 1fr;
  width: 350px;
  height: 111px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 4px 6.7px 0px rgba(0, 0, 0, 0.08);
  > div {
    grid-column: 2/3;
  }
  button {
    grid-column: 3/4;
    grid-row: 2/3;
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
  font-size: 20px;
  font-weight: 600;
  grid-column: 2/3;
  grid-row: 1/2;
`;

const ProgressBar = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  width: 100%;
  height: 20px;
  background-color: #d8d8d8;
  border-radius: 10px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #17d6b5;
  border-radius: 10px 0 0 10px;
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
  }
  .calendarTitle {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
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
  bottom: 0;
  width: 390px;
  height: 84px;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;
