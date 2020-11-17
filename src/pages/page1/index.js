import React from 'react';
import { Input, Select, Button } from 'antd';

import './index.css';

const { Option } = Select;

export default () => {
  const enCode = (value) => {
    console.log(value);
  };
  const typeFn = (e) => {
    let value = e.target.value;
  };
  const numFn = (e) => {
    let value = e.target.value;
  };
  return (
    <div className="center">
      <div className="search-box1">
        <Input.Group compact>
          <Select defaultValue="a" onChange={typeFn}>
            <Option value="a">原码</Option>
            <Option value="b">补码</Option>
            <Option value="c">全部</Option>
          </Select>
          <Select defaultValue="32" onChange={numFn}>
            <Option value="32">32位</Option>
            <Option value="64">64位</Option>
          </Select>
        </Input.Group>
        <div style={{ flex: 1 }}>
          <Input placeholder="请输入10进制的值" style={{ width: '290px' }} />
        </div>
        <Button type="primary" onClick={enCode}>
          编码
        </Button>
      </div>
    </div>
  );
};
