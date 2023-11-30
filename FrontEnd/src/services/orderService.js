import instance from '../utils/axiosCustomize';

const postOrder = (data) => {
  return instance.post(`order/insert`, data);
};
const getOrderByAccount = (id) => {
  return instance.get(`order?id=${id}`);
};
export { postOrder, getOrderByAccount };
