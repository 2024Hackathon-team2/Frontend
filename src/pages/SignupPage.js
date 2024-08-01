import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  const [pw2, setPW2] = useState("");
  const [isPwMatch, setIsPwMatch] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const BASE_URL = " ";

  useEffect(() => {
    // 비밀번호 일치 여부 확인
    setIsPwMatch(pw === pw2);
    // 버튼 활성화 여부 결정
    setIsButtonActive(email !== "" && pw !== "" && pw2 !== "" && isPwMatch);
  }, [email, pw, pw2, isPwMatch]);

  const goSignup = async () => {
    if (isButtonActive) {
      await axios({
        method: "POST",
        url: "/account/signup/",
        data: {
          username: email,
          password: pw,
          password2: pw2,
        },
      })
        .then((response) => {
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          <Title>회원가입</Title>
          <SubTitle>가입을 위해 아이디와 비밀번호를 설정해주세요.</SubTitle>
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
            <div>비밀번호 확인</div>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
              onChange={(e) => setPW2(e.target.value)}
              style={{ borderColor: isPwMatch ? "#ccc" : "red" }}
            ></input>
            {!isPwMatch && (
              <ErrorMessage
                style={{ position: "absolute", top: "245px", width: "358px" }}
                visible={!isPwMatch}
              >
                비밀번호가 일치하지 않습니다
              </ErrorMessage>
            )}

            <button
              onClick={goSignup}
              disabled={!isButtonActive}
              style={{
                backgroundColor: isButtonActive ? "#17D6B5" : "white",
                color: isButtonActive ? "white" : "#ccc",
              }}
            >
              가입 완료
            </button>
          </InputWrapper>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default SignupPage;

// Styled components
const Container = styled.div`
  width: 390px;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 16px;
  padding-bottom: 104px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto; /* Allow vertical scrolling */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit browsers */
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
`;

const Title = styled.div`
  width: 151px;
  height: 27px;
  margin-bottom: 16px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  color: #ccc;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 11px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  div {
    display: flex;
    flex-direction: column;
    color: #000;
    font-family: Pretendard;
    font-size: 13px;
    font-weight: 400;
    margin-top: 16px;
  }

  input {
    width: 343px;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding-left: 15px;
    color: black;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 400;
  }

  input::placeholder {
    color: #d5d5d5;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 400;
  }

  button {
    margin-top: 30px;
    width: 358px;
    height: 48px;
    border-radius: 8px;
    background-color: white;
    color: #ccc;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 400;
  position: absolute;
  top: 240px;
  width: 358px;
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
