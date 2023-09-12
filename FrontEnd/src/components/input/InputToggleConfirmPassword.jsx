import Field from '../field/Field';
import Label from '../label/Label';
import Input from './Input';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const InputToggleConfirmPassword = ({ name, control, errors }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <Field>
      <Label htmlFor={name}>Confirm password</Label>
      <div className="relative w-full">
        <Input
          type={`${isShowPassword ? 'text' : 'password'}`}
          name={name}
          control={control}
          id={name}
          placeholder="Please enter confirm your password"
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
      {errors?.confirmPassword && (
        <p className="font-semibold text-red-700">
          {errors.confirmPassword.message}
        </p>
      )}
    </Field>
  );
};

export default InputToggleConfirmPassword;
