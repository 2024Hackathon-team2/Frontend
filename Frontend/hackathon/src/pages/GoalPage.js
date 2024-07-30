import React, { useState } from "react";
import styled from "styled-components";
import backButtonImage from "./images/back.png";
import Navbar from "../components/Navbar";

const GoalPage = () => {
  const [selections, setSelections] = useState([{ drink: "", amount: "" }]);
  const [message, setMessage] = useState("");

  const drinksOptions = {
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
    console.log("Selections:", selections);
  };

  return (
    <Container>
      <Header>
        <BackButton>
          <img src={backButtonImage} alt="Back" />
        </BackButton>
        음주 목표 설정
        <div></div>
      </Header>
      <Content>
        <div>
          <Question>한 달에 얼마를 목표로 하시나요?</Question>
          <DropdownWrapper>
            <Dropdown
              isPrimary={true}
              value={selections[0]?.drink || ""}
              onChange={(e) =>
                handleSelectionChange(0, "drink", e.target.value)
              }
            >
              <option className="ex" value="">
                주종
              </option>
              <option value="소주">소주</option>
              <option value="맥주">맥주</option>
              <option value="막걸리">막걸리</option>
              <option value="와인">와인</option>
            </Dropdown>
            <Dropdown
              isPrimary={true}
              value={selections[0]?.amount || ""}
              onChange={(e) =>
                handleSelectionChange(0, "amount", e.target.value)
              }
            >
              <option className="ex" value="">
                N잔
              </option>
              {drinksOptions[selections[0]?.drink || ""].map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </Dropdown>
            <Button onClick={handleAddClick}>추가</Button>
          </DropdownWrapper>
          {selections.slice(1).map((selection, index) => (
            <DropdownWrapper key={index + 1}>
              <Dropdown
                isPrimary={false}
                value={selection.drink}
                onChange={(e) =>
                  handleSelectionChange(index + 1, "drink", e.target.value)
                }
              >
                <option className="ex" value="">
                  주종
                </option>
                <option value="소주">소주</option>
                <option value="맥주">맥주</option>
                <option value="막걸리">막걸리</option>
                <option value="와인">와인</option>
              </Dropdown>
              <Dropdown
                isPrimary={false}
                value={selection.amount}
                onChange={(e) =>
                  handleSelectionChange(index + 1, "amount", e.target.value)
                }
              >
                <option className="ex" value="">
                  N잔
                </option>
                {drinksOptions[selection.drink].map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </Dropdown>
            </DropdownWrapper>
          ))}
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </div>
        <div>
          <SubmitButton onClick={handleSubmit}>목표 설정 완료</SubmitButton>
        </div>
      </Content>
      <Footer>
        <Navbar></Navbar>
      </Footer>
    </Container>
  );
};

export default GoalPage;

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
  height: 652px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Question = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15.246px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 20.08px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Dropdown = styled.select`
  width: ${({ isPrimary }) =>
    isPrimary
      ? "125px"
      : "165px"}; /* 기본 드롭다운과 새 드롭다운의 너비 설정 */
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d1d3d9;
  background: #fff;

  padding: 5px;
  padding-left: 14.29px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 14.29px;
  color: ${(props) => (props.value === "" ? "#C7C7C7" : "#292929")};
  option {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #f2f3f6;
  background: #f2f3f6;

  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Button = styled.button`
  width: 76px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d1d3d9;
  background: #4d4d4d;

  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  width: 350px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 9px;
  background: #7e7e7e;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
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
  background: var(--unnamed, gray);
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;
