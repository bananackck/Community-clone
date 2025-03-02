const emailPattern = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

export const validEmail = email =>
  emailPattern.test(email);

export const strongPassword = password =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(password);

export const validLength = password =>
  password.length >= 8 && password.length <= 20;

export const pwValidator = (el, helper) => {
  if (!validLength(el)) {
    helper.innerHTML = '*비밀번호는 8자 이상, 20자 이하이어야 합니다.';
    return false;
  } else if (!strongPassword(el)) {
    helper.innerHTML = '*대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
    return false;
  }
  return true;
};


// 이메일 유효성 검사
export const handleEmailInput = (email, elEmailHelper) => {
  if (email) {
    if (!validEmail(email)) {
      elEmailHelper.innerHTML =
        '*올바른 이메일 주소 형식을 입력해주세요.<br>(예: example@example.com)';
      return false;
    } else {
      // if(overlappingEmail()){
      //     elEmailHelper.innerHTML='*중복된 이메일입니다.'
      // }
      // else{return true}
      elEmailHelper.innerHTML = '';
      return true;
    }
  } else {
    elEmailHelper.innerHTML = '*이메일을 입력해주세요.';
    return false;
  }
};

// 비밀번호 유효성 검사
export const handlePwInput = (pw, elPwHelper) => {
  if (pw) {
    if (pwValidator(pw, elPwHelper)) {
      elPwHelper.innerHTML = '';
      return true;
    }
    return false;
  } else {
    elPwHelper.innerHTML = '*비밀번호를 입력해주세요.';
    return false;
  }
};

// 비밀번호 확인 유효성 검사
export const handlePw2Input = (pw, pw2, elPw2Helper) => {
  if (pw2) {
    if (pwValidator(pw2, elPw2Helper)) {
      if (pw != pw2) {
        elPw2Helper.innerHTML = '*비밀번호가 다릅니다.';
        return false;
      } else {
        elPw2Helper.innerHTML = '';
        return true;
      }
    }
    return false;
  } else {
    elPw2Helper.innerHTML = '*비밀번호를 한 번 더 입력해주세요.';
    return false;
  }
};

// 닉네임 유효성 검사
export const handleNicknameInput = (nickname, elNicknameHelper) => {
  if (nickname) {
    if (nickname.includes(' ')) {
      elNicknameHelper.innerHTML = '*띄어쓰기를 없애주세요.';
      return false;
    } else if (nickname.length >= 11) {
      elNicknameHelper.innerHTML = '*닉네임은 최대 10자까지 작성 가능합니다.';
      return false;
    } 
    // else if(overlappingNickname()){
    //     elNicknameHelper.innerHTML='*중복된 닉네임입니다.'
    // }
    else {
      elNicknameHelper.innerHTML = '';
      return true;
    }
  } else {
    elNicknameHelper.innerHTML = '*닉네임을 입력해주세요.';
    return false;
  }
};


//------------------------------------
// 프로필 업로드
export const uploadProfile = (profile) =>{
    const selected=profile.files[0];

    const reader = new FileReader();
    
    reader.onload=function(){
        const img=document.getElementById('img')
        img.src=reader.result

        img.style.width='149px'
        return true;
    }
    reader.readAsDataURL(selected)
    return false;
}