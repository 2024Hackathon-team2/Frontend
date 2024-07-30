import React, { useState, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(7200);
  };

  const toggleTimer = () => {
    setIsRunning((prevRunning) => !prevRunning);
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const progress = (timeLeft / 7200) * 100;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          정상 간 타이머
          <BackButton>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
        </Header>
        <Content>
          <TimerWrapper>
            <TimerCircle>
              <svg viewBox="0 0 36 36">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#7198F2", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#C8D9FF", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <filter
                    id="dropShadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feFlood floodColor="rgba(255, 255, 255, 0.23)" />
                    <feComposite in2="offsetblur" operator="in" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="#d3d3d3"
                  strokeWidth="2"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={`${(100 * (7200 - timeLeft)) / 7200}`}
                  strokeLinecap="round"
                  filter="url(#dropShadow)"
                ></circle>
              </svg>
              <TimeText>
                {timeLeft === 0 ? "타이머 종료!" : formatTime(timeLeft)}
              </TimeText>
              <Button onClick={toggleTimer}>{isRunning ? "⏸️" : "▶️"}</Button>
            </TimerCircle>
            <ResetButton onClick={resetTimer}>🔄</ResetButton>
          </TimerWrapper>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Container>
    </>
  );
};

export default RecordDonePage;

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
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  box-shadow: 0px 4px 10px -12px black;
  background-color: white;
`;

const BackButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  margin-left: 20px;
  cursor: pointer;
  background-color: white;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  padding: 20px;
  padding-top: 82px;
  height: calc(100vh - 138px); // 54px for header + 84px for footer
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #36333e 0%, #5a566a 100%);
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 390px;
  height: 84px;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerCircle = styled.div`
  position: relative;
  width: 262px;
  height: 262px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
`;

const TimeText = styled.div`
  position: relative;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const Button = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-top: 20px;
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-top: 20px;
`;
