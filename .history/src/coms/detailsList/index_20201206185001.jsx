import React from 'react';
import { List } from 'antd';
import Formula from '@/coms/formula';
import Style from './index.module.scss';

export default (porps) => {
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
