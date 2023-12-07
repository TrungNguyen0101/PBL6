'use client';

import React from 'react';
import Button from '@/components/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputTogglePassword from '@/components/InputTogglePassword';
import { changePassword } from '@/services/authService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import routes from '@/constant/routes';

const schema = yup
  .object({
    forgotten: yup.string().required('Please enter your email'),
  })
  .required();

const ChangePasswordPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(schema),
  });
  const handleChangePassword = async (values) => {
    const res = await changePassword(values.oldPassword, values.newPassword);
    if (res.status === 500) {
      toast.error(res.message);
    } else if (res.status === 200) {
      router.push(routes.HOME);
      toast.success(res.message);
    }
  };
  return (
    <>
      <form
        className="w-[800px] bg-[#f2f3f4] shadow-xl rounded-md p-8"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <h1 className="mb-3 text-2xl font-semibold text-center">
          Đổi mật khẩu
        </h1>
        <p className="mb-3 text-sm font-semibold text-center">
          Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái
          và ký tự đặc biệt
        </p>
        <>
          <InputTogglePassword
            name="oldPassword"
            control={control}
            label="Nhập mật khẩu hiện tại"
          />
          <p className="text-xs font-semibold text-red-700 h-[20px]  py-1 whitespace-break-spaces">
            {errors?.oldPassword && errors.oldPassword.message}
          </p>
        </>
        <>
          <InputTogglePassword
            name="newPassword"
            control={control}
            label="Nhập mật khẩu mới"
          />
          <p className="text-xs font-semibold text-red-700 h-[20px]  py-1 whitespace-break-spaces">
            {errors?.newPassword && errors.newPassword.message}
          </p>
        </>
        <>
          <InputTogglePassword
            name="repeatPassword"
            control={control}
            label="Nhập lại mật khẩu mới"
          />
          <p className="text-xs font-semibold text-red-700 h-[20px]  py-1 whitespace-break-spaces">
            {errors?.repeatPassword && errors.repeatPassword.message}
          </p>
        </>
        <div className="mx-auto w-max">
          <Button kind="primary">Đổi mật khẩu</Button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordPage;
