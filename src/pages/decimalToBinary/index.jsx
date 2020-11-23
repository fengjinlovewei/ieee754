import React, { useState } from 'react';
import { Input, List, Table } from 'antd';
import { isNumber, toInt, toFloat } from '@/utils';

import Style from './index.module.scss';

const intLeft = [
  {
    title: '被除数',
    align: 'center',
    dataIndex: 'dividend'
  },
  {
    align: 'center',
    key: 'l1',
    render: () => '÷'
  },
  {
    title: '除数',
    key: 'l2',
    align: 'center',
    render: () => '2'
  },
  {
    align: 'center',
    key: 'l3',
    render: () => '＝'
  },
  {
    title: '商',
    align: 'center',
    dataIndex: 'quotient'
  },
  {
    align: 'center',
    key: 'l4',
    render: () => '········'
  },
  {
    title: '余数',
    align: 'center',
    dataIndex: 'remainder'
  }
];
const intRight = [
  {
    align: 'center',
    key: 'r1',
    render: (text, record) => (record.dividend > 1 ? '2' : '')
  },
  {
    title: '竖式表示',
    align: 'center',
    dataIndex: 'dividend',
    render: (text, record) => (
      <span className={record.dividend > 1 ? 'int-right-dividend' : ''}>{text}</span>
    )
  },
  {
    align: 'center',
    key: 'r2',
    render: () => '········'
  },
  {
    align: 'center',
    dataIndex: 'remainder'
  }
];
const { Search } = Input;
export default () => {
  const [intEquation, setIntEquation] = useState([]);
  const [floatEquation, setFloatEquation] = useState([]);
  const [intValue, setIntValue] = useState('');
  const [floatValue, setFloatValue] = useState('');
  const [type, setType] = useState(0);
  const enCode = (value) => {
    if (!isNumber(value)) return;
    let [int = '', float = ''] = value.split('.');
    if (int) {
      const list = [];
      setIntValue(toInt(value, list));
      setIntEquation(list);
      setType(0);
    }
    if (float) {
      const list = [];
      setFloatValue(toFloat(`0.${float}`, list));
      setFloatEquation(list);
      setType(1);
    }
    if (int && float) {
      setType(2);
    }
    console.log(intEquation);
  };
  return (
    <div>
      <div className="center">
        <div className={Style['search-box']}>
          <Search placeholder="输入10进制" enterButton="编码" onSearch={enCode} />
        </div>
      </div>
      <div className={Style['line-box']}>
        {intEquation.length != 0 && (
          <>
            <div className="int-left-box">
              <Table columns={intLeft} dataSource={intEquation} pagination={false} size="small" />
            </div>
            <div className={Style['line-line']}></div>
            <div className="int-right-box">
              <Table columns={intRight} dataSource={intEquation} pagination={false} size="small" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
