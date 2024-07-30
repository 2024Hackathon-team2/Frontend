import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const RecordDonePage = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1; //인덱스 값에 +1
  const date = today.getDate();
  const dayIndex = today.getDay(); // 요일의 인덱스를 가져옴 (0: 일요일, 6: 토요일)

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const day = daysOfWeek[dayIndex]; // 요일을 문자열로 변환

  const [selectedDrink, setSelectedDrink] = useState("");
  const [amount, setAmount] = useState("");
  const [records, setRecords] = useState([]);
  const [labelColor, setLabelColor] = useState("black");

  const drinkOptions = {
    "": [],
    소주: [
      "1잔 (50ml)",
      "2잔",
      "3잔",
      "4잔",
      "5잔",
      "6잔",
      "7잔",
      "1병",
      "1병 반",
      "2병",
      "2병 반",
      "3병",
      "3병 반",
    ],
    맥주: [
      "1잔 (200ml)",
      "2잔",
      "1병",
      "1병 반",
      "2병",
      "2병 반",
      "3병",
      "3병 반",
      "4병",
      "4병 반",
    ],
    막걸리: [
      "1사발 (250ml)",
      "2사발",
      "1병",
      "1병 반",
      "2병",
      "2병 반",
      "3병",
      "3병 반",
      "4병",
      "4병 반",
    ],
    와인: [
      "1잔 (150ml)",
      "2잔",
      "3잔",
      "4잔",
      "1병",
      "1병 반",
      "2병",
      "2병 반",
      "3병",
      "3병 반",
      "4병",
      "4병 반",
    ],
  };

  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);
    setAmount(""); // Reset amount when drink type changes
    setLabelColor("black"); // Change label color back to black
  };

  const handleRecord = () => {
    if (!selectedDrink) {
      setLabelColor("#FF9B9B"); // Change label color to red if no drink selected
      return;
    }
    if (selectedDrink && amount) {
      setRecords([...records, { drink: selectedDrink, amount }]);
      setSelectedDrink("");
      setAmount("");
      setLabelColor("black"); // Reset label color
    }
  };

  const handleDelete = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };
  const navigate = useNavigate();

  const goToBack = () => {
    navigate("/record");
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={goToBack}>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          나의 음주 기록
          <div></div>
        </Header>
        <Content>
          <RecordBox>
            <DateRecord>
              {year}년 {month}월 {date}일 {day}요일
            </DateRecord>
            <RecordTitle>{month}월의 N 번째 음주기록</RecordTitle>
          </RecordBox>
          <DoneMessage1>오늘의 음주 기록 완료!</DoneMessage1>
          <DoneMessage2>잦은 음주는 피해 주세요!</DoneMessage2>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default RecordDonePage;

// Styled components
const Container = styled.div`
  width: 390px;

  margin: 0 auto;
  background-color: white;
`;

const Header = styled.header`
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
  flex-shrink: 0;
  background-color: white;

  img {
    width: 25px;
    height: 25px;
  }
`;

const Content = styled.div`
  padding: 20px;
  padding-top: 82px;
  height: 652px; // 최대 높이를 설정합니다.
  overflow-y: auto; // 세로 스크롤을 허용합니다.
  /* 스크롤바 숨기기 */
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecordBox = styled.div`
  width: 286px;
  height: 212px;
  flex-shrink: 0;
  border-radius: 14px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DateRecord = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15.246px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RecordTitle = styled.div`
  margin-top: 8px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DoneMessage1 = styled.div`
  margin-top: 52px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const DoneMessage2 = styled.div`
  margin-top: 14px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Footer = styled.footer`
  display: flex;
  width: 390px;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;