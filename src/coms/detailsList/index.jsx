import React, { useState } from 'react';
import { List, Button } from 'antd';
import Formula from '@/coms/formula';
import Style from './index.module.scss';

export default (props) => {
  const [show, setShow] = useState(false);
  const { children, data = {} } = props;
  const {
    DecimalTruthValue,
    RoundDecimalTruthValue,
    BinaryTruthValue,
    RoundBinaryTruthValue,
    formulaData
  } = data;
  return (
    <div style={{ marginBottom: '20px' }}>
      <List size="small" bordered>
        {children && <List.Item className={Style['list-item']}>{children}</List.Item>}
        {DecimalTruthValue && (
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>十进制真值：</span>
            <div className={Style['list-item-text']}>{DecimalTruthValue}</div>
          </List.Item>
        )}
        {RoundDecimalTruthValue && (
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>舍入十进制：</span>
            <div className={Style['list-item-text']}>{RoundDecimalTruthValue}</div>
          </List.Item>
        )}
        {BinaryTruthValue && (
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>二进制真值：</span>
            <div className={Style['list-item-text']}>{BinaryTruthValue}</div>
          </List.Item>
        )}
        {RoundBinaryTruthValue && (
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>舍入二进制：</span>
            <div className={Style['list-item-text']}>{RoundBinaryTruthValue}</div>
          </List.Item>
        )}
        {formulaData && (
          <List.Item className={Style['list-item']}>
            <span className={Style['list-item-lable']}>
              <Button
                type="link"
                onClick={() => setShow(!show)}
                style={{ padding: 0, height: '26px' }}
              >
                十进制步骤：
              </Button>
            </span>
            <div className={Style['list-item-text']}>
              {show ? <Formula data={formulaData}></Formula> : <span>点击标题显示内容</span>}
            </div>
          </List.Item>
        )}
      </List>
    </div>
  );
};
