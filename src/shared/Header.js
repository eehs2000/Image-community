import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/modules/user";

const Navbar = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToMain = () => {
    navigate("/", { replace: true });
  };

  const goToLogin = () => {
    navigate("/signin", { replace: true });
  };

  const goToRegister = () => {
    navigate("/signup", { replace: true });
  };

  const _logout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  if (isLogin) {
    return (
      <Header>
        <LogoBox onClick={goToMain}>
          <LogoImg
            src="https://i0.wp.com/davidmeessen.com/wp-content/uploads/2020/09/ew-instagram-logo-transparent-related-keywords-logo-instagram-vector-2017-115629178687gobkrzwak.png?ssl=1"
            alt="logo"
          />
          <Title>Hanstagram</Title>
        </LogoBox>
        <div className="buttons">
          <Button onClick={_logout}>로그아웃</Button>
        </div>
      </Header>
    );
  }

  return (
    <Header>
      <LogoBox onClick={goToMain}>
        <LogoImg
          src="https://i0.wp.com/davidmeessen.com/wp-content/uploads/2020/09/ew-instagram-logo-transparent-related-keywords-logo-instagram-vector-2017-115629178687gobkrzwak.png?ssl=1"
          alt="logo"
        />
        <Title>Hanstagram</Title>
      </LogoBox>
      <div className="buttons">
        <Button onClick={goToLogin}>로그인</Button>
        <Button onClick={goToRegister}>회원가입</Button>
      </div>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: lightgrey;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImg = styled.img`
  padding: 1em;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin-right: 0.3em;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: "Redressed", cursive;
`;

const Button = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: white;
  border-radius: 4px;
  padding: 8px 10px;
  margin-right: 15px;
  font-size: 10px;
  font-weight: 600;
  color: #2d3748;
  border: 1px solid #cbd5e0;
  line-height: 20px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default Navbar;
