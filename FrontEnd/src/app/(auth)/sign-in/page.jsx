'use client';

import routes from '@/constant/routes';
import Link from 'next/link';
import Label from '@/components/Label';
import InputTogglePassword from '@/components/InputTogglePassword';
import Input from '@/components/Input';
import Field from '@/components/Field';
import ButtonForm from '@/components/ButtonForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import '../../../styles/Form.scss';
import { postSignIn } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const schema = yup
  .object({
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
      )
      .required('Please enter your password'),
  })
  .required();

export default function SignInPage() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSignIn = async (values) => {
    const res = await postSignIn(values.email, values.password);
    if (res.status === 200) {
      toast.success(res.message);
      router.push(routes.HOME);
      sessionStorage.setItem('token', res.access_token);
      sessionStorage.setItem('auth', JSON.stringify(res?.user));
    }
  };
  return (
    <div className="form-wrapper flex items-center justify-center px-[20px]">
      <form
        className="w-[500px] mx-auto bg-[#eee] rounded-lg p-8 bg-opacity-60"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <h1 className="mb-3 text-3xl font-bold">LOGIN</h1>
        <Field>
          <div className="mb-2">
            <Label htmlFor="email">Email address</Label>
          </div>
          <Input
            type="email"
            name="email"
            control={control}
            id="email"
            placeholder="Enter your email address"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.email && errors.email.message}
          </p>
        </Field>
        <InputTogglePassword
          name="password"
          control={control}
          errors={errors}
        />
        <Link
          href={routes.FORGOTTEN}
          className="font-semibold text-xs flex justify-end -translate-y-3 hover:opacity-70 transition-all"
        >
          Bạn đã quên mật khẩu?
        </Link>
        <div className="mx-auto mt-2 w-max">
          <ButtonForm>Login</ButtonForm>
        </div>
        <div className="text-center mt-[10px]">
          <span className="font-medium">Do not have an account? </span>
          <Link href={routes.REGISTER} className="font-bold">
            Sign Up
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
