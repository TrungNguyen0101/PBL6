'use client';
import React from 'react';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Field from '@/components/Field';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import routes from '@/constant/routes';

const schema = yup
  .object({
    verify: yup.string().required('Please enter your email'),
  })
  .required();

const VerifyPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleVerify = (values) => {
    console.log(values);
    router.push(routes.VERIFYCODE);
  };
  return (
    <div className="flex items-center justify-center px-[20px]">
      <form
        className="w-[450px] mt-[150px] mx-auto bg-[#f2f3f4] shadow-xl rounded-lg p-8"
        onSubmit={handleSubmit(handleVerify)}
      >
        <h1 className="mb-3 text-2xl font-bold text-center">
          Xác minh người dùng
        </h1>
        <p className="mb-1 text-sm">
          Nhận mã xác minh được gửi đến email của bạn
        </p>
        <Field>
          <div className="mb-2">
            <Label htmlFor="verify">Email address</Label>
          </div>
          <Input
            type="email"
            name="verify"
            control={control}
            id="verify"
            placeholder="Please enter your email"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.verify && errors.verify.message}
          </p>
        </Field>
        <div className="mx-auto mt-4 w-max">
          <Button kind="primary">Gửi</Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyPage;