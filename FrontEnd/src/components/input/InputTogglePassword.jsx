import Field from '../field/Field';
import Label from '../label/Label';
import Input from './Input';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const InputTogglePassword = ({ name, control, errors }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <Field>
      <div className="mb-2">
        <Label htmlFor={name}>Password</Label>
      </div>
      <div className="relative w-full">
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          name={name}
          control={control}
          id={name}
          placeholder="Enter your password"
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
      <p className="text-xs font-semibold text-red-700 h-[20px] whitespace-nowrap py-1 whitespace-break-spaces">
        {errors?.password && errors.password.message}
      </p>
    </Field>
  );
};

export default InputTogglePassword;
