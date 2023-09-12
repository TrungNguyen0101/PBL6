import { useController } from 'react-hook-form';

const Input = ({ name, control, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' });
  return (
    <input
      className="w-full p-[10px] text-base rounded-md outline-none font-semibold"
      type={props.type}
      {...field}
      {...props}
    />
  );
};

export default Input;
