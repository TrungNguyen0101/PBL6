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
import { useTranslation } from 'react-i18next';

const schema = yup
  .object({
    oldPassword: yup.string().required('Please enter your old password'),
    newPassword: yup
      .string()
      .min(6, 'Your password must be at least 6 characters or greater')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
        }
      ),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Password not matches')
      .required('Please enter confirm your password'),
  })
  .required();

const ChangePasswordPage = () => {
  const { t } = useTranslation('info');
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
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
          {t('ChangePassword')}
        </h1>
        <p className="mb-3 text-sm font-semibold text-center">{t('rule')}</p>
        <>
          <InputTogglePassword
            name="oldPassword"
            control={control}
            label={t('currentpassword')}
          />
          <p className="text-xs font-semibold text-red-700 h-[20px]  py-1 whitespace-break-spaces">
            {errors?.oldPassword && errors.oldPassword.message}
          </p>
        </>
        <>
          <InputTogglePassword
            name="newPassword"
            control={control}
            label={t('newpassword')}
          />
          <p className="text-xs font-semibold text-red-700 h-[20px]  py-1 whitespace-break-spaces">
            {errors?.newPassword && errors.newPassword.message}
          </p>
        </>
        <>
          <InputTogglePassword
            name="repeatPassword"
            control={control}
            label={t('re-enter')}
          />
          <p className="text-xs font-semibold text-red-700 h-[20px]  py-1 whitespace-break-spaces">
            {errors?.repeatPassword && errors.repeatPassword.message}
          </p>
        </>
        <div className="mx-auto w-max">
          <Button kind="primary">{t('ChangePassword')}</Button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordPage;
