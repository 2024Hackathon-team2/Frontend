import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const TestCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = location.state || { results: [] };

  const goToBack = () => {
    navigate("/testrecord");
  };

  const startGameAgain = () => {
    navigate("/test");
  };

  const correctAnswers = results.filter((result) => result.correct).length;
  const percentage = (correctAnswers / 4) * 100;
  let status;
  let backgroundColor;
  if (percentage === 100) {
    status = "멀쩡";
    backgroundColor = "#37AB2F";
  } else if (percentage >= 50) {
    status = "알딸딸";
    backgroundColor = "#F3D03E";
  } else {
    status = "취함";
    backgroundColor = "#BB3434";
  }

  useEffect(() => {
    // Save results to local storage
    const storedResults = JSON.parse(localStorage.getItem("testResults")) || [];
    const newResult = {
      date: new Date().toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      }),
      percentage,
      status,
    };

    // Check if the result is already saved to prevent duplicates
    const isDuplicate = storedResults.some(
      (result) =>
        result.date === newResult.date &&
        result.percentage === newResult.percentage &&
        result.status === newResult.status
    );

    if (!isDuplicate) {
      localStorage.setItem(
        "testResults",
        JSON.stringify([...storedResults, newResult])
      );
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={goToBack}>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          테스트 결과
          <div></div>
        </Header>
        <Content>
          <ResultTable>
            {results.slice(0, 4).map((result, index) => (
              <tr key={index}>
                <td>{index + 1}번 문제</td>
                <td
                  style={{
                    color: result.correct ? "#17D6B5" : "#7A7881",
                  }}
                >
                  {result.correct ? "정답" : "오답"}
                </td>
              </tr>
            ))}
          </ResultTable>
          <div className="percentage">정답률: {percentage}%</div>
          <div className="status">
            <div className="statusMent">00님의 취한 정도는</div>
            <Status backgroundColor={backgroundColor}>{status}</Status>
          </div>
          <BottomContainer>
            <div className="testagain" onClick={startGameAgain}>
              테스트 다시 하기
            </div>
            <div className="gotoTestrecord" onClick={goToBack}>
              테스트 기록 보기
            </div>
          </BottomContainer>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Container>
    </>
  );
};

export default TestCompletePage;

// Styled components
const Container = styled.div`
  width: 390px;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  font-family: Pretendard;
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

const Content = styled.div`
  padding: 20px;
  padding-top: 82px;
  height: 652px;
  overflow-y: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  .percentage {
    background-color: #66646f;
    width: 290px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 9px;
    color: white;
    text-align: center;
    line-height: 30px;
    margin: 30px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .statusMent {
    font-size: 13px;
    margin-right: 10px;
  }
`;

const Status = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: 61px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 9px;
  color: white;
  text-align: center;
  line-height: 26px;
  font-size: 16px;
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
const BottomContainer = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: Pretendard;
  font-size: 13px;
  width: 90%;
  margin: 40px;
  .testagain {
    border: 1px solid #17d6b5;
    color: #17d6b5;
    width: 140px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    flex-shrink: 0;
    border-radius: 9px;
    cursor: pointer;
  }
  .gotoTestrecord {
    background: #17d6b5;
    color: white;
    width: 140px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    flex-shrink: 0;
    border-radius: 9px;
    cursor: pointer;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 390px;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;

const ResultTable = styled.table`
  width: 60%;
  border-collapse: collapse;
  margin-left: 30px;
  margin-top: 30px;
  tr {
    font-family: Pretendard;
    font-size: 13px;
  }
  td {
    padding: 10px;
    text-align: left;
  }
`;
