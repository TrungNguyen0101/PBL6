import instance from '../utils/axiosCustomize';

const postPayment = (amount, phone, address, bankCode, language, cart) => {
  return instance.post('payment/create_payment_url', {
    amount,
    phone,
    address,
    bankCode,
    language,
    cart,
  });
};
const postPaymentDirect = (name, address, phone, totalmoney, cart) => {
  return instance.post('payment/payment_direct', {
    name,
    address,
    phone,
    totalmoney,
    cart,
  });
};
const getCustomerHistory = () => {
  return instance.get('payment/payment_history');
};
const getAllPayment = () => {
  return instance.get('payment/getAllPayment');
};
const getAllPaymentByStatus = () => {
  return instance.get('payment/payment_history_succeed');
};
const updatePayment = (data) => {
  return instance.post('payment/update_state', data);
};

const successPayment = (data) => {
  return instance.get(`/payment/payment_online?${data}`);
};

const getDeleteDetailOrder = (id) => {
  return instance.get(`/payment/${id}`);
};
export {
  postPayment,
  getAllPayment,
  updatePayment,
  postPaymentDirect,
  getCustomerHistory,
  getAllPaymentByStatus,
  successPayment,
  getDeleteDetailOrder,
};
