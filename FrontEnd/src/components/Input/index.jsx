import { useController } from 'react-hook-form';
import '../../styles/Input.css';

const Input = ({ name, control, isIcon, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' });
  return (
    <input
      className={`w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold ${
        isIcon ? 'pr-[40px]' : ''
      }`}
      type={props.type}
      {...field}
      {...props}
    />
  );
};

export default Input;
