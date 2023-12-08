import instance from '../utils/axiosCustomize';

const postOrder = (data) => {
  return instance.post(`order/insert`, data);
};
const updateOrder = (data) => {
  return instance.put(`order/update`, data);
};
const getOrderById = (id) => {
  return instance.get(`order/${id}`);
};
const getOrderByAccount = (id) => {
  return instance.get(`order?id=${id}`);
};
const deleteOrder = (id) => {
  return instance.delete(`order/${id}`);
};
export { postOrder, getOrderByAccount, updateOrder, getOrderById, deleteOrder };
