import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import SojuImage from "./images/소주.png";
import BeerImage from "./images/맥주.png";
import MakgeolliImage from "./images/막걸리.png";
import WineImage from "./images/와인.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const RecordPage = () => {
  const location = useLocation(); // useLocation 훅 사용
  const { selectedDate } = location.state || {}; // 선택된 날짜 받아오기
  const today = new Date(selectedDate || Date.now()); // 선택된 날짜가 없으면 현재 날짜 사용

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayIndex = today.getDay();

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const day = daysOfWeek[dayIndex];

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
    setAmount("");
    setLabelColor("black");
  };

  const handleRecord = () => {
    if (!selectedDrink) {
      setLabelColor("#FF9B9B");
      return;
    }
    if (selectedDrink && amount) {
      setRecords([...records, { drink: selectedDrink, amount }]);
      setSelectedDrink("");
      setAmount("");
      setLabelColor("black");
    }
  };

  const handleDelete = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/recorddone");
  };

  const getDrinkImage = (drink) => {
    switch (drink) {
      case "소주":
        return SojuImage;
      case "맥주":
        return BeerImage;
      case "막걸리":
        return MakgeolliImage;
      case "와인":
        return WineImage;
      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          나의 음주 기록
          <div></div>
        </Header>
        <Content>
          <div className="up">
            <div className="dayBox">
              <DateRecord>
                {year}년 {month}월 {date}일 {day}요일
              </DateRecord>
              <RecordTitle>{month}월의 N 번째 음주기록</RecordTitle>
            </div>
            <Label color={labelColor}>주종을 선택해 주세요.</Label>
            <DrinkButtons>
              {Object.keys(drinkOptions)
                .slice(1)
                .map((drink, index) => (
                  <DrinkButton
                    key={index}
                    selected={selectedDrink === drink}
                    onClick={() => handleDrinkSelect(drink)}
                  >
                    <img
                      src={getDrinkImage(drink)}
                      alt={drink}
                      style={{ width: "30px", height: "45px" }}
                    />
                  </DrinkButton>
                ))}
            </DrinkButtons>
            <Label className="amount">얼마나 마셨나요?</Label>
            <div className="underAmount">
              <Select
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  잔 또는 병 수를 선택해 주세요.
                </option>
                {drinkOptions[selectedDrink]?.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
              <Button onClick={handleRecord}>기록</Button>
            </div>
            <RecordList>
              {records.map((record, index) => (
                <RecordItem key={index}>
                  <div>
                    <img
                      src={getDrinkImage(record.drink)}
                      alt={record.drink}
                      style={{
                        width: "30px",
                        height: "45px",
                        marginRight: "10px",
                      }}
                    />
                    {record.drink} {record.amount}
                  </div>
                  <DeleteButton onClick={() => handleDelete(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="4"
                      viewBox="0 0 17 4"
                      fill="none"
                    >
                      <path
                        d="M2 2L15 2"
                        stroke="#A0A0A0"
                        strokeWidth="2.55882"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </DeleteButton>
                </RecordItem>
              ))}
            </RecordList>
          </div>
          <div className="bottom">
            <SubmitButton onClick={handleSubmit}>음주 기록 완료</SubmitButton>
          </div>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default RecordPage;

// Styled components
const Container = styled.div`
  width: 390px;
  height: 100vh;

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
  height: 652px;
  overflow-y: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .dayBox {
    width: 350px;
    height: 83px;
    flex-shrink: 0;
    border-radius: 14px;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .underAmount {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const DateRecord = styled.div`
  margin-left: 21px;
  color: #000;
  font-family: Pretendard;
  font-size: 15.246px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RecordTitle = styled.div`
  margin-left: 21px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Label = styled.div`
  font-family: Pretendard;
  font-size: 15.246px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${(props) => props.color};
  margin-top: 31px;

  .amount {
    margin-top: 25px;
  }
`;

const DrinkButtons = styled.div`
  margin-top: 17px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 350px;
  height: 95px;
  flex-shrink: 0;
  border-radius: 14px;
  background: #f9f9f9;
`;

const DrinkButton = styled.button`
  width: 48px;
  height: 73px;
  background-color: ${(props) => (props.selected ? "#575757" : "#F9F9F9")};
  border-radius: 10px;
  border: ${(props) => (props.selected ? "1px solid #c7c7c7" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Select = styled.select`
  width: 278px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  background: #fff;
  cursor: pointer;
  margin-top: 14px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 16.33px;
  color: ${(props) =>
    props.value === ""
      ? "#C7C7C7"
      : "#292929"}; /* 기본 설명일 때와 선택지일 때 색상 구분 */
`;

const Option = styled.option`
  color: #292929;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Button = styled.button`
  width: 65px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 7px;
  border: none;
  background: #d9d9d9;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0px;
  margin-top: 14px;

  cursor: pointer;
`;

const RecordList = styled.div``;

const RecordItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  color: #7e7e7e;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 350px;
  height: 77px;
  flex-shrink: 0;
  border-radius: 14px;
  background: #f9f9f9;

  div {
    padding-left: 31px;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding-right: 22px;
  cursor: pointer;
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

const SubmitButton = styled.button`
  width: 350px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 9px;
  background: #7e7e7e;
  border: none;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 22px;
  cursor: pointer;
`;
