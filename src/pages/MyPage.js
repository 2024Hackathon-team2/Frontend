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
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 390px;
  height: 54px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  box-shadow: 0px 4px 10px -12px black;
  z-index: 10;
`;

const Content = styled.div`
  padding: 20px;

  padding-bottom: 84px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto; /* Allow vertical scrolling */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */

  .dayBox {
    width: 350px;
    height: 83px;
    border-radius: 14px;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
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
  font-weight: 700;
`;

const Email = styled.div`
  margin-top: 8px;
  color: #ccc;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
`;

const PageButton = styled.div`
  margin-top: 59px;
  width: 350px;
  display: flex;
  flex-direction: column;

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 350px;
    height: 55px;
    background-color: white;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Cover the entire viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Add a semi-transparent background */
  z-index: 20;
`;

const ModalContent = styled.div`
  background: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 235px;
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
  z-index: 30;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    margin: 2px 0; /* Add spacing between paragraphs */
  }

  div {
    display: flex;
    justify-content: center;
    margin-top: 13px; /* Space above the buttons */
  }

  button {
    cursor: pointer;
    width: 90px;
    height: 25px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin-right: 4px;

    &:last-child {
      margin-right: 0;
    }
  }

  .cancel {
    background-color: white;
    color: #d9d9d9;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
  }

  .delete,
  .close {
    background-color: #17d6b5;
    color: white;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
  }

  .close {
    width: 177px;
    margin-top: 8px;
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
