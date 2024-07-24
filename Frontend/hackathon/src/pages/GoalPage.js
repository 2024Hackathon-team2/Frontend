import React, { useState } from "react";
import styled from "styled-components";

const GoalPage = () => {
  const [selections, setSelections] = useState([{ drink: "", amount: "" }]);
  const [message, setMessage] = useState("");

  const drinksOptions = {
    "": [],
    소주: ["1잔 (50ml)", "2잔", "3잔", "4잔", "5잔", "6잔"],
    맥주: ["1잔 (200ml)", "2잔", "1병", "1병 반"],
    막걸리: ["1사발 (250ml)", "2사발", "1병", "1병 반"],
    와인: ["1잔 (150ml)", "2잔", "3잔", "4잔"],
  };

  const handleAddClick = () => {
    if (selections.length < 3) {
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
      <Header>음주 목표 설정</Header>
      <Content>
        <Question>한 달에 얼마를 목표로 하시나요?</Question>
        {selections.map((selection, index) => (
          <DropdownWrapper key={index}>
            <Dropdown
              value={selection.drink}
              onChange={(e) =>
                handleSelectionChange(index, "drink", e.target.value)
              }
            >
              <option value="">주종</option>
              <option value="소주">소주</option>
              <option value="맥주">맥주</option>
              <option value="막걸리">막걸리</option>
              <option value="와인">와인</option>
            </Dropdown>
            <Dropdown
              value={selection.amount}
              onChange={(e) =>
                handleSelectionChange(index, "amount", e.target.value)
              }
            >
              <option value="">N잔</option>
              {drinksOptions[selection.drink].map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </Dropdown>
          </DropdownWrapper>
        ))}
        {message && <ErrorMessage>{message}</ErrorMessage>}
        <Button onClick={handleAddClick}>추가</Button>
      </Content>
      <Footer>
        <SubmitButton onClick={handleSubmit}>목표 설정 완료</SubmitButton>
      </Footer>
    </Container>
  );
};

export default GoalPage;

// Styled components
const Container = styled.div`
  width: 390px;
  height: 844px;
`;

const Header = styled.header`
  width: 390px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.408px;
  text-align: center;
  color: #000;
`;

const Content = styled.div`
  padding: 20px;
`;

const Question = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 15.246px;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Dropdown = styled.select`
  margin-right: 10px;
  width: 45%;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const Footer = styled.footer`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
`;

const SubmitButton = styled(Button)`
  background-color: #555;
`;
