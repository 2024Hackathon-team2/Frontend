import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setID] = useState();
  const [pw, setPW] = useState();

  const BASE_URL = " ";

  const goLogin = async () => {
    await axios({
      method: "POST",
      url: "/account/signin/",
      data: {
        username: email,
        password: pw,
      },
    })
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("userName", response.data.data.nickname);
        localStorage.setItem("token", response.data.data.access_token);

        const tokenFromLs = localStorage.getItem("token");
        console.log(tokenFromLs);
        const nicknameFromLs = localStorage.getItem("userName");
        console.log(nicknameFromLs);

        navigate("/mypage");
      })

      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };

  return (
    <Container>
      <Content>
        <Title>로고/ 서비스 이름</Title>
        <InputWrapper>
          <div>아이디</div>
          <input
            placeholder="이메일 주소를 입력해 주세요"
            onChange={(e) => setID(e.target.value)}
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
          <button onClick={() => navigate("/signup")}>비밀번호 찾기</button>
          <div className="division">|</div>
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </More>
      </Content>
      <Footer></Footer>
    </Container>
  );
};

export default LoginPage;

// Styled components
const Container = styled.div`
  width: 390px;

  margin: 0 auto;
  background-color: white;
`;

const Content = styled.div`
  padding: 16px;
  padding-top: 82px;
  height: 652px; // 최대 높이를 설정합니다.

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
    width: 358px;
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
  }

  input::placeholder {
    padding-left: 15px;
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
    background: #ccc;
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
    color: #d5d5d5;
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
  display: flex;
  width: 390px;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: var(--unnamed, gray);
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;
