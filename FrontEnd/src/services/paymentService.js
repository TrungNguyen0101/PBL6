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

export { postPayment };
