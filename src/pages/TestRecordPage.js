import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/Navbar";
import testIcon1 from "../images/TestPage/음주테스트아이콘맥주.png";
import testIcon2 from "../images/TestPage/음주테스트아이콘막걸리.png";
import testIcon3 from "../images/TestPage/음주테스트아이콘와인.png";
import deleteButtonImage from "../images/TestPage/삭제.png";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const icons = [testIcon1, testIcon2, testIcon3];

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

  const sortedDates = Object.keys(groupedResults).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>음주 정도 테스트</Header>
        <Content>
          <div className="title">
            {testResults.length === 0
              ? "지금 얼마나 취했을까?"
              : "음주 정도 테스트 기록"}
          </div>
          <RecordContainer>
            {testResults.length === 0 ? (
              <NoRecordMessage>
                음주 테스트를 실행한 적이 없어요.
                <br />
                아래 버튼을 눌러 첫 음주 테스트를 시작하세요.
              </NoRecordMessage>
            ) : (
              sortedDates.map((date) => (
                <DateSection key={date}>
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
                    const icon = icons[index % icons.length]; // Rotate through icons
                    return (
                      <RecordItem key={`${date}-${index}`}>
                        <Division>
                          <div className="box">
                            <img src={icon} alt="Test Icon"></img>
                            <div className="test">음주테스트</div>
                          </div>
                        </Division>
                        <Division>
                          <div className="percentage">{result.percentage}%</div>
                          <StatusBox backgroundColor={backgroundColor}>
                            {status}
                          </StatusBox>

                          <DeleteButton onClick={() => deleteRecord(index)}>
                            <img src={deleteButtonImage} alt="삭제" />
                          </DeleteButton>
                        </Division>
                      </RecordItem>
                    );
                  })}
                </DateSection>
              ))
            )}
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
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Content = styled.div`
  padding: 20px;
  padding-top: 74px; /* Space for the fixed header */
  padding-bottom: 104px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto; /* Allow vertical scrolling */
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

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit browsers */
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
`;

const RecordContainer = styled.div`
  margin-top: 20px;
`;

const NoRecordMessage = styled.div`
  display: flex;
  width: 349px;
  height: 122px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #ccc;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 133.8%; /* 24.084px */
  margin-top: 250px;
`;

const DateSection = styled.div`
  margin-bottom: 20px;
`;

const DateTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const RecordItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 325px;
  height: 79px;

  .box {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .Container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .percentage {
    margin-right: 11px;
  }

  img {
    width: 48px;
    height: 48px;
    margin-right: 11px;
  }
`;

const StatusBox = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 5px;
  color: white;
  text-align: center;
  justify-content: center;
  width: 61px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 9px;
  color: white;
  line-height: 26px;
  font-size: 16px;
`;

const DeleteButton = styled.button`
  width: 11.313px;
  height: 11.313px;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  border: none;
  margin-left: 10px;

  img {
    width: 11.313px;
    height: 11.313px;
  }
`;

const Division = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;
