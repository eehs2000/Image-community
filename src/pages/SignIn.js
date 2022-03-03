import SignInForm from "../components/form/SignInForm";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//로그인 페이지
const SignIn = isLogin => {
  return (
    <>
      <h1>로그인</h1>
      <SignInForm />
    </>
  );
};

export default SignIn;
