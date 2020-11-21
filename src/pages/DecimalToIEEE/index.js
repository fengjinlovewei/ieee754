import React, { useState } from 'react';
import { Input, List } from 'antd';
import IEEE754 from '@/coms/ieee754';
import { toIEEE754 } from '@/utils';
import './index.css';

const { Search } = Input;
export default () => {
  const [bitMap, setBitMap] = useState([]);

  const enCode = (value) => {
    let arr = value.split(',').map((item) => toIEEE754(item));
    setBitMap(arr);
  };
  const content = (roundValue) => {
    let { DecimalTruthValue } = roundValue;
    if (!DecimalTruthValue.text) return null;
    return (
      <div>
        {DecimalTruthValue.text.map((item, i) => {
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
    let {
      Sign,
      Exponent,
      Hide,
      Mantissa,
      Round,
      DecimalTruthValue,
      BinaryTruthValue,
      roundValue
    } = porps.data;
    return (
      <div style={{ marginBottom: '20px' }}>
        <List size="small" bordered>
          <List.Item style={{ flexWrap: 'wrap' }}>
            <IEEE754 data={{ Sign, Exponent, Hide, Mantissa, Round }}></IEEE754>
            <div style={{ width: '100%', height: '30px' }}></div>
            <IEEE754
              data={{
                Sign,
                Exponent: roundValue.Exponent,
                Hide: roundValue.Hide,
                Mantissa: roundValue.Mantissa,
                Round: ''
              }}
            ></IEEE754>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-lable">十进制真值：</span>
            {DecimalTruthValue}
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-lable">舍入十进制：</span>
            {roundValue.DecimalTruthValue.truthSign}
            {roundValue.DecimalTruthValue.value}
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-lable">二进制真值：</span>
            {BinaryTruthValue}
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-lable">舍入二进制：</span>
            {roundValue.DecimalTruthValue.truthSign}
            {roundValue.BinaryTruthValue}
          </List.Item>
          <List.Item className="list-item">{content(roundValue)}</List.Item>
        </List>
      </div>
    );
  };
  return (
    <div>
      <div className="center">
        <div className="search-box">
          <Search placeholder="输入10进制，多个用逗号分割" enterButton="编码" onSearch={enCode} />
        </div>
      </div>
      {bitMap.map((item) => (
        <Line data={item} key={item.DecimalTruthValue}></Line>
      ))}
    </div>
  );
};
