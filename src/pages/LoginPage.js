import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import logoImage from "./images/logo.png";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");

  const BASE_URL = "https://drinkit.pythonanywhere.com/";

  // 로그인 성공 시 데이터 저장 부분
  const goLogin = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}accounts/login/`,
        data: {
          email: email, // 로그인 폼에서 입력된 이메일
          password: pw,
        },
      });
      console.log(response.data);

      const { refresh, access } = response.data;
      const userEmail = email; // 사용자가 입력한 이메일 사용

      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("email", userEmail);
      navigate("/mypage");
    } catch (error) {
      console.error(
        "로그인 오류:",
        error.response ? error.response.data : error.message
      );
      if (error.response) {
        const data = error.response.data;

        if (data.email) {
          alert("이메일을 입력해 주세요.");
        } else if (data.password) {
          alert("비밀번호를 입력해 주세요.");
        } else if (
          data.error &&
          data.error.includes("일치하는 회원 정보가 없습니다.")
        ) {
          alert("일치하는 회원 정보가 없습니다.");
        } else {
          alert(data.detail ? data.detail : "로그인 중 오류가 발생했습니다.");
        }
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          <Title>
            <img src={logoImage} />
          </Title>
          <InputWrapper>
            <div>아이디</div>
            <input
              placeholder="이메일 주소를 입력해 주세요"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              onChange={(e) => setPW(e.target.value)}
            ></input>
            <button onClick={goLogin}>로그인</button>
          </InputWrapper>
          <More>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </More>
        </Content>
      </Container>
    </>
  );
};

export default LoginPage;

// Styled components...
// Container, Content, Title, InputWrapper, More, Footer 정의 필요

// Styled components
const Container = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;

  margin: 0 auto;
  background-color: white;
`;

const Content = styled.div`
  height: 100%; // 최대 높이를 설정합니다.

  /* 스크롤바 숨기기 */
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  width: 151px;
  height: 27px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 37px;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 133.8%; /* 26.76px */

  img {
    width: 144px;
    height: 59.005px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    width: 97px;
    height: 20px;
    flex-direction: column;
    flex-shrink: 0;
    color: #000;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%; /* 17.394px */
    margin-top: 13px;
  }

  input {
    padding: 0px;
    width: 343px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #ccc;

    color: black;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%; /* 20.07px */
    padding-left: 15px;
  }

  input::placeholder {
    color: #d5d5d5;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%; /* 20.07px */
  }

  button {
    margin-top: 23px;
    display: flex;
    width: 358px;
    height: 48px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #7a7881;
    flex-shrink: 0;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 133.8%; /* 21.408px */
    border: none;
    cursor: pointer;
  }
`;

const More = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  .division {
    width: 0.7px;
    height: 25px;
    color: #ccc;
    margin: 0px;
    padding: 0px;
    margin-left: 7px;
    margin-right: 9px;
  }
  button {
    border: none;
    width: auto;
    height: 20px;
    background-color: white;
    justify-content: center;
    flex-shrink: 0;
    color: #7a7881;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%; /* 16.056px */
    margin: 0px;
    padding: 0px;
    cursor: pointer;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0%;
  display: flex;
  width: 100%;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;
