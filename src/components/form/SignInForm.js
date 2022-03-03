import styled from "styled-components";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { checkEmail } from "../functions/checkEmail";
import { useDispatch } from "react-redux";
import { loginDB } from "../../redux/modules/user";

const SignInForm = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //ref
  const emailRef = useRef();
  const pwRef = useRef();

  //login정보 서버에 보내서 결과받기
  const onLogin = e => {
    e.preventDefault();

    const account_email = emailRef.current.value;
    const password = pwRef.current.value;

    if (!checkEmail(account_email).res) {
      emailRef.current.focus();
      alert(checkEmail(account_email).msg);
      return;
    }

    if (password === "") {
      pwRef.current.focus();
      alert("비밀번호를 입력해주세요");
    }

    const loginData = {
      email: account_email,
      password: password,
    };
    dispatch(loginDB(loginData));
    navigate("/", { replace: true });
  };

  return (
    <>
      <Form onSubmit={onLogin}>
        <Box>
          <Label htmlFor="이메일">이메일</Label>
          <InputBox
            ref={emailRef}
            placeholder="이메일을 입력하세요"
            type="text"
          />
        </Box>
        <Box>
          <Label htmlFor="비밀번호">비밀번호</Label>
          <InputBox
            ref={pwRef}
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
        </Box>
        <Box>
          <Button name={"로그인하기"} />
        </Box>
      </Form>
    </>
  );
};
const Form = styled.form`
display:flex
flex-direction:column`;

const InputBox = styled.input`
  font-size: 1rem;
  padding: 0.15em 0.1em;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
`;

const Label = styled.label`
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 0.2em;
`;

export default SignInForm;
