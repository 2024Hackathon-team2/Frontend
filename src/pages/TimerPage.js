import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/Navbar";
import BackgroundImage from "./images/배경.png";
import StartImage from "./images/재생.png";
import PauseImage from "./images/일시정지.png";
import InitializationImage from "./images/초기화.png";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const TimerPage = () => {
  const [timeLeft, setTimeLeft] = useState(259200); // 72 hours in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [showInput, setShowInput] = useState(true); // Show input initially

  useEffect(() => {
    // Retrieve saved data from local storage
    const savedTimeLeft = parseInt(localStorage.getItem("timeLeft"), 10);
    const savedIsRunning = localStorage.getItem("isRunning") === "true";
    const savedStartTime = parseInt(localStorage.getItem("startTime"), 10);

    if (savedTimeLeft && savedStartTime) {
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsed = currentTime - savedStartTime;

      if (elapsed >= savedTimeLeft) {
        setTimeLeft(0);
        setIsRunning(false);
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("isRunning");
        localStorage.removeItem("startTime");
      } else {
        setTimeLeft(savedTimeLeft - elapsed);
        setIsRunning(savedIsRunning);
      }
    }
  }, []);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (isRunning) {
      localStorage.setItem("timeLeft", timeLeft);
      localStorage.setItem("isRunning", isRunning);
      if (!localStorage.getItem("startTime")) {
        localStorage.setItem("startTime", Math.floor(Date.now() / 1000));
      }
    } else {
      localStorage.removeItem("startTime");
    }
  }, [timeLeft, isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(259200);
    setShowInput(true); // Show input on reset
    localStorage.removeItem("startTime");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("isRunning");
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setTimeInput(value);
    }
  };

  const handleInputSubmit = () => {
    const hoursAgo = parseInt(timeInput, 10);
    if (!isNaN(hoursAgo) && hoursAgo > 0 && hoursAgo <= 71) {
      const newTimeLeft = 259200 - hoursAgo * 3600;
      setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
      setShowInput(false); // Hide input after submission
    } else {
      alert("71 이하의 자연수만 입력 가능합니다");
    }
  };

  const toggleTimer = () => {
    setIsRunning((prevRunning) => !prevRunning);
    setShowInput(false); // Hide input when timer starts
  };

  const formatTime = (time) => {
    if (time <= 0) return "00:00:00";
    const hours = Math.floor(time / 3600);
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <p>정상 간 타이머</p>
        <Content>
          <InputWrapper showInput={showInput}>
            {showInput && (
              <>
                <p className="wait">정상 간 타이머 작동 전 잠깐!</p>
                <label>술을 마신지 얼마나 되었나요?</label>
                <div>
                  <Input
                    type="number"
                    value={timeInput}
                    onChange={handleInputChange}
                    placeholder="숫자로 입력해 주세요"
                  />
                  <p>시간 전</p>
                  <SubmitButton onClick={handleInputSubmit}>확인</SubmitButton>
                </div>
              </>
            )}
          </InputWrapper>
          <TimerWrapper>
            <TimerCircle>
              <svg viewBox="0 0 36 36" transform="scale(-1, 1)">
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
                      style={{ stopColor: "#6BD7FF", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#C3FBF9", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <filter
                    id="dropShadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur in="SourceAlpha" stdDeviation="100" />
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
                  strokeDashoffset={`${(100 * (259200 - timeLeft)) / 259200}`}
                  strokeLinecap="round"
                  filter="url(#dropShadow)"
                ></circle>
              </svg>

              <TimeText>
                {timeLeft === 0
                  ? "타이머 종료!"
                  : "정상 간으로 돌아오기까지 남은 시간"}
              </TimeText>
              <TimeDisplay>{formatTime(timeLeft)}</TimeDisplay>
            </TimerCircle>
          </TimerWrapper>
          <ButtonWrapper>
            <ResetButton onClick={resetTimer}>
              <img src={InitializationImage} alt="Reset" />
            </ResetButton>
            <Button onClick={toggleTimer}>
              <img
                src={isRunning ? PauseImage : StartImage}
                alt={isRunning ? "Pause" : "Start"}
              />
            </Button>
            <div></div>
          </ButtonWrapper>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Container>
    </>
  );
};

export default TimerPage;

const Container = styled.div`
  width: 100%; /* Fixed width */
  max-width: 390px;
  height: 100vh; /* Full height of the viewport */
  margin: 0 auto;
  background-color: white;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;

  p {
    color: var(--Color, #fff);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    margin: 20px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  align-items: center;
`;

const Footer = styled.footer`
  width: 100%; /* Fixed width */
  max-width: 390px;
  height: 84px; /* Fixed height */
  display: flex;
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
  width: 262px; /* Fixed size */
  height: 262px; /* Fixed size */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    outline: none;
    border: none;
  }

  circle {
    outline: none;
    border: none;
  }
`;

const TimeText = styled.div`
  position: relative;
  color: var(--Color, #fff);
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
`;

const TimeDisplay = styled.div`
  position: relative;
  color: var(--Color, #fff);
  font-family: Pretendard;
  font-size: 46.4px;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 350px;

  div {
    width: 90px;
    height: 44px;
  }
`;

const Button = styled.button`
  margin: 20px;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  img {
    width: 70px;
    height: 70px;
  }
`;

const ResetButton = styled.button`
  margin: 20px;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  img {
    width: 44px;
    height: 44px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 350px;
  flex-shrink: 0;
  border-radius: 8px;
  border: none;
  opacity: 0.89;
  background: ${(props) => (props.showInput ? "#fff" : "#36333E0%")};
  backdrop-filter: blur(2px);
  height: ${(props) => (props.showInput ? "134px" : "0")}; /* Maintain space */
  transition: height 0.3s ease;
  overflow: hidden;

  .wait {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%; /* 18.732px */
    margin: 0px;
    margin-left: 16px;
  }

  label {
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 133.8%; /* 21.408px */
    margin-left: 16px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  p {
    color: var(--_, #66646f);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 133.8%; /* 18.732px */
    margin: 0px;
    margin-top: 20px;
    margin-left: 6px;
  }
`;

const Input = styled.input`
  margin-left: 16px;
  margin-top: 20px;
  width: 124px;
  height: 31px;
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid #cbcbcb;
  background: #f8f8f8;
  padding-left: 7px;

  &::placeholder {
    color: #bcbbbd;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 133.8%; /* 16.056px */
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  margin-left: 90px;
  display: flex;
  width: 50px;
  height: 31px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border: none;

  border-radius: 8px;
  background: #17d6b5;

  color: var(--Color, #fff);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 133.8%; /* 16.056px */
  cursor: pointer;

  &:hover {
    background-color: #16b599;
  }
`;
