'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { useForm } from 'react-hook-form';
import Field from '@/components/Field';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { updateInforUser } from '@/services/authService';
import { toast } from 'react-toastify';
import routes from '@/constant/routes';
import { AiOutlineCheck } from 'react-icons/ai';

const ProfilePage = () => {
  const [auth, setAuth] = useState(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const handleChangeInfor = async (values) => {
    const res = await updateInforUser(values.username, values.phoneNumber);
    if (res.status === 200) {
      toast.success(res.errMessage);
      sessionStorage.setItem('auth', JSON.stringify(res?.user));
      window.location.reload(false);
    }
  };
  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  useEffect(() => {
    reset({
      email: auth?.email,
      username: auth?.username,
      phoneNumber: auth?.phoneNumber,
    });
  }, [auth]);
  return (
    <div>
      <Header></Header>
      <form
        className="w-[800px] bg-[#f2f3f4] shadow-xl mx-auto mt-5 rounded-md p-8"
        onSubmit={handleSubmit(handleChangeInfor)}
      >
        <h1 className="mb-5 text-2xl font-semibold text-center">
          Thông tin người dùng
        </h1>
        <div className="w-[500px] bg-white mx-auto p-4 rounded-md mb-2">
          <h2 className="text-2xl font-semibold text-center">Xác thực</h2>
          <h3 className="flex items-center justify-center mb-2 text-sm font-semibold gap-x-2">
            Tài khoản của bạn:{' '}
            {auth?.user?.isVerified
              ? 'Tài khoản của bạn đã được xác thực'
              : 'Tài khoản của bạn chưa được xác thực'}
            {auth?.user?.isVerified && <AiOutlineCheck color="green" />}
          </h3>
          <div className="mx-auto w-max">
            <Button kind="primary" to={routes.VERIFYCODE}>
              Xác thực ngay
            </Button>
          </div>
        </div>
        <div className="mb-3">
          <Field>
            <div className="mb-2">
              <Label htmlFor="email">Email address</Label>
            </div>
            <Input
              type="email"
              name="email"
              control={control}
              id="email"
              readOnly={true}
              placeholder="Enter your email address"
            />
          </Field>
        </div>
        <div className="mb-3">
          <Field>
            <div className="mb-2">
              <Label htmlFor="username">Username</Label>
            </div>
            <Input
              type="text"
              name="username"
              control={control}
              id="username"
              placeholder="Enter your username"
            />
          </Field>
        </div>
        <div className="mb-5">
          <Field>
            <div className="mb-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
            </div>
            <Input
              type="text"
              name="phoneNumber"
              control={control}
              id="phoneNumber"
              placeholder="Enter your phone number"
            />
          </Field>
        </div>
        <div className="mx-auto w-max">
          <Button kind="primary">Lưu thông tin</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
