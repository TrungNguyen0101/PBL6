import instance from '../utils/axiosCustomize';

const postPayment = (amount, phone, address, bankCode, language) => {
  return instance.post('payment/create_payment_url', {
    amount,
    phone,
    address,
    bankCode,
    language,
  });
};

export { postPayment };
