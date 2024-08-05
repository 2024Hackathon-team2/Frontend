import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import CheerImage from "../images/SocialPage/소셜응원수아이콘.png";
import BeerImage from "../images/SocialPage/맥주.png";
import SojuImage from "../images/SocialPage/소주.png";
import MakgeolliImage from "../images/SocialPage/막걸리.png";
import WineImage from "../images/SocialPage/와인.png";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/Progressbar_Goal";
import FriendList, { getFriendList } from "../components/FriendList";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: whitesmoke;
  }
`;

const BASE_URL = "https://drinkit.pythonanywhere.com/";

const SocialPage = ({ userId, nickname }) => {
  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}goals/social/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getFriendList(userId);
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
    };

    fetchFriends();
  }, [userId]);

  const handleCheerUpdate = (newCheerCount) => {
    setUserData((prevData) => ({
      ...prevData,
      cheer: newCheerCount,
    }));
  };

  const { user, cheer, soju, beer, mak, wine, period } = userData;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>소셜</Header>
        <Content>
          <div className="box">
            <Goal>
              <div className="goalTitle">
                <div className="userName">{user}님</div>
                <div className="goalAchieveMonth">
                  {period}개월째 목표를 달성하고 있어요
                </div>
              </div>

              <div className="CheerNumber">
                <img src={CheerImage} alt="Cheer Icon" />
                <div>이번 달 받은 응원 수: {cheer}</div>
              </div>

              <DrinkingGoals>
                <DrinkItem
                  image={BeerImage}
                  name="맥주"
                  goal={beer?.goal}
                  record={beer?.record}
                  percentage={beer?.percentage}
                />
                <DrinkItem
                  image={SojuImage}
                  name="소주"
                  goal={soju?.goal}
                  record={soju?.record}
                  percentage={soju?.percentage}
                />
                <DrinkItem
                  image={MakgeolliImage}
                  name="막걸리"
                  goal={mak?.goal}
                  record={mak?.record}
                  percentage={mak?.percentage}
                />
                <DrinkItem
                  image={WineImage}
                  name="와인"
                  goal={wine?.goal}
                  record={wine?.record}
                  percentage={wine?.percentage}
                />
              </DrinkingGoals>

              <div
                className="GoalSpecificButton"
                onClick={() => navigate("/home")}
              >
                <div>기록 자세히 보기</div>
              </div>
            </Goal>
            <Friends>
              <div className="friendTitle">친구의 달성률</div>
              <FriendList friends={friends} onCheerUpdate={handleCheerUpdate} />
            </Friends>
          </div>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Container>
    </>
  );
};

const DrinkItem = ({ image, name, goal, record, percentage }) => (
  <div className="Drinks">
    <div className="img">
      <img src={image} alt={name} />
    </div>
    <div className="drinksName">{name}</div>
    <div>
      <ProgressBar percentage={percentage * 100} />
    </div>
    <div className="cups">
      <div>{record}</div>/{goal}잔
    </div>
  </div>
);

export default SocialPage;

// Styled components
const Container = styled.div`
  width: 100%;
  max-width: 390px;

  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const Content = styled.div`
  flex: 1;
  padding-top: 54px; /* Space for the fixed header */
  padding-bottom: 84px; /* Space for the fixed footer */
  overflow-y: auto; /* Allow vertical scrolling */
  overflow-x: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit browsers */
  }

  .box {
    width: 350px;
    justify-content: center;
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
`;

const Goal = styled.div`
  width: 100%;
  .goalTitle {
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: Pretendard;
  }

  .userName {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .CheerNumber {
    display: flex;
    font-size: 12px;
    font-family: Pretendard;
    justify-content: end;
    margin-bottom: 5px;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }
  }
  .GoalSpecificButton {
    display: flex;
    justify-content: center;
    cursor: pointer;
    div {
      width: 164px;
      height: 35px;
      background-color: #17d6b5;
      text-align: center;
      line-height: 35px;
      border-radius: 10px;
      color: white;
      box-shadow: rgba(99, 99, 99, 0.45) 0px 4px 4px 0px;
    }
  }
`;

const DrinkingGoals = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .Drinks {
    width: 95%;
    display: grid;
    grid-template-columns: 50px 50px 220px;
    align-items: center;
    margin-bottom: 15px;
  }
  .drinksName {
    font-size: 13px;
    font-family: Pretendard;
    font-weight: medium;
  }
  .img {
    grid-row: 1/3;
    img {
      width: 33px;
      height: 33.383px;
    }
  }
  .cups {
    grid-column: 3/4;
    font-family: Pretendard-Medium;
    font-size: 10px;
    justify-self: end;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ccc;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 133.8%;
    margin-top: 5px;

    div {
      color: #000;
      font-family: Pretendard;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 133.8%; /* 17.394px */
    }
  }
`;

const Friends = styled.div`
  width: 100%;
  .friendTitle {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;

  height: 84px;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 8.4px 0px rgba(0, 0, 0, 0.02);
  z-index: 10;
`;
