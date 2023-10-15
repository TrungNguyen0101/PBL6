import { useController } from 'react-hook-form';
import './styled.scss';
const TextErea = ({ name, control, isIcon, className, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' });
  return (
    <textarea
      className={`w-full py-[10px] h-[110px] resize-none pl-[10px] text-base rounded-md outline-none font-semibold text-area ${
        isIcon ? 'pr-[40px]' : ''
      } ${className}`}
      {...field}
      {...props}
    />
  );
};

export default TextErea;
