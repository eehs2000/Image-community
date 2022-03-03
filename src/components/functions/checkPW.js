export const checkPW = (pw, pwCheck, nickname) => {
  const regexNickname = new RegExp(nickname);
  if (pw === "") {
    return { res: false, msg: "비밀번호를 입력해주세요", focus: "pwRef" };
  } else if (pwCheck === "") {
    return { res: false, msg: "비밀번호를 입력해주세요", focus: "pwCheckRef" };
  } else if (!pw === pwCheck) {
    return {
      res: false,
      msg: "비밀번호를 올바르게 입력했는지 확인해주세요",
      focus: "pwRef",
    };
  }
  return {
    res: true,
  };
};
