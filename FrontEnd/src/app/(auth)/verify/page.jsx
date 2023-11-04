'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import '../../../styles/Form.scss';
import Field from '@/components/Field';
import Label from '@/components/Label';
import Input from '@/components/Input';

const VerifyPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const handleSignUp = (values) => {
    console.log(values);
  };
  return (
    <div className="form-wrapper flex items-center justify-center px-[20px]">
      <form
        className="w-[500px] mx-auto  bg-[#eee] rounded-lg p-8 bg-opacity-60"
        onSubmit={handleSubmit(handleSignUp)}
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
        </Field>
      </form>
    </div>
  );
};

export default VerifyPage;
