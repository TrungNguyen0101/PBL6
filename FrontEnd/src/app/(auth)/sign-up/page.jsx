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
    <div className="form-wrapper">
      <form
        className="w-[500px] mx-auto mt-[120px] bg-[#eee] rounded-lg p-10 bg-opacity-60"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <h1 className="mb-3 text-3xl font-bold">REGISTER</h1>
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            control={control}
            id="username"
            placeholder="Please enter your username"
          />
          {errors?.username && (
            <p className="font-semibold text-red-700">
              {errors.username.message}
            </p>
          )}
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            control={control}
            id="email"
            placeholder="Please enter your email address"
          />
          {errors?.email && (
            <p className="font-semibold text-red-700">{errors.email.message}</p>
          )}
        </Field>
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
        <div className="mt-10">
          <Button kind="secondary">Register</Button>
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
