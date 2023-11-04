import React from 'react';
import { Slider } from 'antd';
const formatter = (value) => `${value}%`;

const SliderAnt = () => (
  <Slider
    defaultValue={0}
    tooltip={{
      formatter,
    }}
    className="w-full"
  />
);
export default SliderAnt;
