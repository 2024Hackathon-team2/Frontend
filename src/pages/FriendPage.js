import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import backButtonImage from "./images/back.png";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;
const BASE_URL = "https://drinkit.pythonanywhere.com/";

const FriendPage = () => {
  const navigate = useNavigate();
  const [friendEmail, setFriendEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showDeletedPopup, setShowDeletedPopup] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${BASE_URL}accounts/friends/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setFriends(result.friends_list);
        localStorage.setItem("friends", JSON.stringify(result.friends_list));
      } else {
        setErrorMessage("친구 목록을 가져오는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setErrorMessage("친구 목록을 가져오는 중 오류가 발생했습니다.");
    }
  };

  const goToBack = () => {
    navigate("/mypage");
  };

  const handleInputChange = (e) => {
    setFriendEmail(e.target.value);
  };

  const handleAddFriend = async () => {
    if (friendEmail) {
      try {
        const response = await fetch(`${BASE_URL}accounts/add-friend/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ email: friendEmail }),
        });
        const result = await response.json();

        if (response.ok) {
          await fetchFriends(); // 친구 목록을 다시 가져옵니다.
          setFriendEmail(""); // 입력 필드 초기화
          setErrorMessage(""); // 오류 메시지 초기화
          setShowInput(false); // 입력 필드 숨김
        } else {
          setErrorMessage(result.detail || "친구 추가 중 오류가 발생했습니다.");
        }
      } catch (error) {
        setErrorMessage("친구 추가 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeleteFriend = (friend) => {
    setFriendToDelete(friend);
    setShowConfirmPopup(true);
  };

  const confirmDeleteFriend = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}accounts/delete-friend/${friendToDelete.friend_pk}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        const updatedFriends = friends.filter(
          (friend) => friend.email !== friendToDelete.email
        );
        setFriends(updatedFriends);
        localStorage.setItem("friends", JSON.stringify(updatedFriends)); // 로컬 스토리지에 저장
        setShowConfirmPopup(false);
        setShowDeletedPopup(true);
      } else {
        setErrorMessage(result.detail || "친구 삭제 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setErrorMessage("친구 삭제 중 오류가 발생했습니다.");
    }
  };

  const closeDeletedPopup = () => {
    setShowDeletedPopup(false);
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddFriend();
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton onClick={goToBack}>
            <img src={backButtonImage} alt="Back" />
          </BackButton>
          친구 관리
          <div></div>
        </Header>
        <Content>
          <div className="box">
            <AddFriendBox>
              <div>친구 목록</div>
              {showInput ? (
                <input
                  value={friendEmail}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="친구의 이메일을 입력하세요."
                ></input>
              ) : (
                <button onClick={handleShowInput}>친구 추가</button>
              )}
              {showInput && <button onClick={handleAddFriend}>추가</button>}
            </AddFriendBox>
            {errorMessage && <Error>{errorMessage}</Error>}
            {friends.map((friend) => (
              <FriendBox key={friend.friend_pk}>
                <div className="name">{friend.nickname}</div>
                <div className="email">{friend.email}</div>
                <DeleteButton onClick={() => handleDeleteFriend(friend)}>
                  삭제
                </DeleteButton>
              </FriendBox>
            ))}
          </div>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Container>

      {showConfirmPopup && (
        <PopupOverlay>
          <PopupContent>
            <p>
              나에게 친구의 목표가 보이지 않고
              <br />
              친구에게 내 목표가 보이지 않게 됩니다.
              <br />
              <br />
              삭제하시겠습니까?
            </p>
            <PopupButtons>
              <button
                className="cancel"
                onClick={() => setShowConfirmPopup(false)}
              >
                취소
              </button>
              <button className="delete" onClick={confirmDeleteFriend}>
                삭제
              </button>
            </PopupButtons>
          </PopupContent>
        </PopupOverlay>
      )}

      {showDeletedPopup && (
        <PopupOverlay>
          <PopupContent>
            <div className="">
              {friendToDelete.nickname}({friendToDelete.email})님이 <br />
              친구 목록에서 삭제되었습니다.
            </div>
            <button className="close" onClick={closeDeletedPopup}>
              닫기
            </button>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};

export default FriendPage;

// Styled components
const Container = styled.div`
  width: 100%;
  max-width: 390px;

  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 390px;

  height: 54px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  box-shadow: 0px 4px 10px -12px black;
  z-index: 10;

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
  background-color: white;

  img {
    width: 25px;
    height: 25px;
  }
`;

const Content = styled.div`
  margin-top: 74px; /* Space for the fixed header */
  margin-bottom: 104px; /* Space for the fixed footer */
  flex: 1;
  overflow-y: auto; /* Allow vertical scrolling */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .box {
    width: 350px;
  }

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit browsers */
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
`;

const AddFriendBox = styled.div`
  width: 340px;
  justify-content: space-between;
  display: flex;
  align-items: center;

  height: 50px;
  margin-bottom: 20px;

  div {
    font-size: 20px;
    font-weight: bold;
    margin-right: 5px;
  }

  input {
    width: 168px;
    height: 28px;
    border-radius: 8px;
    border-color: #cccccc;
    color: #000;
    border-style: solid;
    font-size: 12px;
    padding-left: 10px;
  }

  button {
    display: flex;
    width: 70px;
    height: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #7a7881;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    background-color: white;
    border-radius: 5px;
  }
`;

const FriendBox = styled.div`
  padding: 20px;
  margin-top: 10px;
  padding: 10px;
  max-width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 5fr 18fr 5fr;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;

  .email {
    color: #cccccc;
    font-size: 12px;
  }
`;

const DeleteButton = styled.button`
  padding: 5px;
  background-color: #d9d9d9;
  color: white;
  border: none;
  cursor: pointer;
  width: 70px;
  height: 30px;
  font-weight: bold;
  background: #66646f;
  border-radius: 5px;
  align-items: center;
`;

const Error = styled.div`
  margin-top: 2px;
  color: red;
  font-size: 10px;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;

  height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const PopupContent = styled.div`
  background-color: white;
  border-radius: 10px;
  text-align: center;
  width: 235px;
  height: 129px;
  font-size: 12px;
  font-family: Pretendard;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .close {
    width: 177px;
    height: 25px;
    margin-top: 10px;
    border-radius: 5px;
    border-color: #d9d9d9;
    border-style: solid;
    color: white;
    background-color: #d9d9d9;
    cursor: pointer;
  }
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: center;
  font-family: Pretendard;

  .cancel {
    background-color: white;
    color: #d9d9d9;
  }

  .delete {
    color: white;
    background-color: #d9d9d9;
  }

  .cancel,
  .delete {
    cursor: pointer;
    width: 90px;
    height: 25px;
    line-height: 13px;
    margin: 5px;
    border-radius: 5px;
    border-color: #d9d9d9;
    border-style: solid;
  }
`;
