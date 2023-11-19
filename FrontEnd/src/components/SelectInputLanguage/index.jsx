import React from 'react';
import { Select, Space } from 'antd';
import { useController } from 'react-hook-form';
import './styled.scss';

const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const data = [
  {
    key: '🇻🇳',
    text: 'Vietnamese (Tiếng Việt)',
    label: 'Vietnamese',
  },
  {
    key: '🇨🇳',
    text: 'China (中文)',
    label: 'Chinese',
  },
  {
    key: '🇰🇷',
    text: 'Korea (한국어)',
    label: 'Korean',
  },
  {
    key: '🇯🇵',
    label: 'Japanese',
    text: 'Japan (日本語)',
  },
  {
    key: '🇺🇸',
    label: 'English',
    text: 'English',
  },
  {
    key: '🇫🇷',
    label: 'French',
    text: 'France (Français)',
  },
  {
    key: '🇩🇪',
    label: 'German',
    text: 'Germany (Deutsch)',
  },
  {
    key: '🇪🇸',
    label: 'Spanish',
    text: 'Spain (Español)',
  },
  {
    key: '🇮🇳',
    label: 'Hindi',
    text: 'India (भारत)',
  },
  {
    key: '🇷🇺',
    label: 'Russian',
    text: 'Russia (Русский)',
  },
  {
    key: '🇧🇷',
    label: 'Portuguese',
    text: 'Brazil (Brasil)',
  },
];
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
    defaultValue: ['Vietnamese (Tiếng Việt)'],
  });
  return (
    <Select
      mode="multiple"
      style={{
        width: '100%',
      }}
      placeholder="Select language"
      defaultValue={['Vietnamese (Tiếng Việt)']}
      onChange={handleChange}
      optionLabelProp="label"
      className="w-full input min-h-[45.33px]"
      {...field}
      {...props}
    >
      {data.length > 0 &&
        data.map((item) => (
          <Option value={item.text} label={item.label}>
            <Space>
              <span role="img" aria-label={item.label}>
                {item.key}
              </span>
              {item.text}
            </Space>
          </Option>
        ))}
    </Select>
  );
};
export default SelectInputLanguage;
