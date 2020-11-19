import React, { useState, useRef } from 'react';
import { Input, Select, Button, Tag } from 'antd';
import TrueForm from '@/coms/trueform';
import { ToTrueCode, ToComplementCode, isNumber } from '@/utils';

import './index.css';

const { Option } = Select;
const options = [
  { label: '原码', value: 'gold' },
  { label: '补码', value: 'lime' }
];

export default () => {
  const [option, setOption] = useState({
    type: '0',
    bits: '32'
  });
  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }
  const [allData, setallData] = useState([]);
  const CURREBT = useRef(null);
  const enCode = () => {
    const str = CURREBT.current.state.value || '';
    let arr = str.split(',');
    if (isNumber()) {
    }
    const { type, bits } = option;
    arr = arr.map((value) => {
      return {
        trueCode: type.includes('gold') ? ToTrueCode({ value, bits }) : '',
        complementCode: type.includes('lime') ? ToComplementCode({ value, bits }) : ''
      };
    });
    setallData(arr);
    console.log(arr);
  };
  const typeFn = (type) => {
    setOption({
      ...option,
      type
    });
  };
  const bitsFn = (bits) => {
    setOption({
      ...option,
      bits
    });
  };
  return (
    <>
      <div className="center">
        <div className="search-box1">
          <Input.Group compact>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={[]}
              style={{ width: '150px' }}
              options={options}
              onChange={typeFn}
              placeholder="选择编码类型"
            ></Select>
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
      </div>
      <div>
        {allData.map((item) => {
          return (
            <div key={item.trueCode}>
              <TrueForm value={item.trueCode}></TrueForm>
              <TrueForm value={item.complementCode}></TrueForm>
            </div>
          );
        })}
      </div>
    </>
  );
};
