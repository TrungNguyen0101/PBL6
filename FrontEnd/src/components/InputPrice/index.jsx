import { useController } from 'react-hook-form';
import '../../styles/Input.scss';

const InputPrice = ({ name, control, isIcon, className, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' });
  console.log('file: index.jsx:6 ~ InputPrice ~ field:', field);
  const formatNumber = (value) => {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (event) => {
    const formattedValue = formatNumber(event.target.value.replace(/\D/g, ''));
    field.onChange(formattedValue);
  };
  return (
    <input
      className={`input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold ${
        isIcon ? 'pr-[40px]' : ''
      } ${className}`}
      type={props.type}
      {...field}
      {...props}
      onChange={handleChange}
    />
  );
};

export default InputPrice;
