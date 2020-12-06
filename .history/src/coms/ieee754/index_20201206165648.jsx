import React, { useState, useCallback, useEffect } from 'react';
import Bit from '@/coms/bit';
import Move from '@/coms/move';
import { fill } from '@/utils';

import Style from './index.module.scss';

export default (props) => {
  let { data = {}, move = false, none = {}, newData = () => {} } = props;
  let { Sign, Exponent, Hide, Mantissa, Round, index } = data;
  const [exp, setExp] = useState(Exponent);
  const [hid, setHid] = useState(Hide);
  const [man, setMan] = useState(Mantissa);
  const [rou, setRou] = useState(Round);
  newData({
    index,
    value: { Sign, Exponent: exp, Hide: hid, Mantissa: man, Round: rou }
  });
  const getRoundClass = (i) => {
    return i === 0 ? '3' : '4';
  };
  const isNone = (value) => {
    return value ? 'none' : '';
  };
  const add = useCallback(
    (value) => {
      let cloneExponent = parseInt(exp, 2);
      cloneExponent = (cloneExponent + value).toString(2);
      cloneExponent = fill(11 - cloneExponent.length) + cloneExponent;
      if (+cloneExponent >= +Exponent && +Exponent < 11111111110) {
        setExp(cloneExponent);
      }
    },
    [exp]
  );
  useEffect(() => {
    if (!move) return;
    let num = parseInt(exp, 2) - parseInt(Exponent, 2);
    if (num > 0) {
      let all = fill(num - 1) + 1 + Mantissa;
      setHid('0.');
      setMan(all.slice(0, 52));
      setRou(all.slice(52));
    } else {
      setHid('1.');
      setMan(Mantissa);
      setRou(Round);
    }
  }, [exp]);
  return (
    <div className={`${Style['bit-box']} ${move && 'user'}`}>
      <div className={Style['bit-line']}>
        {Sign && (
          <Bit className={isNone(none.Sign)} type="0">
            {Sign}
          </Bit>
        )}
        {exp && (
          <Move className={isNone(none.Exponent)} callback={add} move={move}>
            {exp.split('').map((item, i) => (
              <Bit key={i} type="1">
                {item}
              </Bit>
            ))}
          </Move>
        )}
      </div>
      <div className={Style['bit-line']}>
        {hid && <span className={`bit-item ${Style['bit-tip']} ${isNone(none.Hide)}`}>{hid}</span>}
        {man &&
          man.split('').map((item, i) => (
            <Bit className={isNone(none.Mantissa)} key={i} type="2">
              {item}
            </Bit>
          ))}
        {rou &&
          rou.split('').map((item, i) => (
            <Bit className={isNone(none.Round)} key={i} type={getRoundClass(i)}>
              {item}
            </Bit>
          ))}
      </div>
    </div>
  );
};
