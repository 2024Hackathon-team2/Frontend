import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import basicImage from "./images/기본프로필이미지.png";
import divImage from "./images/구분선.png";
import widthLineImage from "./images/widthline.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const RecordDonePage = () => {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate("/mypage");
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={goToBack}>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          프로필 변경
          <div></div>
        </Header>
        <Content>
          <ProfileImage>
            <img className="profileimg" src={basicImage} />
            <div>
              <button>이미지 선택</button>
              <img className="divimg" src={divImage} />
              <button>이미지 삭제</button>
            </div>
          </ProfileImage>
          <SetName>
            <img src={widthLineImage} />
            <p>이름</p>
            <div>
              <input placeholder="이름을 입력해 주세요."></input>
              <button>변경</button>
            </div>
          </SetName>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default RecordDonePage;

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
  height: 652px; // 최대 높이를 설정합니다.
  overflow-y: auto; // 세로 스크롤을 허용합니다.
  /* 스크롤바 숨기기 */
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    height: 15px;
    padding: 0px;
    border: none;
    background-color: white;
    color: rgba(204, 204, 204, 0.8);
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 13px */
    margin: 0px;
    margin-top: 22px;
  }

  .profileimg {
    width: 175px;
    height: 175px;
  }

  .divimg {
    width: 0.5px;
    height: 15px;
    margin-left: 17px;
    margin-right: 17px;
    padding: 0px;
    margin-top: 22px;
  }
`;

const SetName = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 350px;
    height: 0px;
    flex-shrink: 0;
  }

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 12px */
  }

  input {
    padding: 0px;
    width: 343px;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #ccc;
    color: black;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 400;
    line-height: 133.8%;
    padding-left: 15px;
  }
  input::placeholder {
    display: flex;
    width: 335.119px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    color: #d5d5d5;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%; /* 20.07px */
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const Footer = styled.footer`
  display: flex;
  width: 390px;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;
