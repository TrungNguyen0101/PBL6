'use client';
import React from 'react';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Field from '@/components/Field';
import ButtonForm from '@/components/ButtonForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../../../styles/Form.scss';
import { useSelector } from 'react-redux';
import { postSignUp } from '@/services/authService';

const schema = yup
  .object({
    verify: yup.string().required('Please enter verification code'),
  })
  .required();

const VerifyPage = () => {
  const dataSignUp = useSelector((state) => state.signup);
  console.log('check', dataSignUp);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleVerify = async (values) => {
    console.log(values);
    const res = await postSignUp(
      dataSignUp.username,
      dataSignUp.email,
      dataSignUp.password
    );
    if (res.status === 200 && values) {
    }
  };
  return (
    <div className="form-wrapper flex items-center justify-center px-[20px]">
      <form
        className="w-[500px] mx-auto bg-[#eee] rounded-lg p-8 bg-opacity-60"
        onSubmit={handleSubmit(handleVerify)}
      >
        <h1 className="mb-3 text-2xl font-bold text-center">
          Xác minh người dùng
        </h1>
        <p className="mb-1 text-sm">
          Để đảm bảo rằng gmail này tồn tại, chúng tôi sẽ sẽ gửi cho bạn một tin
          nhắn văn bản kèm mã xác minh gồm 6 chữ số
        </p>
        <Field>
          <div className="mb-2">
            <Label htmlFor="verify">Mã xác minh</Label>
          </div>
          <Input
            type="text"
            name="verify"
            control={control}
            id="verify"
            placeholder="Please enter verification code"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.verify && errors.verify.message}
          </p>
        </Field>
        <div className="mx-auto mt-4 w-max">
          <ButtonForm>Xác minh</ButtonForm>
        </div>
      </form>
    </div>
  );
};

export default VerifyPage;
