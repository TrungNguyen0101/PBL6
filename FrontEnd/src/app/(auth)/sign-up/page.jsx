'use client';

import Label from '@/components/label/Label';
import Input from '@/components/input/Input';
import { useForm } from 'react-hook-form';
import '../../../styles/Form.css';
import Field from '@/components/field/Field';
import Button from '@/components/button/Button';
import InputTogglePassword from '@/components/input/InputTogglePassword';
import Link from 'next/link';
import routes from '@/constant/routes';
import InputToggleConfirmPassword from '@/components/input/InputToggleConfirmPassword';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonForm from '@/components/buttonform/ButtonForm';

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
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
        }
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password not matches')
      .required('Please enter confirm your password'),
  })
  .required();

export default function SignUpPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSignUp = (values) => {
    console.log(values);
  };
  return (
    <div className="form-wrapper flex items-center justify-center px-[20px]">
      <form
        className="w-[600px] mx-auto  bg-[#eee] rounded-lg p-8 bg-opacity-60"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <h1 className="mb-3 text-3xl font-bold">REGISTER</h1>
        <Field>
          <div className="mb-2">
            <Label htmlFor="username">Username</Label>
          </div>
          <Input
            type="text"
            name="username"
            control={control}
            id="username"
            placeholder="Please enter your username"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.username && errors.username.message}
          </p>
        </Field>
        <Field>
          <div className="mb-2">
            <Label htmlFor="email">Email address</Label>
          </div>
          <Input
            type="email"
            name="email"
            control={control}
            id="email"
            placeholder="Please enter your email address"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.email && errors.email.message}
          </p>
        </Field>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[20px]">
          <InputTogglePassword
            name="password"
            control={control}
            errors={errors}
          />
          <InputToggleConfirmPassword
            name="confirmPassword"
            control={control}
            errors={errors}
          />
        </div>
        <div className="mt-4">
          <ButtonForm>Register</ButtonForm>
        </div>
        <div className="text-center mt-[10px]">
          <span className="font-medium">Do have an account? </span>
          <Link href={routes.LOGIN} className="font-bold">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
