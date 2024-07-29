import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
                backgroundColor: isButtonActive ? "#ccc" : "white",
                color: isButtonActive ? "white" : "#ccc",
              }}
            >
              가입 완료
            </button>
          </InputWrapper>
        </Content>
        <Footer></Footer>
      </Container>
    </>
  );
};

export default SignupPage;

// Styled components
const Container = styled.div`
  width: 390px;
  margin: 0 auto;
  background-color: white;
`;

const Content = styled.div`
  padding: 16px;
  padding-top: 82px;
  height: 656px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 151px;
  height: 27px;
  margin-bottom: 16px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 133.8%;
`;

const SubTitle = styled.div`
  color: #ccc;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 133.8%;
  margin-bottom: 10.99px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  div {
    display: flex;
    flex-direction: column;
    width: 97px;
    height: 20px;
    color: #000;
    font-family: Pretendard;
    font-size: 13px;
    font-weight: 400;
    line-height: 133.8%;
    margin-top: 16.01px;
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
    color: #d5d5d5;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 400;
    line-height: 133.8%;
  }

  button {
    margin-top: 30px;
    display: flex;
    width: 358px;
    height: 48px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: white;
    flex-shrink: 0;
    color: #ccc;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 133.8%; /* 21.408px */
    border: 1px solid #ccc;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div``;

const Footer = styled.footer`
  width: 390px;
  height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: var(--unnamed, gray);
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;
