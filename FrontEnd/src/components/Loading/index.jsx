import React from 'react';
import { Alert, Spin } from 'antd';
import './styled.scss';
const LoadingAnt = () => (
  <div className="w-full h-full absolute top-0">
    {/* <Spin tip="Loading" size="small">
      <div className="content" />
    </Spin> */}
    {/* <Spin tip="Loading">
      <div className="content" />
    </Spin> */}
    {/* <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin> */}
    <Spin tip="Loading...">
      <Alert />
    </Spin>
  </div>
);
export default LoadingAnt;
