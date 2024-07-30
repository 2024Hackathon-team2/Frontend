import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Images from "../images/Navbar/임시아이콘.png";
import HomeIcon from "../images/Navbar/홈.png";
import SocialIcon from "../images/Navbar/소셜챌린저.png";
import TestIcon from "../images/Navbar/테스트.png";
import TimerIcon from "../images/Navbar/타이머.png";
import MyIcon from "../images/Navbar/마이페이지.png";

const Navbar = () => {
  return (
    <Wrapper>
      <NavItem>
        <img src={HomeIcon} />
        <Text>홈</Text>
      </NavItem>
      <NavItem>
        <img src={SocialIcon} />
        <Text>소셜</Text>
      </NavItem>
      <NavItem>
        <img src={TestIcon} />
        <Text>테스트</Text>
      </NavItem>
      <NavItem>
        <img src={TimerIcon} />
        <Text>타이머</Text>
      </NavItem>
      <NavItem>
        <img src={MyIcon} />
        <Text>MY</Text>
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
  border-top: 1px;
  background-color: white;
  border-radius: 20px 20px 0 0;
  border-width: 1px 1px 0 1px;
  border-style: solid;
  border-color: #d9d9d9;
  color: #89919e;
  font-size: 9px;
  font-family: Pretendard-SemiBold;
`;
const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.div`
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
`;
const Text = styled.div`
  margin-top: 5px;
`;
