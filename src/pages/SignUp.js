import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUpForm from "../components/form/SignUpForm";

//회원가입 페이지
const SignUp = isLogin => {
  return (
    <>
      <h1>회원가입</h1>
      <SignUpForm />
    </>
  );
};

export default SignUp;
