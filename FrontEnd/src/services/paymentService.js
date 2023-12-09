import instance from '../utils/axiosCustomize';

const postPayment = (totalMoney, phone, address, bankCode, language, cart) => {
  return instance.post('payment/create_payment_url', {
    totalMoney,
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

export { postPayment, getAllPayment };
