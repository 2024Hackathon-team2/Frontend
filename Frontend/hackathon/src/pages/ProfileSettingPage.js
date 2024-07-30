import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import basicImage from "./images/기본프로필이미지.png";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const RecordDonePage = () => {
  const navigate = useNavigate();

  const goToProfileSetting = () => {
    navigate("/profilesetting");
  };

  const goToFriend = () => {
    navigate("/profilesetting");
  };

  const goToDelete = () => {};
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>마이페이지</Header>
        <Content>
          <Profile>
            <img src={basicImage} />
            <Name>abcdef</Name>
            <Email>abcdef@gmail.com</Email>
          </Profile>
          <PageButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="352"
              height="2"
              viewBox="0 0 352 2"
              fill="none"
            >
              <path
                d="M1 1H351"
                stroke="#CCCCCC"
                stroke-opacity="0.3"
                stroke-linecap="round"
              />
            </svg>
            <button onClick={goToProfileSetting}>프로필 변경</button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="352"
              height="2"
              viewBox="0 0 352 2"
              fill="none"
            >
              <path
                d="M1 1H351"
                stroke="#CCCCCC"
                stroke-opacity="0.3"
                stroke-linecap="round"
              />
            </svg>
            <button onClick={goToFriend}>친구 관리</button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="352"
              height="2"
              viewBox="0 0 352 2"
              fill="none"
            >
              <path
                d="M1 1H351"
                stroke="#CCCCCC"
                stroke-opacity="0.3"
                stroke-linecap="round"
              />
            </svg>
            <button onClick={goToDelete}>탈퇴하기</button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="352"
              height="2"
              viewBox="0 0 352 2"
              fill="none"
            >
              <path
                d="M1 1H351"
                stroke="#CCCCCC"
                stroke-opacity="0.3"
                stroke-linecap="round"
              />
            </svg>
          </PageButton>
        </Content>
        <Footer></Footer>
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

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 175px;
    height: 175px;
  }
`;

const Name = styled.div`
  margin-top: 32px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 22px */
`;

const Email = styled.div`
  margin-top: 8px;
  color: #ccc;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
`;

const PageButton = styled.div`
  margin-top: 59px;
  width: 350px;
  display: flex;
  flex-direction: column;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 350px;
    height: 55px;
    background-color: white;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 16px */
    border: none;
    cursor: pointer;
  }
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
