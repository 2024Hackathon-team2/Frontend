import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import basicImage from "./images/기본프로필이미지.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const RecordDonePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // 삭제 상태를 관리하는 변수

  const goToProfileSetting = () => {
    navigate("/profilesetting");
  };

  const goToFriend = () => {
    navigate("/friend");
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIsDeleted(false); // 모달을 닫을 때 삭제 상태 초기화
  };

  const handleDelete = () => {
    setIsDeleted(true);
  };

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
            <button onClick={openDeleteModal}>탈퇴하기</button>
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
        <Footer>
          <Navbar></Navbar>
        </Footer>
      </Container>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            {isDeleted ? (
              <>
                <p>
                  <strong>abcdef</strong>(abcdef@naver.com)님의
                </p>
                <p>계정이 삭제되었습니다.</p>
                <button className="close" onClick={closeDeleteModal}>
                  닫기
                </button>
              </>
            ) : (
              <>
                <p>지금까지의 음주 기록, 목표 등</p>
                <p>사용자의 정보가 삭제됩니다.</p>
                <p>삭제하시겠습니까?</p>

                <div>
                  <button className="cancel" onClick={closeDeleteModal}>
                    취소
                  </button>
                  <button className="delete" onClick={handleDelete}>
                    삭제
                  </button>
                </div>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: var(--Color, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 235px; // 모달의 너비 설정
  height: 129px; // 모달의 높이 설정
  flex-shrink: 0; // 모달이 축소되지 않도록 설정

  p {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 12px */
    margin: 2px 0; // 텍스트 사이 여백 추가
  }

  div {
    display: flex;
    justify-content: center;

    margin-top: 13px; // 버튼과 텍스트 사이 여백 추가
  }

  button {
    cursor: pointer;
    display: flex;
    width: 90px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: 1px solid #d9d9d9;
    border-radius: 5px; // 버튼 모서리 둥글게
    margin-right: 4px;
  }

  .cancel {
    background-color: white;
    color: #d9d9d9;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 12px */
  }

  .delete {
    background-color: #d9d9d9; // 필요시 다른 색상으로 변경 가능
    color: var(--Color, #fff);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 12px */
  }

  .close {
    display: flex;
    width: 177px;
    height: 25px;
    flex-shrink: 0;
    background-color: #d9d9d9;
    color: var(--Color, #fff);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 12px */
    margin-top: 8px;
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
