import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "../images/Navbar/홈.png";
import SocialIcon from "../images/Navbar/소셜.png";
import TestIcon from "../images/Navbar/테스트.png";
import TimerIcon from "../images/Navbar/타이머.png";
import MyIcon from "../images/Navbar/마이.png";
import HomeIcon2 from "../images/Navbar/홈2.png";
import SocialIcon2 from "../images/Navbar/소셜2.png";
import TestIcon2 from "../images/Navbar/테스트2.png";
import TimerIcon2 from "../images/Navbar/타이머2.png";
import MyIcon2 from "../images/Navbar/마이2.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    navigate("/home");
  };
  const goToSocial = () => {
    navigate("/social");
  };
  const goToTest = () => {
    navigate("/testrecord");
  };
  const goToTimer = () => {
    navigate("/timer");
  };
  const goToMypage = () => {
    navigate("/mypage");
  };

  const getIcon = (defaultIcon, selectedIcon, ...paths) => {
    const currentPath = location.pathname;
    return paths.includes(currentPath) ? selectedIcon : defaultIcon;
  };

  return (
    <Wrapper>
      <NavItem onClick={goToHome}>
        <img src={getIcon(HomeIcon, HomeIcon2, "/home")} alt="홈" />
      </NavItem>
      <NavItem onClick={goToSocial}>
        <img src={getIcon(SocialIcon, SocialIcon2, "/social")} alt="소셜" />
      </NavItem>
      <NavItem onClick={goToTest}>
        <img
          src={getIcon(
            TestIcon,
            TestIcon2,
            "/test",
            "/testrecord",
            "/testcomplete"
          )}
          alt="테스트"
        />
      </NavItem>
      <NavItem onClick={goToTimer}>
        <img src={getIcon(TimerIcon, TimerIcon2, "/timer")} alt="타이머" />
      </NavItem>
      <NavItem onClick={goToMypage}>
        <img src={getIcon(MyIcon, MyIcon2, "/mypage")} alt="MY" />
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
  border-top: 0.5px solid #d9d9d9;
  box-shadow: 0px 4px 25.3px 10px rgba(0, 0, 0, 0.02);
  background-color: white;

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
  }
`;

const Text = styled.div`
  margin-top: 5px;
`;
