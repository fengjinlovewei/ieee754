import React, { useState, useRef } from 'react';
import { Input, Select, Button, Tag, List, Divider } from 'antd';
import CommonBits from '@/coms/commonBits';
import { toTrueCode, toOnesComplementCode, toComplementCode, isNumber } from '@/utils';

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
  const verify = (inputValue) => {
    debugger;
    const { bits } = option;
    const trueCode = toTrueCode({ inputValue, bits }),
      // 传入反码的第一个值需要替换成 0 ，以保证是原真值的绝对值
      onesComplementCode = toOnesComplementCode(trueCode.replace(/^\d/, '0')),
      complementCode = toComplementCode({ inputValue, bits });
    return { trueCode, onesComplementCode, complementCode, inputValue };
  };
  const enCode = (value) => {
    const str = value || '';
    let arr = str.split(',');
    arr = arr.map((val) => verify(val)).filter(Boolean);
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
