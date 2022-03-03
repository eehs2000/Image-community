export const checkNickname = nickname => {
  if (nickname === "") {
    return { res: false, msg: "닉네임을 입력해주세요" };
  }
  // 닉네임 3자 이상, 알파벳 대소문자, 숫자 구성
  // else if (!nickname.length >= 3 || !/^[a-z,A-Z,0-9]{3,}$/.test(nickname)) {
  //   return { res: false, msg: '올바른 닉네임을 입력해주세요' };
  // }
  return { res: true };
};
