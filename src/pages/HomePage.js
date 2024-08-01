import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import HomeCalendar from "../components/HomeCalendar/HomeCalendar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const goToGoal = () => {
    navigate("/goal");
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>서비스명</Header>
        <Content>
          <Title>
            <div>00님의 7월 음주 목표</div>
            <button onClick={goToGoal}>수정</button>
          </Title>
          <GoalReach>
            <div>잔 수</div>
            <div>2잔/13잔</div>
            <div>79%</div>
          </GoalReach>
          <DrinkingCalendar>
            <div className="goal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="38"
                viewBox="0 0 33 38"
                fill="none"
              >
                <rect
                  x="6.88333"
                  y="18.0094"
                  width="17.0596"
                  height="20.1474"
                  rx="1.15789"
                  transform="rotate(-18.1858 6.88333 18.0094)"
                  fill="#C9C9C9"
                />
                <rect
                  x="22.5158"
                  y="27.0117"
                  width="7.95088"
                  height="9.03158"
                  rx="2.31579"
                  transform="rotate(-108.186 22.5158 27.0117)"
                  stroke="#C9C9C9"
                  stroke-width="2.31579"
                  stroke-linejoin="round"
                />
                <rect
                  x="8.49683"
                  y="17.4794"
                  width="13.7404"
                  height="17.3684"
                  rx="1.15789"
                  transform="rotate(-18.1858 8.49683 17.4794)"
                  fill="url(#paint0_linear_767_1512)"
                />
                <rect
                  x="12.5111"
                  y="20.5482"
                  width="1.00351"
                  height="9.18596"
                  rx="0.501754"
                  transform="rotate(-18.1858 12.5111 20.5482)"
                  fill="url(#paint1_linear_767_1512)"
                />
                <rect
                  x="14.7114"
                  y="19.8253"
                  width="1.00351"
                  height="9.18596"
                  rx="0.501754"
                  transform="rotate(-18.1858 14.7114 19.8253)"
                  fill="url(#paint2_linear_767_1512)"
                />
                <rect
                  x="19.1115"
                  y="18.3799"
                  width="1.00351"
                  height="9.18596"
                  rx="0.501754"
                  transform="rotate(-18.1858 19.1115 18.3799)"
                  fill="url(#paint3_linear_767_1512)"
                />
                <rect
                  x="16.9114"
                  y="19.1027"
                  width="1.00351"
                  height="9.18596"
                  rx="0.501754"
                  transform="rotate(-18.1858 16.9114 19.1027)"
                  fill="url(#paint4_linear_767_1512)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.0021 12.784C19.0213 12.7502 19.0397 12.7163 19.0575 12.6823C19.0664 12.7002 19.0755 12.7179 19.0847 12.7355C19.0567 12.751 19.0291 12.7672 19.0021 12.784ZM8.37404 20.4447C9.20153 20.1729 9.81202 19.5446 10.0912 18.7861C10.9966 19.5148 12.5975 19.7073 14.2137 19.1764C14.6482 19.0336 15.0508 18.8495 15.413 18.6346C15.413 18.7067 15.4242 18.7799 15.4479 18.8521C15.5677 19.2167 15.9602 19.4151 16.3248 19.2954C16.6893 19.1756 16.8877 18.783 16.768 18.4185C16.6942 18.1939 16.5169 18.0324 16.3064 17.9695C16.4733 17.8134 16.623 17.65 16.754 17.4815C16.8779 17.322 17.1489 17.3521 17.2119 17.544L17.6087 18.7517C17.8681 19.5415 18.7187 19.9714 19.5085 19.712C20.2984 19.4525 20.7283 18.6019 20.4688 17.8121L19.9421 16.2086C20.1469 16.2132 20.3559 16.1836 20.5616 16.116C21.4003 15.8405 21.9093 15.0234 21.8281 14.18C22.0071 14.1588 22.1867 14.1196 22.3647 14.0612C23.8025 13.5888 24.5852 12.0403 24.1129 10.6024C23.6405 9.16457 22.092 8.38187 20.6541 8.85422C19.9263 9.09332 19.3663 9.60817 19.0521 10.2448C18.2676 8.99581 16.2454 8.51497 14.2206 9.18014C12.8226 9.63941 11.7495 10.5378 11.2551 11.5342C10.423 10.9684 9.34678 10.7812 8.31689 11.1196C6.55501 11.6984 5.59593 13.5958 6.17472 15.3577C6.18351 15.3845 6.19261 15.4111 6.202 15.4375C5.06478 16.0587 4.49634 17.4212 4.91531 18.6965C5.38766 20.1344 6.93618 20.9171 8.37404 20.4447Z"
                  fill="url(#paint5_linear_767_1512)"
                />
                <path
                  d="M1 12.75L6.95 6.80005"
                  stroke="#F4C139"
                  stroke-width="1.7"
                />
                <path
                  d="M13.75 1.73543L14.3554 2.81307L14.5467 3.1535L14.9295 3.23019L16.1415 3.47296L15.3037 4.38174L15.039 4.66883L15.0844 5.05665L15.228 6.28433L14.1048 5.76835L13.75 5.60535L13.3952 5.76835L12.272 6.28433L12.4156 5.05665L12.461 4.66883L12.1963 4.38174L11.3585 3.47296L12.5705 3.23019L12.9533 3.1535L13.1446 2.81307L13.75 1.73543Z"
                  fill="#FFFCDF"
                  stroke="#F4C139"
                  stroke-width="1.7"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_767_1512"
                    x1="15.367"
                    y1="17.4794"
                    x2="15.367"
                    y2="34.8478"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5A92F" />
                    <stop offset="1" stop-color="#F3D03E" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_767_1512"
                    x1="13.0129"
                    y1="20.5482"
                    x2="13.0129"
                    y2="29.7342"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F58C14" />
                    <stop offset="1" stop-color="#F3BD1C" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_767_1512"
                    x1="15.2132"
                    y1="19.8253"
                    x2="15.2132"
                    y2="29.0113"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F58C14" />
                    <stop offset="1" stop-color="#F3BD1C" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_767_1512"
                    x1="19.6133"
                    y1="18.3799"
                    x2="19.6133"
                    y2="27.5658"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F58C14" />
                    <stop offset="1" stop-color="#F3BD1C" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_767_1512"
                    x1="17.4131"
                    y1="19.1027"
                    x2="17.4131"
                    y2="28.2886"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F58C14" />
                    <stop offset="1" stop-color="#F3BD1C" />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_767_1512"
                    x1="12.8638"
                    y1="9.62585"
                    x2="16.5017"
                    y2="20.6998"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#ECECEC" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>
              이번 달의 목표치에 도달하려면 N회만 마셔야 해요!
            </div>
            <div>음주 달력</div>
            <HomeCalendar></HomeCalendar>
          </DrinkingCalendar>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default HomePage;

// Styled components
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
  justify-content: center; /* Center the content */
  position: fixed;
  top: 0;
  width: 390px;
  height: 54px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  box-shadow: 0px 4px 10px -12px black;
  z-index: 10;
`;

const Content = styled.div`
  padding: 20px;
  padding-top: 74px; /* Space for the fixed header */
  padding-bottom: 84px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto; /* Allow vertical scrolling */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items at the start */
  align-items: center;
  background-color: white;

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit browsers */
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
`;

const Title = styled.div`
  font-family: Pretendard;
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const GoalReach = styled.div`
  font-family: Pretendard-Medium;
  width: 350px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const DrinkingCalendar = styled.div`
  .goal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 53px;
    flex-shrink: 0;
    font-size: 14px;
    border-radius: 8px;
    background: linear-gradient(108deg, #96e3ff 24.44%, #c8fdf8 105.38%);
    border-radius: 8px;
    text-align: center;
    line-height: 36px;
    font-family: Pretendard;
    margin-bottom: 26px;
  }
  > div {
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 133.8%; /* 18.732px */
  }
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
