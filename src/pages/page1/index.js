import React, { useState, useRef } from 'react';
import { Input, Select, Button } from 'antd';
import TrueForm from '@/coms/trueForm'
import { BinaryToDecimal } from '@/utils'

import './index.css';

const { Option } = Select;

export default () => {
  const [option, setOption] = useState({
    type: '0',
    bits: '32'
  })
  const CURREBT = useRef(null)
  const enCode = () => {
    let value = CURREBT.current.state.value
    value = BinaryToDecimal(value)
    console.log(value);
  };
  const typeFn = (type) => {
    setOption({
      ...option,
      type
    })
  };
  const bitsFn = (bits) => {
    setOption({
      ...option,
      bits
    })
  };
  return (
    <div className="center">
      <div className="search-box1">
        <Input.Group compact>
          <Select defaultValue={option.type} onChange={typeFn}>
            <Option value="0">原码</Option>
            <Option value="1">补码</Option>
            <Option value="2">全部</Option>
          </Select>
          <Select defaultValue={option.bits} onChange={bitsFn}>
            <Option value="32">32位</Option>
            <Option value="64">64位</Option>
          </Select>
        </Input.Group>
        <div style={{ flex: 1 }}>
          <Input placeholder="请输入10进制的值" ref={CURREBT} style={{ width: '290px' }} />
        </div>
        <Button type="primary" onClick={enCode}>
          编码
        </Button>
      </div>
      <div>
        {/* <TrueForm data={}></TrueForm> */}
      </div>
    </div>
  );
};
