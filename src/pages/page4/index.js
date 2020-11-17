import React, { useState, useRef } from 'react';
import { Input, List, Button } from 'antd';
import IEEE754 from '@/coms/ieee754';
import { IEEE754ToDecimal, isSpecialValue } from '@/utils';
import './index.css';

const { Search } = Input;
export default () => {
  const [bitMap, setBitMap] = useState([]);
  const input = useRef(null);
  const enCode = () => {
    let value = input.current.state.value;
    console.log(value);
    let arr = value.split(',').map((item) => validation(item));
    setBitMap(arr);
  };
  const validation = (iee754) => {
    debugger;
    const reg = /^[01]{64}$/;
    const Sign = iee754.slice(0, 1);
    const Exponent = iee754.slice(1, 12);
    const Mantissa = iee754.slice(12);
    if (reg.test(iee754) && Exponent < 11111111111) {
      //查看是否是特殊值
      let Special = isSpecialValue({ Sign, Exponent, Mantissa });
      if (Special) {
        return { ...Special.roundValue };
      }
      const { BinaryTruthValue, DecimalTruthValue } = IEEE754ToDecimal({
        Sign,
        Exponent,
        Mantissa
      });
      return {
        Sign,
        Exponent,
        Hide: '1.',
        Mantissa,
        BinaryTruthValue,
        DecimalTruthValue
      };
    } else {
      alert('格式错误！');
      throw new Error('格式错误！');
    }
  };
  const content = (text) => {
    if (!text) return null;
    return (
      <div>
        {text.map((item, i) => {
          return (
            <span style={{ display: 'inline-block' }} key={item.size}>
              {i !== 0 && ` + `}
              {item.item}x2<sup>{item.size}</sup>
            </span>
          );
        })}
      </div>
    );
  };
  const Line = (porps) => {
    let { Sign, Exponent, Hide, Mantissa, DecimalTruthValue, BinaryTruthValue } = porps.data;
    return (
      <div style={{ marginBottom: '20px' }}>
        <List size="small" bordered>
          <List.Item style={{ flexWrap: 'wrap' }}>
            <IEEE754 data={{ Sign, Exponent, Hide, Mantissa, Round: '' }}></IEEE754>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-lable">十进制真值：</span>
            {DecimalTruthValue.value}
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-lable">二进制真值：</span>
            {BinaryTruthValue}
          </List.Item>
          <List.Item className="list-item">{content(DecimalTruthValue.text)}</List.Item>
        </List>
      </div>
    );
  };
  return (
    <div>
      <div className="center">
        <div className="search-box4 center">
          <Input.TextArea ref={input} placeholder="输入IEEE754双精度浮点数格式，多个用逗号分割" />
          <Button type="primary" onClick={enCode} style={{ marginLeft: '20px' }}>
            编码
          </Button>
        </div>
      </div>
      {bitMap.map((item) => (
        <Line data={item} key={item.DecimalTruthValue}></Line>
      ))}
    </div>
  );
};
