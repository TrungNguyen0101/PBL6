import React from 'react';
import { Select } from 'antd';
import { useController } from 'react-hook-form';
import './styled.scss';

const SelectInput = ({ name, control, isIcon, className, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: 'romance',
    valuePropName: 'value',
  });

  return (
    <Select
      labelInValue={true}
      defaultValue={{
        value: 'romance',
        label: 'Romance',
      }}
      className="w-full"
      {...field}
      {...props}
      options={[
        {
          value: 'romance',
          label: 'Romance',
        },
        {
          value: 'Horror',
          label: 'Horror',
        },
        {
          value: 'Short Stories',
          label: 'Short Stories',
        },
      ]}
    />
  );
};

export default SelectInput;
