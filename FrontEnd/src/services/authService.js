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

const updateInforUser = (username, phoneNumber, avatar) => {
  return instance.put('user/update', {
    username,
    phoneNumber,
    avatar,
  });
};

const forgotPassword = (email) => {
  return instance.post('user/forgot-password', {
    email,
  });
};

const getAllAccount = () => {
  return instance.get('user/getallaccount');
};
const sendCodeVerify = () => {
  return instance.post('user/sendcode-verify');
};

const verifyCode = (code) => {
  return instance.post('user/verify', {
    code,
  });
};

const changePassword = (oldpassword, newpassword) => {
  return instance.post('user/change-password', {
    oldpassword,
    newpassword,
  });
};

export {
  postSignIn,
  postSignUp,
  updateInforUser,
  forgotPassword,
  sendCodeVerify,
  verifyCode,
  changePassword,
  getAllAccount,
};
