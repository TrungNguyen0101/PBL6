import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Field from '../Field';
import Input from '../Input';
import Label from '../Label';
import { toast } from 'react-toastify';
import { postSignUp, postSignUp123 } from '@/services/authService';
const schema = yup
  .object({
    username: yup.string().required('Please enter your username'),
    email: yup
      .string()
      .email('Please enter valid email address')
      .required('Please enter your email address'),
    password: yup
      .string()
      .min(6, 'Your password must be at least 6 characters or greater')
      .required('Please enter your password'),
    confirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password not matches')
      .required('Please enter confirm your password'),
  })
  .required();

const ModelAccount = ({ active, handleOffActive, handleGetAllAccount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const handleOk = () => {
    handleOffActive();
  };
  const handleCancel = () => {
    handleOffActive();
    reset();
  };
  useEffect(() => {
    setIsModalOpen(active);
  }, [active]);

  const hanlderFirstForm = async (value) => {
    console.log(value);
    const result = await postSignUp123(
      value.username,
      value.email,
      value.password
    );
    if (result.status === 200) {
      toast.success('Created account admin successfully');
      handleGetAllAccount();
    } else {
      toast.error('Created account admin fail');
    }
    handleCancel();
  };
  return (
    <div className="w-[500px]-h-[300px]">
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={600}
      >
        <form className="px-[20px]" onSubmit={handleSubmit(hanlderFirstForm)}>
          <div className="grid grid-cols-2 gap-x-[20px]">
            {/* title */}
            <Field>
              <div className="mb-2">
                <Label htmlFor="username">UserName</Label>
              </div>
              <Input
                type="text"
                name="username"
                control={control}
                id="username"
                placeholder="Please enter user name"
                className="border"
              />
              <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
                {errors.username && errors.username.message}
              </p>
            </Field>

            {/* email */}
            <Field>
              <div className="mb-2">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                type="email"
                name="email"
                control={control}
                id="email"
                placeholder="Please enter email"
                className="border"
              />
              <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
                {errors.email && errors.email.message}
              </p>
            </Field>

            {/* password */}
            <Field>
              <div className="mb-2">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                name="password"
                control={control}
                id="password"
                placeholder="Please enter password"
                className="border"
              />
              <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
                {errors.password && errors.password.message}
              </p>
            </Field>
            {/* confirmPassword */}
            <Field>
              <div className="mb-2">
                <Label htmlFor="confirm">Confirm Password</Label>
              </div>
              <Input
                type="confirm"
                name="confirm"
                control={control}
                id="confirm"
                placeholder="Please enter confirm password"
                className="border"
              />
              <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
                {errors.confirm && errors.confirm.message}
              </p>
            </Field>
          </div>
          <div className="text-start pb-[5px] flex items-center gap-x-[10px]">
            <button
              className="btn-70  hover:text-[#90e0ef] duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn-70  hover:text-[#90e0ef] duration-300">
              Next
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ModelAccount;
