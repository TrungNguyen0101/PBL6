import { useController } from 'react-hook-form';
import '../../styles/Input.scss';

const Input = ({ name, control, isIcon, className, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' });
  return (
    <input
      className={`input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold ${
        isIcon ? 'pr-[40px]' : ''
      } ${className}`}
      type={props.type}
      {...field}
      {...props}
    />
  );
};

export default Input;
