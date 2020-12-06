import React from 'react';
import Style from './index.module.scss';
import { Button, notification } from 'antd';
import { isSpecialValue } from '@/utils';

import Ieee754formula from '@/static/images/ieee754formula.png';

export default (props) => {
  let { Sign, Exponent, Hide, Mantissa } = props.data;
  //查看是否是特殊值
  let Special = isSpecialValue({ Sign, Exponent, Mantissa });
  if (Special) return Special.DecimalTruthValue;
  let ExponentStr = parseInt(Exponent, 2);
  ExponentStr = ExponentStr == 0 ? '0' : `${ExponentStr} - 1023`;
  const openNotification = () => {
    notification.open({
      key: 'Ieee754formula',
      description: <img src={Ieee754formula}></img>,
      duration: 0,
      className: Style['Ieee754formula']
    });
  };

  return (
    <div className={Style['formula-box']}>
      <span className={Style['formula-item']}>
        -1<sup>{Sign}</sup>
      </span>
      <i>x</i>
      <span>
        2<sup>({ExponentStr})</sup>
      </span>
      <i>x</i>
      <i className={Style['formula-big']}>(</i>
      <span>{+Hide}</span>
      {Mantissa.split('').map((item, i) => {
        return (
          <div
            key={i}
            className={item == '0' ? Style['formula-fraction-0'] : Style['formula-fraction-1']}
          >
            <i>+</i>
            <em>{item}</em>
            <em style={{ padding: '0 5px' }}>x</em>
            <div className={Style['formula-fraction']}>
              <span>1</span>
              <span className={Style['formula-fraction-line']}></span>
              <span>
                2<sup>{i + 1}</sup>
              </span>
            </div>
          </div>
        );
      })}
      <i className={Style['formula-big']}>)</i>
      <Button type="link" onClick={openNotification}>
        查看公式
      </Button>
    </div>
  );
};
