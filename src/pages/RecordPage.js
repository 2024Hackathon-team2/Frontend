import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios"; // axios 라이브러리 임포트
import backButtonImage from "./images/back.png";
import SojuImage from "./images/소주.png";
import BeerImage from "./images/맥주.png";
import MakgeolliImage from "./images/막걸리.png";
import WineImage from "./images/와인.png";
import Navbar from "../components/Navbar";

const BASE_URL = "https://drinkit.pythonanywhere.com/";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const RecordPage = () => {
  const location = useLocation();
  const { selectedDate } = location.state || {};
  const today = new Date(selectedDate);

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

  const handleSubmit = async () => {
    // POST 요청을 보내는 부분
    const requestBody = {
      date: selectedDate,
      records: records.map((record) => ({
        drink: record.drink,
        amount: record.amount,
      })),
    };

    console.log("Request Body:", requestBody); // 콘솔에 출력

    try {
      const response = await axios.post(`${BASE_URL}records/`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 토큰 값을 적절히 설정
        },
      });
      console.log("Response:", response.data);
      navigate("/recorddone", {
        state: {
          selectedDate: {
            year: response.data.year,
            month: response.data.month,
            day: response.data.day,
            dow: response.data.dow,
          },
          totalRecord: response.data.total_record,
        },
      });
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const goToHome = () => {
    navigate("/home");
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
          <BackButton onClick={goToHome}>
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
                    <DrinkLabel>{drink}</DrinkLabel>
                    <img
                      src={getDrinkImage(drink)}
                      alt={drink}
                      style={{ width: "45px", height: "45px" }}
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
                        width: "30.24px",
                        height: "30.591px",
                        marginRight: "10px",
                        backgroundColor: "white",
                        border: "1px solid #AEAEAE",
                        borderRadius: "10px",
                        padding: "10px",
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
      </Container>
    </>
  );
};

export default RecordPage;

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
  padding-top: 74px; /* Space for the fixed header */
  padding-bottom: 45px; /* Space for the fixed footer + extra space */
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;

  .dayBox {
    width: 350px;
    height: 83px;
    border-radius: 14px;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
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
  font-weight: 500;
`;

const RecordTitle = styled.div`
  margin-left: 21px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const Label = styled.div`
  font-family: Pretendard;
  font-size: 15.246px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin-top: 31px;

  &.amount {
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
  border-radius: 14px;
  background: #f9f9f9;
`;

const DrinkButton = styled.button`
  width: 60px;
  height: 73px;
  border: 1px solid #c7c7c7;
  background-color: ${(props) => (props.selected ? "#575757" : "white")};
  border-radius: 10px;
  display: flex;
  flex-direction: column; /* Stack image and text vertically */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 0;
  text-align: center;
  color: ${(props) => (props.selected ? "white" : "#000")};
  font-family: Pretendard;
  font-size: 12px;

  img {
    width: 42px;
    height: 42px;
  }
`;

const DrinkLabel = styled.div`
  margin-top: 5px;
`;

const Select = styled.select`
  width: 278px;
  height: 43px;
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  background: #fff;
  cursor: pointer;
  margin-top: 14px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  padding-left: 16.33px;
  color: ${(props) => (props.value === "" ? "#C7C7C7" : "#292929")};
`;

const Option = styled.option`
  color: #292929;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
`;

const Button = styled.button`
  width: 65px;
  height: 43px;
  border-radius: 7px;
  border: none;
  background: #17d6b5;
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  margin-top: 14px;
  cursor: pointer;
`;

const RecordList = styled.div``;

const RecordItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  color: #7e7e7e;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  width: 350px;
  height: 77px;
  border-radius: 14px;
  background: #f9f9f9;
  border: 1px #d6d6d6;

  div {
    padding-left: 18px;
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
  bottom: 0;
  width: 390px;
  height: 84px;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;

const SubmitButton = styled.button`
  width: 350px;
  height: 52px;
  border-radius: 9px;
  background: #17d6b5;
  border: none;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  margin-top: 22px;
  cursor: pointer;
`;
