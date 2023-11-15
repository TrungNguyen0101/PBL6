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

const changePassword = (oldpassword, newpassword) => {
  return instance.post("user/change-password", {
    oldpassword,
    newpassword
  })
}

export { postSignIn, postSignUp, updateInforUser, changePassword };
