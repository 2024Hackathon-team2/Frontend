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

const generateQuestion = () => {
  const operations = ["+", "-", "x", "÷"];
  const randomOperation = () =>
    operations[Math.floor(Math.random() * operations.length)];
  const randomNumber = () => Math.floor(Math.random() * 10) + 1;

  let num1, num2, num3, op1, op2, answer;

  do {
    num1 = randomNumber();
    num2 = randomNumber();
    num3 = randomNumber();
    op1 = randomOperation();
    op2 = randomOperation();

    // Ensure at least one addition or subtraction
    while (!["+", "-"].includes(op1) && !["+", "-"].includes(op2)) {
      op1 = randomOperation();
      op2 = randomOperation();
    }

    // Ensure division results in an integer
    if (op1 === "÷") {
      while (num1 % num2 !== 0) {
        num1 = randomNumber();
        num2 = randomNumber();
      }
    }

    if (op2 === "÷") {
      while (num2 % num3 !== 0) {
        num2 = randomNumber();
        num3 = randomNumber();
      }
    }

    const expression = `${num1} ${op1} ${num2} ${op2} ${num3}`;
    try {
      answer = eval(expression.replace("x", "*").replace("÷", "/"));
    } catch {
      answer = null;
    }
  } while (!Number.isInteger(answer) || answer < 0);

  return { question: `${num1} ${op1} ${num2} ${op2} ${num3}`, answer };
};

const TestPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [progress, setProgress] = useState(1);
  const [results, setResults] = useState([]);

  const goToBack = () => {
    navigate("/testrecord");
  };

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = () => {
    const parsedUserAnswer = parseFloat(userAnswer);
    const correct = parsedUserAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setResults([...results, { question: currentQuestion.question, correct }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const nextQuestion = () => {
    if (progress === 4) {
      navigate("/testcomplete", { state: { results } });
    } else {
      setCurrentQuestion(generateQuestion());
      setUserAnswer("");
      setIsCorrect(null);
      setProgress(progress + 1);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={goToBack}>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          음주 정도 테스트
          <div></div>
        </Header>
        <Content>
          <div className="box">
            <TopContainer>
              <div>지금 얼마나 취했을까?</div>
              <ProgressBar>
                <Progress progress={progress}></Progress>
              </ProgressBar>
              <div>
                <span style={{ fontSize: "16px" }}>{progress}</span>
                <span style={{ fontSize: "14px", color: "#CCCCCC" }}>/4</span>
              </div>
            </TopContainer>

            <MiddleContainer>
              <Quiz>{currentQuestion.question}</Quiz>
              <InputContainer>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleAnswerChange}
                  placeholder="정답을 적어주세요."
                  onKeyPress={handleKeyPress}
                />
                {userAnswer && (
                  <SubmitButton onClick={checkAnswer}>입력</SubmitButton>
                )}
              </InputContainer>

              {isCorrect !== null && (
                <div className="testCorrectBox">
                  <div>{isCorrect ? "정답입니다!" : "오답입니다!"}</div>
                  <button className="continueButton" onClick={nextQuestion}>
                    계속
                  </button>
                </div>
              )}
            </MiddleContainer>
          </div>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Container>
    </>
  );
};

export default TestPage;

// Styled components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  font-family: Pretendard;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;

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
  padding-top: 74px; /* Space for the fixed header */
  padding-bottom: 104px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto; /* Allow vertical scrolling */
  background-color: white;
  font-family: Pretendard;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  .box {
    width: 350px;
    align-items: center;
    justify-content: center;
  }

  .title {
    width: 100%;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit browsers */
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
`;

const TopContainer = styled.div`
  margin-bottom: 20px;
  & > div:first-child {
    font-weight: bold;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #cbc9d3;
  margin: 10px 0;
  position: relative;
  border-radius: 5px;
`;

const Progress = styled.div`
  width: ${(props) => props.progress * 25}%;
  height: 100%;
  background-color: #17d6b5;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .testCorrectBox {
    font-family: Pretendard;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
  }

  .continueButton {
    width: 290px;
    height: 30px;
    border-radius: 9px;
    background: #17d6b5;
    border: none;
    color: white;
    margin: 30px;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  position: relative;

  input {
    width: 275px;
    height: 31px;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    padding-left: 15px;
  }
`;

const SubmitButton = styled.button`
  width: 31px;
  height: 20px;
  font-family: Pretendard;
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  position: absolute;
  bottom: 8px;
  right: 4px;
  background-color: #7a7881;
  border-radius: 6px;
  border: none;
  color: white;
  cursor: pointer;
`;

const Quiz = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;
