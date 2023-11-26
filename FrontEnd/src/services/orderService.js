import instance from '../utils/axiosCustomize';

const postOrder = (data) => {
  return instance.post(`order/insert`, data);
};
export { postOrder };
