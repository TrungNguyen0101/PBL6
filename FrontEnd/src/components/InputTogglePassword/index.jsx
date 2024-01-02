'use client';
import Field from '../Field';
import Label from '../Label';
import Input from '../Input';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const InputTogglePassword = ({ name, control, label = 'Password' }) => {
  const { t } = useTranslation('info');
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <Field>
      <div className="mb-2">
        <Label htmlFor={name}>{label}</Label>
      </div>
      <div className="relative w-full">
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          name={name}
          control={control}
          id={name}
          isIcon={true}
          placeholder={t('EPW')}
        />
        <span
          className="absolute translate-y-1/2 cursor-pointer right-3 bottom-1/2"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? (
            <AiFillEye size="20px" />
          ) : (
            <AiFillEyeInvisible size="20px" />
          )}
        </span>
      </div>
      {/* <p className="text-xs font-semibold text-red-700 h-[20px]  py-1 whitespace-break-spaces">
        {errors?.password && errors.password.message}
      </p> */}
    </Field>
  );
};

export default InputTogglePassword;
