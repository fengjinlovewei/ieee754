import React, { useState, useRef } from 'react';
import { Input, Select, Button, Tag, List, Divider, notification } from 'antd';
import CommonBits from '@/coms/commonBits';
import { toTrueCode, toOnesComplementCode, toComplementCode, isNumber } from '@/utils';
import { NumberToString } from '@/utils/calc';

import Style from './index.module.scss';

const { Option } = Select;
const { Search } = Input;
const options = [
  { label: '原码', value: 'gold' },
  { label: '补码', value: 'lime' }
];

export default () => {
  const [option, setOption] = useState({
    type: ['gold', 'lime'],
    bits: '32'
  });
  const [allData, setallData] = useState([]);
  const verify = (value) => {
    debugger;
    const { bits, type } = option;
    if (!isNumber(value)) {
      return notification.error({
        key: 'notNumber',
        message: '数字格式不对！',
        duration: 2
      });
    }
    //检测是否有原码
    const isTrue = type.includes('gold');
    //检测是否为负数，负数补码比原码多表示一个负数。
    const isFushu = value < 0;
    const max = !isTrue && isFushu ? 2 ** (bits - 1) : 2 ** (bits - 1) - 1;
    if (Math.abs(value) > max) {
      return notification.error({
        key: 'bits',
        message: `超出${bits}bit界限！`,
        duration: 2
      });
    }
    return NumberToString(value);
  };
  const getVal = (value) => {
    const { bits } = option;
    if (!verify(value)) return false;
    const trueCode = toTrueCode({ value, bits }),
      // 传入反码的第一个值需要替换成 0 ，以保证是原真值的绝对值
      onesComplementCode = toOnesComplementCode(trueCode.replace(/^\d/, '0')),
      complementCode = toComplementCode({ value, bits });
    return { trueCode, onesComplementCode, complementCode, inputValue: value };
  };
  const enCode = (value) => {
    const str = value || '';
    let arr = str.split(',');
    arr = arr.map((val) => getVal(val)).filter(Boolean);
    setallData(arr);
  };
  const typeFn = (type) => {
    setOption({
      ...option,
      type
    });
  };
  const bitsFn = (bits) => {
    setOption({
      ...option,
      bits
    });
  };
  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }
  return (
    <>
      <div className="center">
        <div className={Style['search-box']}>
          <div className={Style['search-box-select']}>
            <Input.Group compact>
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={option.type}
                style={{ width: '150px' }}
                options={options}
                onChange={typeFn}
                placeholder="选择编码类型"
              ></Select>
              <Select defaultValue={option.bits} onChange={bitsFn}>
                <Option value="32">32位</Option>
                <Option value="64">64位</Option>
              </Select>
            </Input.Group>
          </div>

          <div className={Style['search-box-info']}>
            <Search placeholder="请输入10进制的整数值" enterButton="编码" onSearch={enCode} />
          </div>
        </div>
      </div>
      <div>
        {allData.map((item) => {
          const {
            trueCode = '',
            onesComplementCode = '',
            complementCode = '',
            inputValue = ''
          } = item;
          const isPositive = trueCode[0] === '0';
          const isTrueCode = option.type.includes('gold');
          const isComplementCode = option.type.includes('lime');
          return (
            <div key={trueCode}>
              <div style={{ marginBottom: '20px' }}>
                <List size="small" bordered>
                  {isTrueCode && (
                    <List.Item style={{ flexWrap: 'wrap' }}>
                      <Divider orientation="left" style={{ fontSize: 20 }}>
                        原码
                      </Divider>
                      <CommonBits value={trueCode}></CommonBits>
                    </List.Item>
                  )}
                  {isComplementCode && (
                    <List.Item style={{ flexWrap: 'wrap' }}>
                      <Divider orientation="left" style={{ fontSize: 20 }}>
                        补码
                      </Divider>
                      {isPositive ? (
                        <>
                          <div className={Style['line-tip']}>
                            <Tag color="magenta">由于 {inputValue} 为正数，所以补码为它本身：</Tag>
                          </div>
                          <CommonBits value={complementCode}></CommonBits>
                        </>
                      ) : (
                        <>
                          <div className={Style['line-tip']}>
                            <Tag color="magenta">
                              由于 {inputValue} 为负数，所以转化成补码步骤如下：
                            </Tag>
                          </div>
                          <div className={Style['line-tip']}>
                            <Tag color="purple">
                              1. 获得 | {inputValue} | = {inputValue.replace('-', '')} 的原码
                            </Tag>
                          </div>
                          <CommonBits value={trueCode.replace(/^\d/, '0')}></CommonBits>
                          <div className={Style['line-tip']}>
                            <Tag color="purple">2. 各位取反</Tag>
                          </div>
                          <CommonBits value={onesComplementCode}></CommonBits>
                          <div className={Style['line-tip']}>
                            <Tag color="purple">3. 然后 + 1</Tag>
                          </div>
                          <CommonBits value={complementCode}></CommonBits>
                        </>
                      )}
                    </List.Item>
                  )}
                </List>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
