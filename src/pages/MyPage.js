import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import basicImage from "./images/기본프로필이미지.png";
import Navbar from "../components/Navbar";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [nickname, setNickname] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [profileImage, setProfileImage] = useState(basicImage);

  // 사용자 정보 가져오기 함수
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://drinkit.pythonanywhere.com/accounts/mypage/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const userData = response.data;
      setNickname(userData.nickname || "User");
      setEmail(
        userData.email || localStorage.getItem("email") || "user@example.com"
      );
      setProfileImage(userData.image || basicImage);

      // 로컬 스토리지에 최신 정보 저장
      localStorage.setItem("nickname", userData.nickname || "User");
      localStorage.setItem(
        "email",
        userData.email || localStorage.getItem("email") || "user@example.com"
      );
      localStorage.setItem("image", userData.image || basicImage);
    } catch (error) {
      console.error(
        "사용자 정보 불러오기 오류:",
        error.response ? error.response.data : error.message
      );
      alert("로그인 후 이용 가능합니다.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const handleDelete = async () => {
    try {
      const response = await axios({
        method: "DELETE",
        url: "https://drinkit.pythonanywhere.com/accounts/delete/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.status === 204) {
        // 성공적으로 삭제된 경우
        setIsDeleted(true);
        localStorage.clear(); // 로컬 스토리지 데이터 삭제
        // 추가로 로그아웃 처리나 리다이렉션 등 필요한 작업 수행
      }
    } catch (error) {
      console.error(
        "계정 삭제 오류:",
        error.response ? error.response.data : error.message
      );
      alert("계정 삭제 중 오류가 발생했습니다.");
    }
    navigate("/");
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    // localStorage에서 토큰과 이메일 제거
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");

    alert("로그아웃 되었습니다.");
    console.log("로그아웃 완료");
    navigate("/"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>마이페이지</Header>
        <Content>
          <Profile>
            <img src={profileImage} alt="Profile" />
            <Name>{nickname}</Name>
            <Email>{email}</Email>
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
                strokeOpacity="0.3"
                strokeLinecap="round"
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
                strokeOpacity="0.3"
                strokeLinecap="round"
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
                strokeOpacity="0.3"
                strokeLinecap="round"
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
                strokeOpacity="0.3"
                strokeLinecap="round"
              />
            </svg>
            <button onClick={openLogoutModal}>로그아웃</button>
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
                strokeOpacity="0.3"
                strokeLinecap="round"
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
                  <strong>{nickname}</strong>({email})님의
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
      {isLogoutModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>로그아웃 하시겠어요?</p>
            <div>
              <button className="cancel" onClick={closeLogoutModal}>
                취소
              </button>
              <button className="delete" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

// Styled components...
// Container, Header, Content, Profile, Name, Email, PageButton, ModalOverlay, ModalContent, Footer 정의

export default MyPage;

// Styled components
const Container = styled.div`
  width: 100%;
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
  left: 0;

  width: 100%;
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
  height: 100%;
  width: 100%;
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
    border-radius: 100%;
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
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.5); /* Add a semi-transparent background */
  z-index: 20;
`;

const ModalContent = styled.div`
  background: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 390px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 9px 9px 0 0;
  background: var(--Color, #fff);
  z-index: 30;
  animation: ${slideUp} 0.3s ease-out;

  p {
    width: 200px;
    color: #7a7881;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    margin: 3px; /* 16px */ /* 16px */ /* Add spacing between paragraphs */
  }

  div {
    display: flex;
    justify-content: center;
    margin-top: 13px; /* Space above the buttons */
  }

  button {
    cursor: pointer;
    display: flex;
    width: 150px;
    height: 40px;
    padding: 12px 46px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 9px;
    border: 1px solid #7a7881;

    &:last-child {
      margin-right: 0;
    }
  }

  .cancel {
    background-color: white;
    color: black;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
    margin-right: 15px;
  }

  .delete,
  .close {
    background-color: black;
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
  left: 0;

  bottom: 0;
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;
