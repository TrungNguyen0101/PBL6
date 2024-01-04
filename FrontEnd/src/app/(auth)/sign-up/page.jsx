'use client';

import routes from '@/constant/routes';
import Link from 'next/link';
import Label from '@/components/Label';
import InputTogglePassword from '@/components/InputTogglePassword';
import InputToggleConfirmPassword from '@/components/InputToggleConfirmPassword';
import Input from '@/components/Input';
import Field from '@/components/Field';
import ButtonForm from '@/components/ButtonForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postSignUp } from '@/services/authService';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import '../../../styles/Form.scss';

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
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    const res = await postSignUp(
      values.username,
      values.email,
      values.password
    );
    console.log(res);
    if (res.status === 200) {
      toast.success(res.message);
      router.push(routes.LOGIN);
    } else if (res?.response?.status === 500) {
      toast.error(res?.response?.message);
    }
  };
  return (
    <div className="form-wrapper flex items-center justify-center px-[20px]">
      <form
        className="w-[600px] mx-auto bg-[#eee] rounded-lg p-8 bg-opacity-60"
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
        <div className="mx-auto mt-6 w-max">
          <ButtonForm>Register</ButtonForm>
        </div>
        <div className="text-center mt-[10px]">
          <span className="font-medium">Do have an account? </span>
          <Link href={routes.LOGIN} className="font-bold">
            Sign In
          </Link>
        </div>
        <div className="mx-auto mt-1 w-max">
          <Link
            href={routes.HOME}
            className="flex items-center text-sm font-semibold gap-x-1"
          >
            <HiArrowNarrowLeft />
            Back to home
          </Link>
        </div>
      </form>
    </div>
  );
}
