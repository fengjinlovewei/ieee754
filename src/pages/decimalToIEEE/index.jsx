import React, { useState } from 'react';
import { Input, notification } from 'antd';
import IEEE754 from '@/coms/ieee754';
import DetailsList from '@/coms/detailsList';
import { toIEEE754 } from '@/utils';

import Style from './index.module.scss';

const { Search } = Input;
export default () => {
  const [bitMap, setBitMap] = useState([]);

  const enCode = (value) => {
    let arr = value
      .split(',')
      .map((item) => {
        const data = toIEEE754(item);
        if (data === false) {
          notification.error({
            key: item,
            message: `${item} 是错误的数字格式！`,
            duration: 0
          });
        }
        return data;
      })
      .filter(Boolean);
    setBitMap(arr);
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
      <div>
        <div style={{ margin: '20px 0' }}>
          <IEEE754 data={{ Sign, Exponent, Hide, Mantissa, Round }} />
          <div style={{ width: '100%', height: '30px' }}></div>
          <IEEE754
            data={{
              Sign,
              Exponent: roundValue.Exponent,
              Hide: roundValue.Hide,
              Mantissa: roundValue.Mantissa,
              Round: ''
            }}
          />
        </div>
        <DetailsList
          data={{
            DecimalTruthValue,
            RoundDecimalTruthValue:
              roundValue.DecimalTruthValue.truthSign + roundValue.DecimalTruthValue.value,
            BinaryTruthValue,
            RoundBinaryTruthValue:
              roundValue.DecimalTruthValue.truthSign + roundValue.BinaryTruthValue,
            formulaData: roundValue
          }}
        />
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
