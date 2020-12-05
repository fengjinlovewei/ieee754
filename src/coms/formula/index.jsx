import React from 'react';
import Style from './index.module.scss';
import { Button, notification } from 'antd';

import Ieee754formula from '@/static/images/ieee754formula.png';

export default (props) => {
  console.log(props);
  let { Sign, Exponent, Hide, Mantissa } = props.data;
  Exponent = parseInt(Exponent, 2) - 1023;
  Exponent = Math.max(Exponent, -1022);
  const openNotification = () => {
    const args = {
      key: 'Ieee754formula',
      description: <img src={Ieee754formula}></img>,
      duration: 0,
      className: Style['Ieee754formula']
    };
    notification.open(args);
  };
  return (
    <div className={Style['formula-box']}>
      <span className={Style['formula-item']}>
        -1<sup>{Sign}</sup>
      </span>
      <i>x</i>
      <span>
        2<sup>{Exponent}</sup>
      </span>
      <i>x</i>
      <i>(</i>
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
      <i>)</i>
      <Button type="link" onClick={openNotification}>
        查看公式
      </Button>
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
