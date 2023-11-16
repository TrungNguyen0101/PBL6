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
import { forgotPassword } from '@/services/authService';
import { toast } from 'react-toastify';
import routes from '@/constant/routes';

const schema = yup
  .object({
    forgotten: yup.string().required('Please enter your email'),
  })
  .required();

const ForgottenPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleForgotten = async (values) => {
    const res = await forgotPassword(values.forgotten);
    if (res.status === 200) {
      toast.success(res.message);
      router.push(routes.LOGIN);
    }
  };
  return (
    <div className="flex items-center justify-center px-[20px]">
      <form
        className="w-[450px] mt-[150px] mx-auto bg-[#f2f3f4] shadow-xl rounded-lg p-8"
        onSubmit={handleSubmit(handleForgotten)}
      >
        <h1 className="mb-3 text-2xl font-bold text-center">
          Tìm kiếm tài khoản của bạn
        </h1>
        <p className="mb-1 text-sm">
          Nhận mã xác minh được gửi đến email của bạn
        </p>
        <Field>
          <div className="mb-2">
            <Label htmlFor="forgotten">Email address</Label>
          </div>
          <Input
            type="email"
            name="forgotten"
            control={control}
            id="forgotten"
            placeholder="Please enter your email"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.forgotten && errors.forgotten.message}
          </p>
        </Field>
        <div className="mx-auto mt-4 w-max">
          <Button kind="primary">Gửi</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgottenPage;
