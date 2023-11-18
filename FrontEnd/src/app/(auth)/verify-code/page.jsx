'use client';
import React from 'react';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Field from '@/components/Field';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { sendCodeVerify, verifyCode } from '@/services/authService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import routes from '@/constant/routes';

const schema = yup
  .object({
    verifyCode: yup.string().required('Please enter verification code'),
  })
  .required();

const VerifyCodePage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSendCodeVerify = async () => {
    const res = await sendCodeVerify();
    if (res.status === 200) {
      toast.success(res.message);
    }
  };
  const handleVerifyCode = async (values) => {
    const res = await verifyCode(values.verifyCode);
    sessionStorage.setItem('auth', JSON.stringify(res?.data));
    if (res.status === 200) {
      toast.success(res.message);
      router.push(routes.PROFILE);
    } else {
      toast.success('Verify fail');
    }
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
        <div className="flex mx-auto mt-4 w-max gap-x-3">
          <Button type="button" kind="secondary" onClick={handleSendCodeVerify}>
            Gửi mã
          </Button>
          <Button kind="primary">Xác minh</Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyCodePage;
