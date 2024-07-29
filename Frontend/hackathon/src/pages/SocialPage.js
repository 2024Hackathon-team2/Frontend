import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const SocialPage = () => {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Container>
        <Header>
          소셜
          <div></div>
        </Header>
        <Content></Content>
      </Container>
    </>
  );
};

export default SocialPage;

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
  box-shadow: 0px 4px 10px -12px gray;

  div {
    margin-right: 20px;
    width: 25px;
    height: 25px;
  }
`;

const Content = styled.div`
  height: 800px; // 최대 높이를 설정합니다.
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
