import React from 'react';
// import { DatePicker, Space } from 'antd';
import { useController } from 'react-hook-form';

const DatePickerInput = ({ name, control, className, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    // <Space direction="vertical">
    //   <DatePicker {...field} {...props} />
    // </Space>
    <input
      className="w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold"
      type="date"
      {...field}
      {...props}
    ></input>
  );
};
export default DatePickerInput;
