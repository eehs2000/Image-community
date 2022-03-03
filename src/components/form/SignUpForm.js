import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../functions/checkEmail";
import { checkPW } from "../functions/checkPW";
import { checkNickname } from "../functions/checkNickname";
import styled from "styled-components";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import { registDB } from "../../redux/modules/user";

const SignUpForm = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //ref
  const emailRef = useRef();
  const nicknameRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();

  //회원가입하기
  const register = e => {
    e.preventDefault();

    const account_email = emailRef.current.value;
    const account_name = nicknameRef.current.value;
    const password = pwRef.current.value;
    const password_check = pwCheckRef.current.value;

    if (!checkEmail(account_email).res) {
      emailRef.current.focus();
      alert(checkEmail(account_email).msg);
      return;
    }

    if (!checkNickname(account_name).res) {
      nicknameRef.current.focus();
      alert(checkNickname(account_name).msg);
      return;
    }

    if (!checkPW(password, password_check, account_name).res) {
      if (checkPW(password, password_check, account_name).focus === "pwRef") {
        pwRef.current.focus();
      } else if (
        checkPW(password, password_check, account_name).focus === "pwCheckRef"
      ) {
        pwCheckRef.current.focus();
      }
      alert(checkPW(password, password_check, account_name).msg);
      return;
    }
    //회원정보
    const registData = {
      account_email,
      account_name,
      password,
      password_check,
    };
    dispatch(registDB(registData));
    navigate("/signin", { replace: true });
  };
  return (
    <>
      <Form onSubmit={register}>
        <Box>
          <Label htmlFor="이메일">이메일</Label>
          <Input ref={emailRef} type="text" placeholder="이메일을 입력하세요" />
        </Box>
        <Box>
          <Label htmlFor="닉네임">
            닉네임
            <LabelDesc>
              알파벳 대소문자, 숫자로 이루어진 최소 3자 이상으로 입력해주세요
            </LabelDesc>
          </Label>
          <Input
            ref={nicknameRef}
            type="text"
            placeholder="닉네임을 입력하세요"
          />
        </Box>
        <Box>
          <Label htmlFor="비밀번호">
            비밀번호
            <LabelDesc>
              닉네임과 연관되지 않게 최소 4자 이상으로 입력해주세요
            </LabelDesc>
          </Label>
          <Input
            ref={pwRef}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </Box>
        <Box>
          <Label htmlFor="비밀번호 확인">비밀번호 확인</Label>
          <Input
            ref={pwCheckRef}
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </Box>
        <Info>* 이메일, 닉네임은 필수기입사항입니다.</Info>
        <Button name={"회원가입하기"} />
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const LabelDesc = styled.span`
  margin-left: 1em;
  font-size: 0.5rem;
  font-weight: 300;
  color: blue;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.3em 0.1em;
`;

const Info = styled.p`
  font-size: 0.5rem;
  color: blue;
`;

export default SignUpForm;
