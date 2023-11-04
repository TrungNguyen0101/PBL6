import React from 'react';
import { Select, Space } from 'antd';
import { useController } from 'react-hook-form';
import './styled.scss';

const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const SelectInputLanguage = ({
  name,
  control,
  isIcon,
  className,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: ['china'],
  });
  return (
    <Select
      mode="multiple"
      style={{
        width: '100%',
      }}
      placeholder="Select language"
      defaultValue={['china']}
      onChange={handleChange}
      optionLabelProp="label"
      className="w-full input h-[45.33px]"
      {...field}
      {...props}
    >
      <Option value="china" label="China">
        <Space>
          <span role="img" aria-label="China">
            🇨🇳
          </span>
          China (中国)
        </Space>
      </Option>
      <Option value="usa" label="USA">
        <Space>
          <span role="img" aria-label="USA">
            🇺🇸
          </span>
          USA (美国)
        </Space>
      </Option>
      <Option value="japan" label="Japan">
        <Space>
          <span role="img" aria-label="Japan">
            🇯🇵
          </span>
          Japan (日本)
        </Space>
      </Option>
      <Option value="korea" label="Korea">
        <Space>
          <span role="img" aria-label="Korea">
            🇰🇷
          </span>
          Korea (韩国)
        </Space>
      </Option>
    </Select>
  );
};
export default SelectInputLanguage;
