import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import backButtonImage from "./images/back.png";
import Navbar from "../components/Navbar";

const BASE_URL = "https://drinkit.pythonanywhere.com/";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const GoalDonePage = () => {
  const today = new Date();

  const month = today.getMonth() + 1; // 인덱스 값에 +1
  const dayIndex = today.getDay(); // 요일의 인덱스를 가져옴 (0: 일요일, 6: 토요일)

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const [totalGoal, setTotalGoal] = useState(0); // State to store total_goal
  const [userName, setUserName] = useState(""); // State to store user name

  useEffect(() => {
    const fetchGoalAndUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        // Fetch goal information
        const goalResponse = await axios.get(`${BASE_URL}goals/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const goalData = goalResponse.data.goal;
        const userData = goalResponse.data.user;

        setTotalGoal(goalData.total_goal); // Set total_goal from the API response
        setUserName(userData); // Set user name from the API response
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchGoalAndUserData();
  }, []); // Empty dependency array to run only on component mount

  const navigate = useNavigate();

  const goToBack = () => {
    navigate("/goal");
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={goToBack}>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          음주 목표 설정
          <div></div>
        </Header>
        <Content>
          <RecordBox>
            <UserName>{userName}님의</UserName>
            <RecordTitle>{month}월의 음주 목표</RecordTitle>
            <Total>총 {totalGoal}잔</Total>
          </RecordBox>
          <DoneMessage1>{month}월 음주 목표 설정 완료!</DoneMessage1>
          <DoneMessage2>목표를 향해 화이팅!</DoneMessage2>
        </Content>
        <Footer>
          <button onClick={goToHome}>홈으로 이동</button>
        </Footer>
      </Container>
    </>
  );
};

export default GoalDonePage;

// Styled components
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
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 390px;
  height: 54px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  box-shadow: 0px 4px 10px -12px black;
  z-index: 10;

  div {
    margin-right: 20px;
    width: 25px;
    height: 25px;
  }
`;

const BackButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  margin-left: 20px;
  cursor: pointer;
  background-color: white;

  img {
    width: 25px;
    height: 25px;
  }
`;

const Content = styled.div`
  padding: 20px;
  padding-bottom: 84px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const RecordBox = styled.div`
  width: 286px;
  height: 212px;
  border-radius: 14px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const UserName = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15.246px;
  font-weight: 500;
`;

const RecordTitle = styled.div`
  margin-top: 8px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const Total = styled.div`
  color: #7a7881;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 42px;
`;

const DoneMessage1 = styled.div`
  margin-top: 52px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
`;

const DoneMessage2 = styled.div`
  margin-top: 14px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;

  button {
    width: 350px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 9px;
    background: #dcf9f4;
    border: none;
    color: var(
      --button-color,
      #17d6b5
    ); /* Correct use of CSS variable with fallback */
    font-family: Pretendard, sans-serif; /* Ensure fallback font */
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
    margin-bottom: 30px;
  }
`;
