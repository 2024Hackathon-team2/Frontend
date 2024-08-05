import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const GoalPage = () => {
  const [selections, setSelections] = useState([{ drink: "", amount: "" }]);
  const [message, setMessage] = useState("");

  const drinksOptions = {
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

  const BASE_URL = "https://drinkit.pythonanywhere.com/";

  const handleAddClick = () => {
    if (selections.length < 4) {
      setSelections([...selections, { drink: "", amount: "" }]);
    } else {
      setMessage("최대 생성 개수를 초과하였습니다");
    }
  };

  const handleSelectionChange = (index, type, value) => {
    const newSelections = [...selections];
    newSelections[index][type] = value;
    setSelections(newSelections);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("accessToken");

    const requestBody = {
      selections: selections,
    };

    console.log("Request Body:", requestBody); // 요청 본문 확인

    fetch(`${BASE_URL}goals/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        navigate("/goaldone");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const navigate = useNavigate();
  const goToGoal = () => {
    navigate("/home");
  };

  const getAvailableDrinks = (index) => {
    const selectedDrinks = selections.map((selection) => selection.drink);
    const availableDrinks = Object.keys(drinksOptions).filter(
      (drink) =>
        !selectedDrinks.includes(drink) || drink === selections[index].drink
    );
    return availableDrinks;
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={goToGoal}>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          음주 목표 설정
          <div></div>
        </Header>
        <Content>
          <div className="box">
            <Question>한 달에 얼마를 목표로 하시나요?</Question>
            {selections.map((selection, index) => (
              <DropdownWrapper key={index}>
                <Dropdown
                  isPrimary={index === 0}
                  value={selection.drink}
                  onChange={(e) =>
                    handleSelectionChange(index, "drink", e.target.value)
                  }
                >
                  <option className="ex" value="">
                    주종
                  </option>
                  {getAvailableDrinks(index).map((drink, i) => (
                    <option key={i} value={drink}>
                      {drink}
                    </option>
                  ))}
                </Dropdown>
                <Dropdown
                  isPrimary={index === 0}
                  value={selection.amount}
                  onChange={(e) =>
                    handleSelectionChange(index, "amount", e.target.value)
                  }
                >
                  <option className="ex" value="">
                    N잔
                  </option>
                  {(drinksOptions[selection.drink] || []).map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Dropdown>
                {index === 0 && <Button onClick={handleAddClick}>추가</Button>}
              </DropdownWrapper>
            ))}
            {message && <ErrorMessage>{message}</ErrorMessage>}
          </div>
          <div>
            <SubmitButton onClick={handleSubmit}>목표 설정 완료</SubmitButton>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default GoalPage;

// Styled components
const Container = styled.div`
  width: 100%;
  max-width: 390px;
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
  width: 100%;
  max-width: 390px;

  height: 54px;
  color: #000;
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
  padding-bottom: 45px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto; /* Allow vertical scrolling */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 100%;

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit browsers */
  }

  .box {
    width: 350px;
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
`;

const Question = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15.246px;
  font-weight: 600;
  padding-bottom: 20.08px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Dropdown = styled.select`
  width: ${({ isPrimary }) => (isPrimary ? "125px" : "165px")};
  height: 40px;
  border-radius: 5px;
  border: 1px solid #d1d3d9;
  background: #fff;
  padding: 5px 14.29px;
  color: ${(props) => (props.value === "" ? "#C7C7C7" : "#292929")};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  option {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 40px;
  border-radius: 13px;
  border: 1px #f2f3f6;
  background: #66646f;
  color: white;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 76px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #d1d3d9;
  background: #4d4d4d;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  width: 350px;
  height: 52px;
  border-radius: 9px;
  background: #17d6b5;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0;
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
