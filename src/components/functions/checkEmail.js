export const checkEmail = email => {
  if (email === "") {
    return { res: false, msg: "이메일을 입력해주세요" };
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return { res: false, msg: "올바른 이메일을 입력해주세요" };
  }
  return { res: true };
};
