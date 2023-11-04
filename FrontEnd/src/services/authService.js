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
export { postSignIn, postSignUp };
