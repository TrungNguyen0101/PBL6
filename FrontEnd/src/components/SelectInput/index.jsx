import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useController } from 'react-hook-form';
import './styled.scss';
import axios from 'axios';
const SelectInput = ({ name, control, isIcon, className, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: 'Action',
    valuePropName: 'value',
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const hanldeGetAllBooks = async () => {
        const { data } = await axios.get('http://localhost:3030/api/category');
        setData(data.data.categories);
      };
      hanldeGetAllBooks();
    } catch (error) {}
  }, []);
  return (
    <Select
      labelInValue={true}
      defaultValue={{
        value: 'romance',
        label: 'Romance',
      }}
      className="w-full input min-h-[45.33px]"
      {...field}
      {...props}
      options={data}
    />
  );
};

export default SelectInput;
