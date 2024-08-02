import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/Navbar";
import testIcon from "../images/TestPage/음주테스트아이콘.png";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const TestRecordPage = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("testResults")) || [];
    setTestResults(results);
  }, []);

  const startGame = () => {
    navigate("/test");
  };

  const deleteRecord = (indexToDelete) => {
    const updatedResults = testResults.filter(
      (_, index) => index !== indexToDelete
    );
    localStorage.setItem("testResults", JSON.stringify(updatedResults));
    setTestResults(updatedResults);
  };

  // 날짜별로 그룹화된 결과를 생성
  const groupedResults = testResults.reduce((acc, result) => {
    const date = result.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(result);
    return acc;
  }, {});

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>음주 정도 테스트</Header>
        <Content>
          <div className="title">음주 정도 테스트 기록</div>
          <RecordContainer>
            {Object.keys(groupedResults).map((date) => (
              <div key={date}>
                <DateTitle>{date}</DateTitle>
                {groupedResults[date].map((result, index) => {
                  let status;
                  let backgroundColor;
                  if (result.percentage === 100) {
                    status = "멀쩡";
                    backgroundColor = "#37AB2F";
                  } else if (result.percentage >= 50) {
                    status = "알딸딸";
                    backgroundColor = "#F3D03E";
                  } else {
                    status = "취함";
                    backgroundColor = "#BB3434";
                  }
                  return (
                    <RecordItem key={index}>
                      <div className="Container">
                        <div className="box">
                          <img src={testIcon} alt="Test Icon"></img>
                          <div className="test">음주테스트</div>
                        </div>
                        <div className="details">
                          <div>{result.percentage}%</div>
                          <StatusBox backgroundColor={backgroundColor}>
                            {status}
                          </StatusBox>
                        </div>
                      </div>
                      <DeleteButton onClick={() => deleteRecord(index)}>
                        삭제
                      </DeleteButton>
                    </RecordItem>
                  );
                })}
              </div>
            ))}
          </RecordContainer>
          <div className="testStartButton" onClick={startGame}>
            새 음주 테스트 시작
          </div>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Container>
    </>
  );
};

export default TestRecordPage;

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
  justify-content: center;
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
  overflow-y: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }
  .testStartButton {
    width: 230px;
    height: 40px;
    background: #17d6b5;
    color: white;
    text-align: center;
    line-height: 40px;
    flex-shrink: 0;
    border-radius: 9px;
    cursor: pointer;
    position: fixed;
    bottom: 15%;
  }
`;

const RecordContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const DateTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const RecordItem = styled.div`
  padding: 10px;
  .box {
    display: flex;
    align-items: center;
    width: 50%;
  }
  .details {
    display: flex;
    align-items: center;
    width: 30%;
  }
  .Container {
    display: flex;
    justify-content: space-between;
  }
`;

const StatusBox = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 5px;
  color: white;
  text-align: center;
  width: 61px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 9px;
  color: white;
  line-height: 26px;
  font-size: 16px;
`;

const DeleteButton = styled.button`
  background: #bb3434;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
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