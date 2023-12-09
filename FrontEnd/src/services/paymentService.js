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
const getAllPayment = () => {
  return instance.get('payment/getAllPayment');
};
const updatePayment = (data) => {
  return instance.post('payment/update_state', data);
};

export { postPayment, getAllPayment, updatePayment };
