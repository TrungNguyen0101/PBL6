import instance from '../utils/axiosCustomize';

const postSignIn = (email, password) => {
  return instance.post('user/login', {
    email,
    password,
  });
};

const postSignUp = (username, email, password) => {
  return instance.post('user/register', {
    username,
    email,
    password,
  });
};

const updateInforUser = (username, phoneNumber) => {
  return instance.put('user/update', {
    username,
    phoneNumber,
  });
};

const forgotPassword = (email) => {
  return instance.post('user/forgot-password', {
    email,
  });
};

const sendCodeVerify = () => {
  return instance.post('user/sendcode-verify');
};

const verifyCode = (code) => {
  return instance.post('user/verify', {
    code,
  });
};

export {
  postSignIn,
  postSignUp,
  updateInforUser,
  forgotPassword,
  sendCodeVerify,
  verifyCode,
};
