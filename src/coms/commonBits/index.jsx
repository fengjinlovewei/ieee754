import React from 'react';
import Bit from '@/coms/bit';

export default (props) => {
  let { value = '' } = props;
  value = value.split('');
  const getRoundClass = (i) => {
    return i === 0 ? '0' : '2';
  };
  return (
    <div>
      {value.map((item, i) => {
        return (
          <Bit key={item + i} type={getRoundClass(i)}>
            {item}
          </Bit>
        );
      })}
    </div>
  );
};
