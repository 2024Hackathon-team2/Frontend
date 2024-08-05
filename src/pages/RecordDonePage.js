import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const RecordDonePage = () => {
  const location = useLocation();
  const { selectedDate, totalRecord, record_count, record_id } =
    location.state || {};
  const { year, month, day, dow } = selectedDate || {};

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home", {
      state: {
        totalRecord,
        record_id,
        selectedDate: {
          year,
          month,
          day,
          dow,
        },
      },
    });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>나의 음주 기록</Header>
        <Content>
          <RecordBox>
            <DateRecord>
              {year}년 {month}월 {day}일 {dow}
            </DateRecord>
            <RecordTitle>
              {month}월의 {record_count} 번째 음주기록
            </RecordTitle>
            <Total>총 {totalRecord}잔</Total>
          </RecordBox>
          <DoneMessage1>오늘의 음주 기록 완료!</DoneMessage1>
          <DoneMessage2>잦은 음주는 피해 주세요!</DoneMessage2>
        </Content>
        <Footer>
          <button onClick={goToHome}>홈으로 이동</button>
        </Footer>
      </Container>
    </>
  );
};

export default RecordDonePage;

// Styled components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
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
  height: 100%;
  width: 100%;
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

const DateRecord = styled.div`
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
  left: 0;

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
