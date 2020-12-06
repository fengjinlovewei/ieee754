import React, { useState, useRef } from 'react';
import { Input, List, Button, notification } from 'antd';
import IEEE754 from '@/coms/ieee754';
import DetailsList from '@/coms/detailsList';
import { ieee754ToDecimal, isSpecialValue } from '@/utils';

import Style from './index.module.scss';

export default () => {
  const [bitMap, setBitMap] = useState([]);
  const input = useRef(null);
  const enCode = () => {
    let value = input.current.state.value;
    let arr = value.split(',').map((item) => validation(item));
    setBitMap(arr);
  };
  const validation = (iee754) => {
    const reg = /^[01]{64}$/;
    const Sign = iee754.slice(0, 1);
    const Exponent = iee754.slice(1, 12);
    const Mantissa = iee754.slice(12);
    if (reg.test(iee754) && Exponent <= 11111111111) {
      //查看是否是特殊值
      let Special = isSpecialValue({ Sign, Exponent, Mantissa });
      if (Special) {
        return { ...Special.roundValue };
      }
      const Hide = Exponent == 0 ? '0.' : '1.';
      const { BinaryTruthValue, DecimalTruthValue } = ieee754ToDecimal({
        Sign,
        Exponent,
        Mantissa
      });

      return {
        Sign,
        Exponent,
        Hide,
        Mantissa,
        BinaryTruthValue,
        DecimalTruthValue
      };
    } else {
      notification.error({
        key: 'ieee754tod',
        message: '格式错误！',
        duration: 0
      });
    }
  };
  const Line = (porps) => {
    let { Sign, Exponent, Hide, Mantissa, DecimalTruthValue, BinaryTruthValue } = porps.data;
    return (
      <div>
        <div style={{ margin: '20px 0' }}>
          <IEEE754 data={{ Sign, Exponent, Hide, Mantissa, Round: '' }}></IEEE754>
          <DetailsList
            data={{
              DecimalTruthValue: DecimalTruthValue.value,
              BinaryTruthValue,
              formulaData: { Sign, Exponent, Hide, Mantissa }
            }}
          />
        </div>
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
