import React, { useState } from 'react';
import { Input, Table, Alert, notification } from 'antd';
import { isNumber, toInt, toFloat } from '@/utils';
import { NumberToString } from '@/utils/calc';

import Style from './index.module.scss';

const intLeft = [
  {
    title: '被除数',
    align: 'center',
    dataIndex: 'dividend',
    render: (text) => +text
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
    dataIndex: 'quotient',
    render: (text) => +text
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
      <span className={record.dividend > 1 ? Style['int-right-dividend'] : ''}>{+text}</span>
    )
  },
  {
    align: 'center',
    key: 'r2',
    render: () => '········'
  },
  {
    align: 'center',
    dataIndex: 'remainder',
    render: (text) => +text
  }
];
const floatRight = [
  {
    title: '被乘数',
    align: 'center',
    dataIndex: 'multiplicand',
    render: (text) => +text
  },
  {
    align: 'center',
    key: 'l1',
    render: () => '×'
  },
  {
    title: '乘数',
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
    title: '伪乘积',
    align: 'center',
    dataIndex: 'product',
    render: (text, record) => {
      return (
        <>
          {record.remainder === '1' && text !== '0' ? (
            <>
              <span className={Style['delete']}>{record.remainder}</span>
              <em>{+text.replace('0.', '.')}</em>
            </>
          ) : (
            +text
          )}
        </>
      );
    }
  },
  {
    align: 'center',
    key: 'l4',
    render: () => '········'
  },
  {
    title: '伪余数',
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
    value = value.replace(/^\-/, '');
    if (!isNumber(value)) {
      return notification.error({
        key: 'zhishuyichu',
        message: '数字格式不对！',
        duration: 2
      });
    }
    value = NumberToString(value);
    let [int = '', float = ''] = value.split('.');
    let isInt = int && int !== '0';
    let isFloat = float && float !== '0';
    if (isInt) {
      const list = [];
      setIntValue(toInt(int, list));
      setIntEquation(list);
      setType(0);
    } else {
      setIntValue('');
      setIntEquation([]);
    }
    if (isFloat) {
      const list = [];
      setFloatValue(toFloat(`0.${float}`, list));
      setFloatEquation(list);
      setType(1);
    } else {
      setFloatValue('');
      setFloatEquation([]);
    }
    if (isInt && isFloat) {
      setType(2);
    }
  };
  return (
    <div>
      <div className="center">
        <div className={Style['search-box']}>
          <Search placeholder="输入10进制" enterButton="编码" onSearch={enCode} />
        </div>
      </div>
      <div className={Style['message']}>
        {intValue !== '' && <Alert message={<div>{intValue}</div>} type="success" />}
        {floatValue !== '' && <Alert message={<div>0{floatValue}</div>} type="error" />}
      </div>
      <div className={Style['line-box']}>
        {type !== 1 && intEquation.length != 0 && (
          <>
            <div className="int-left-box">
              <Table columns={intLeft} dataSource={intEquation} pagination={false} size="small" />
              <div className={Style['top-arrows']}></div>
            </div>
            <div className={Style['line-line']}></div>
            {type === 0 && (
              <div className="int-right-box">
                <Table
                  columns={intRight}
                  dataSource={intEquation}
                  pagination={false}
                  size="small"
                />
                <div className={Style['top-arrows']}></div>
              </div>
            )}
          </>
        )}
        {type !== 0 && floatEquation.length != 0 && (
          <div className="int-right-box">
            <Table
              columns={floatRight}
              dataSource={floatEquation}
              pagination={false}
              size="small"
            />
            <div className={Style['bottom-arrows']}></div>
          </div>
        )}
      </div>
    </div>
  );
};
