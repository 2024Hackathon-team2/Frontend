import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "../images/Navbar/홈.png";
import SocialIcon from "../images/Navbar/소셜.png";
import TestIcon from "../images/Navbar/테스트.png";
import TimerIcon from "../images/Navbar/타이머.png";
import MyIcon from "../images/Navbar/마이.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    navigate("/");
  };
  const goToSocial = () => {
    navigate("/social");
  };
  const goToTest = () => {
    navigate("/test");
  };
  const goToTimer = () => {
    navigate("/timer");
  };
  const goToMypage = () => {
    navigate("/mypage");
  };

  const getColor = (path) => {
    return location.pathname === path ? "#4F82F7" : "#89919e";
  };

  return (
    <Wrapper>
      <NavItem onClick={goToHome} color={getColor("/")}>
        <img src={HomeIcon} alt="홈" />
      </NavItem>
      <NavItem onClick={goToSocial} color={getColor("/social")}>
        <img src={SocialIcon} alt="소셜" />
      </NavItem>
      <NavItem onClick={goToTest} color={getColor("/test")}>
        <img src={TestIcon} alt="테스트" />
      </NavItem>
      <NavItem onClick={goToTimer} color={getColor("/timer")}>
        <img src={TimerIcon} alt="타이머" />
      </NavItem>
      <NavItem onClick={goToMypage} color={getColor("/mypage")}>
        <img src={MyIcon} alt="MY" />
      </NavItem>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 390px;
  height: 84px;
  border-top: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 20px 20px 0 0;
  color: #89919e;
  font-size: 9px;
  font-family: Pretendard-SemiBold;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.color};

  img {
    width: 24px;
    filter: ${(props) =>
      props.color === "#4F82F7"
        ? "invert(35%) sepia(98%) saturate(7492%) hue-rotate(200deg) brightness(100%) contrast(101%)"
        : "none"};
  }
`;

const Text = styled.div`
  margin-top: 5px;
`;
