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
        <Header>서비스명</Header>
        <Content>
          <Title>
            <div>00님의 7월 음주 목표</div>
            <button>수정</button>
          </Title>
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
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default HomePage;

// Styled components
const Container = styled.div`
  width: 390px;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding-top: 10px;
  // 최대 높이를 설정합니다.
  // 세로 스크롤을 허용합니다.
  /* 스크롤바 숨기기 */
  height: 652px;
  overflow-y: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
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

const Footer = styled.footer`
  position: fixed;
  bottom: 0%;
  display: flex;
  width: 390px;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;
