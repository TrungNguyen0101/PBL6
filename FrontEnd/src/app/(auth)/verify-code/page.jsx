'use client';
import React from 'react';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Field from '@/components/Field';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';

const schema = yup
  .object({
    verifyCode: yup.string().required('Please enter verification code'),
  })
  .required();

const VerifyCodePage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleVerifyCode = (values) => {
    console.log(values);
  };
  return (
    <div className="flex items-center justify-center px-[20px]">
      <form
        className="w-[450px] mt-[150px] mx-auto bg-[#f2f3f4] shadow-xl rounded-lg p-8"
        onSubmit={handleSubmit(handleVerifyCode)}
      >
        <h1 className="mb-3 text-2xl font-bold text-center">Nhập mã</h1>
        <p className="mb-1 text-sm">
          Nhập mã xác minh 6 chữ số để xác nhận bạn đã nhận được mã xác thực
        </p>
        <Field>
          <div className="mb-2">
            <Label htmlFor="verifyCode">Mã xác minh</Label>
          </div>
          <Input
            type="text"
            name="verifyCode"
            control={control}
            id="verifyCode"
            placeholder="Please enter verification code"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.verifyCode && errors.verifyCode.message}
          </p>
        </Field>
        <div className="mx-auto mt-4 w-max">
          <Button kind="primary">Xác minh</Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyCodePage;
