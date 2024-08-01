import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import basicImage from "./images/기본프로필이미지.png";
import divImage from "./images/구분선.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const ProfileSettingPage = () => {
  const [isPwMatch, setIsPwMatch] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [imagePreview, setImagePreview] = useState(basicImage);
  const navigate = useNavigate();

  const goToBack = () => {
    navigate("/mypage");
  };

  const handleSave = async () => {
    navigate("/mypage");

    if (newPassword !== confirmPassword) {
      setIsPwMatch(false);
      return;
    }

    setIsPwMatch(true);

    try {
      const response = await fetch("/accounts/mypage/", {
        method: "PATCH",
        headers: {
          Authorization: "Token your_access_token",
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          nickname: nickname,
          image: null,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        // 성공 처리
      } else {
        // 실패 처리
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsPwMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(basicImage);
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
            <ImagePreview
              className="profileimg"
              src={imagePreview}
              alt="Profile"
            />
            <div>
              <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                이미지 선택
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <img className="divimg" src={divImage} />
              <button onClick={handleImageRemove}>이미지 삭제</button>
            </div>
          </ProfileImage>
          <SetName>
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
            <p>이름</p>
            <div>
              <input
                placeholder="이름을 입력해 주세요."
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
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
          </SetName>
          <SetPassword>
            <div>비밀번호 변경</div>
            <div className="sub">변경 후 ‘저장하기’ 버튼을 눌러주세요.</div>
            <input
              type="password"
              placeholder="새 비밀번호를 입력해 주세요."
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div>비밀번호 확인</div>
            <input
              type="password"
              placeholder="새 비밀번호를 다시 입력해 주세요."
              style={{ borderColor: isPwMatch ? "#ccc" : "red" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isPwMatch && (
              <ErrorMessage>
                비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.
              </ErrorMessage>
            )}
          </SetPassword>
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </Content>
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
    </>
  );
};

export default ProfileSettingPage;

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
  height: 652px;
  overflow-y: auto;
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

  button,
  label {
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
    line-height: 100%;
    margin: 0px;
    margin-top: 22px;
    cursor: pointer;
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

const ImagePreview = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 100%;
`;

const SetName = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45px;

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
    line-height: 100%;
  }

  input {
    padding: 0px;
    width: 320px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #ccc;
    color: black;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 400;
    line-height: 133.8%;
    padding-left: 15px;
    margin-right: 10px;
    border: none;
  }
  input::placeholder {
    display: flex;
    width: 320px;
    height: 30px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    color: #d5d5d5;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 8px;
  }

  button {
    display: flex;
    width: 70px;
    height: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    border: none;
    cursor: pointer;
  }

  svg {
    width: 350px;
  }
`;

const SetPassword = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    margin-top: 15px;
  }

  .sub {
    margin-top: 4px;
    margin-bottom: 4px;

    color: #ccc;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
  }

  input {
    margin-top: 4px;
    padding: 0px;
    width: 330px;
    height: 40px;
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
    line-height: 133.8%;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0%;
  display: flex;
  width: 390px;
  height: 84px;
  flex-direction: column;
  align-items: center;
  gap: 19.6px;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
`;

const SaveButton = styled.button`
  display: flex;
  width: 117px;
  height: 35px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  border-radius: 50px;
  background-color: #17d6b5;
  border: none;
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  margin-top: 56px;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 155px;
  display: flex;
  width: 317px;
  height: 11px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 133.8%; /* 14.718px */
`;
