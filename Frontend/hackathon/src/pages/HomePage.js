import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import HomeCalendar from "../components/HomeCalendar/HomeCalendar";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const HomePage = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>서비스명</Title>
        <Content>
          <Header>
            <div>00님의 7월 음주 목표</div>
            <button>수정</button>
          </Header>
          <GoalReach>
            <div>잔 수</div>
            <div>2잔/13잔</div>
            <div>79%</div>
          </GoalReach>
          <DrinkingCalendar>
            <div>음주 달력</div>
            <div className="goal">
              이번 달의 목표치에 도달하려면 N회만 마셔야 해요!
            </div>
            <HomeCalendar></HomeCalendar>
          </DrinkingCalendar>
        </Content>
        <Navbar></Navbar>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  width: 390px;
  margin: 0 auto;
  background-color: white;
`;

const Content = styled.div`
  height: 800px; // 최대 높이를 설정합니다.
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  width: 151px;
  height: 27px;
  padding: 10px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 133.8%; /* 26.76px */
`;

const Header = styled.div`
  font-family: Pretendard;
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const GoalReach = styled.div`
  font-family: Pretendard-Medium;
  width: 350px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const DrinkingCalendar = styled.div`
  .goal {
    width: 350px;
    height: 36px;
    font-size: 14px;
    background-color: #ebebeb;
    border-radius: 8px;
    text-align: center;
    line-height: 36px;
    font-family: Pretendard-Regular;
  }
  > div {
    /* 여기에 첫 번째 div에 대한 스타일을 추가할 수 있습니다. */
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: Pretendard-Medium;
  }
`;
