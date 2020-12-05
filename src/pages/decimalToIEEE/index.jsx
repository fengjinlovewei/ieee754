import React, { useState } from 'react';
import { Input, List } from 'antd';
import IEEE754 from '@/coms/ieee754';
import Formula from '@/coms/formula';
import { toIEEE754 } from '@/utils';

import Style from './index.module.scss';

const { Search } = Input;
export default () => {
  const [bitMap, setBitMap] = useState([]);

  const enCode = (value) => {
    let arr = value.split(',').map((item) => toIEEE754(item));
    setBitMap(arr);
  };
  const content = (roundValue) => {
    console.log(roundValue);
    let { Sign, Exponent, Hide, Mantissa } = roundValue;
    Exponent = parseInt(Exponent, 2) - 1023;
    Exponent = Math.max(Exponent, -1022);
    return (
      <div className={Style['formula-box']}>
        <span>
          -1<sup>{Sign}</sup>
        </span>
        <i>x</i>
        <span>
          2<sup>{Exponent}</sup>
        </span>
        <i>x</i>
        <i>(</i>
        <span>{+Hide}</span>
        <i>+</i>
        {Mantissa.split('').map((item, i) => {
          return (
            <div key={i}>
              <em>{item}</em>
              <i>x</i>
              <div>
                <span>1</span>
                <span>——</span>
                <span>
                  2<sup>{~i}</sup>
                </span>
              </div>
            </div>
          );
        })}
        <i>)</i>
      </div>
    );
    // let { DecimalTruthValue } = roundValue;
    // if (!DecimalTruthValue.text) return null;
    // return (
    //   <div>
    //     {DecimalTruthValue.text.map((item, i) => {
    //       return (
    //         <span style={{ display: 'inline-block' }} key={item.size}>
    //           {i !== 0 && ` + `}
    //           {item.item}x2<sup>{item.size}</sup>
    //         </span>
    //       );
    //     })}
    //   </div>
    // );
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
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>十进制真值：</span>
            <div className={Style['list-item-text']}>{DecimalTruthValue}</div>
          </List.Item>
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>舍入十进制：</span>
            <div className={Style['list-item-text']}>
              {roundValue.DecimalTruthValue.truthSign}
              {roundValue.DecimalTruthValue.value}
            </div>
          </List.Item>
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>二进制真值：</span>
            <div className={Style['list-item-text']}>{BinaryTruthValue}</div>
          </List.Item>
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>舍入二进制：</span>
            <div className={Style['list-item-text']}>
              {roundValue.DecimalTruthValue.truthSign}
              {roundValue.BinaryTruthValue}
            </div>
          </List.Item>
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>十进制步骤：</span>
            <div className={Style['list-item-text']}>
              <Formula data={roundValue}></Formula>
            </div>
          </List.Item>
        </List>
      </div>
    );
  };
  return (
    <div>
      <div className="center">
        <div className={Style['search-box']}>
          <Search placeholder="输入10进制，多个用逗号分割" enterButton="编码" onSearch={enCode} />
        </div>
      </div>
      {bitMap.map((item) => (
        <Line data={item} key={item.DecimalTruthValue}></Line>
      ))}
    </div>
  );
};
