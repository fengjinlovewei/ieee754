import React, { useState, useRef } from 'react';
import { Input, List, Button, notification } from 'antd';
import IEEE754 from '@/coms/ieee754';
import DetailsList from '@/coms/detailsList';
import { ieee754ToDecimalToInput, isSpecialValue } from '@/utils';

import Style from './index.module.scss';

export default () => {
  const [bitMap, setBitMap] = useState([]);
  const input = useRef(null);
  const enCode = () => {
    let value = input.current.state.value;
    let arr = value
      .split(',')
      .map((item) => validation(item))
      .filter(Boolean);
    setBitMap(arr);
  };
  const validation = (ieee754) => {
    const data = ieee754ToDecimalToInput(ieee754);
    if (data === false) {
      notification.error({
        key: ieee754,
        message: `${ieee754} 是错误的ieee754格式！`,
        duration: 0
      });
    }
    return data;
  };
  const Line = (porps) => {
    let { Sign, Exponent, Hide, Mantissa, DecimalTruthValue, BinaryTruthValue } = porps.data;
    return (
      <div>
        <div style={{ margin: '20px 0' }}>
          <IEEE754 data={{ Sign, Exponent, Hide, Mantissa, Round: '' }}></IEEE754>
        </div>
        <DetailsList
          data={{
            DecimalTruthValue: DecimalTruthValue.value,
            BinaryTruthValue,
            formulaData: { Sign, Exponent, Hide, Mantissa }
          }}
        />
      </div>
    );
  };
  return (
    <div>
      <div className="center">
        <div className={`${Style['search-box']} center`}>
          <Input.TextArea ref={input} placeholder="输入IEEE754双精度浮点数格式，多个用逗号分割" />
          <Button type="primary" onClick={enCode} style={{ marginLeft: '20px' }}>
            编码
          </Button>
        </div>
      </div>
      {bitMap.map((item) => (
        <Line data={item} key={item.DecimalTruthValue.value}></Line>
      ))}
    </div>
  );
};
