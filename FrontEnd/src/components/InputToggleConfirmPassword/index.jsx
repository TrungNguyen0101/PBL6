import Label from '../Label';
import Input from '../Input';
import Field from '../Field';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const InputToggleConfirmPassword = ({ name, control, errors }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <Field>
      <div className="mb-2">
        <Label htmlFor={name}>Confirm password</Label>
      </div>
      <div className="relative w-full">
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          name={name}
          control={control}
          id={name}
          isIcon={true}
          placeholder="Enter confirm your password"
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
      <p className="font-semibold text-xs text-red-700 h-[20px] py-1 whitespace-break-spaces ">
        {errors.confirmPassword && errors.confirmPassword.message}
      </p>
    </Field>
  );
};

export default InputToggleConfirmPassword;
