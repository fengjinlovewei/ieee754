import React, { useState, useCallback, useRef } from 'react';
import { Input, Button, Steps, notification } from 'antd';
import IEEE754 from '@/coms/ieee754';
import DetailsList from '@/coms/detailsList';
import { toIEEE754, toAdd, toRound, sortMiddleware, fill, SpecialValue } from '@/utils';

import Style from './index.module.scss';

const { Step } = Steps;
const { Search } = Input;
const steps = [
  {
    title: '阶码对阶',
    description: '大阶不变，小阶向大阶对齐。'
  },
  {
    title: '尾数相加',
    description: '尾数通过加法器运算得出结果。'
  },
  {
    title: '规格化',
    description: '计算后的尾数需要把 . 移动到第一个1后面，左移一位阶码 +1，右移一位，阶码 -1。'
  },
  {
    title: '尾数舍入',
    description: '根据四舍六入五取偶原则进行舍入操作。'
  },
  {
    title: '溢出判断',
    description: '如果指数达到2047，则向无穷舍入；如果指数小于0，则向0舍入；'
  }
];
function getTotal() {
  return {
    Sign: '',
    Exponent: '',
    Hide: '',
    Mantissa: '',
    Round: ''
  };
}
export default () => {
  const [bitMap, setBitMap] = useState([]);
  const [none, setNone] = useState({});
  const [totalNone, setTotalNone] = useState({});
  const [total, setTotal] = useState(getTotal());
  const [progress, setProgress] = useState(0);
  const CURRENT = useRef([]);
  const enCode = (value) => {
    let arr = value.split(',');
    if (arr.length !== 2) {
      return notification.error({
        key: 'notTwo',
        message: '必须是2个数字相加！',
        duration: 2.5
      });
    }
    try {
      arr = arr.map((item) => {
        CURRENT.current = [];
        const o = toIEEE754(item);
        if (o === false) {
          notification.error({
            key: 'notNumber',
            message: '不是数字!',
            duration: 2.5
          });
          throw new Error('中断操作！');
        }
        return {
          key: Math.random(),
          Sign: o.Sign,
          ...o.roundValue,
          Round: ''
        };
      });
    } catch (e) {
      return console.error(e);
    }
    const data = [...arr];
    data.sort(sortMiddleware('Exponent'));
    const { Sign, Exponent } = data[0];
    setBitMap(arr);
    setProgress(0);
    setNone({});
    setTotal({
      ...total,
      Sign,
      Exponent
    });
  };
  const newData = useCallback(
    ({ index, value }) => {
      CURRENT.current[index] = value;
    },
    [bitMap]
  );

  const all = {
    //对阶
    0: () => {
      const bool = CURRENT.current.every((item) => item.Exponent === total.Exponent);
      if (!bool) {
        notification.error({
          key: 'duijie',
          message: '对阶错误!',
          description: '向右拖动小阶部分，使其与大阶相同。',
          duration: 2.5
        });
        return false;
      }
      setProgress(1);
      setNone({ Sign: true, Exponent: true });
      setTotalNone({ Hide: true, Mantissa: true, Round: true });
      return true;
    },
    // 加法计算
    1: () => {
      if (progress !== 1) return false;
      const t = CURRENT.current.reduce((total, item) => {
        const num = item.Hide + item.Mantissa + item.Round;
        return toAdd(2, total, num);
      }, 0);
      let [left = '', right = ''] = t.split('.');
      let Mantissa = right.slice(0, 52);
      setTotal({
        ...total,
        Hide: `${left}.`,
        Mantissa: Mantissa + fill(52 - Mantissa.length),
        Round: right.slice(52)
      });
      setNone({ Sign: true, Exponent: true, Hide: true, Mantissa: true, Round: true });
      setTotalNone({});
      return true;
    },
    // 规格化
    2: () => {
      if (progress !== 2) return false;
      let all = total.Hide + total.Mantissa + total.Round;
      const [left, rigth] = all.split('.');
      // 获得阶码要加的数值
      const len = left.length - 1;
      let Exponent = toAdd(2, total.Exponent, len.toString(2));
      // 得到阶码
      Exponent = fill(11 - Exponent.length) + Exponent;
      // left的第一位肯定是1，所致直接去后面所有的值和 right 拼接就好了
      // 然后和 right 拼接成隐藏位 + 尾数 + 舍入位
      const Hide = left.slice(0, 1) + '.';
      all = left.slice(1) + rigth;
      //特殊值处理，比如 1.1125369292536007e-308 + 1.1125369292536007e-308
      //如果隐藏位为 1. 并且指数为0， 那么就说明阶码需要变化成00000000001
      if (+Hide === 1 && +Exponent === 0) {
        Exponent = '00000000001';
      }
      setTotal({
        ...total,
        Exponent,
        Hide,
        Mantissa: all.slice(0, 52),
        Round: all.slice(52)
      });
      return true;
    },
    //尾数舍入
    3: () => {
      if (progress !== 3) return false;
      const { Exponent, Mantissa } = toRound(total);
      setTotal({
        ...total,
        Exponent,
        Mantissa,
        Round: ''
      });
      return true;
    },
    //溢出判断
    4: () => {
      if (progress !== 4) return false;
      const { Sign, Exponent, Mantissa } = total;
      let message = '';
      if (Exponent === '11111111111') {
        setTotal(SpecialValue.get(`Infinity`));
        message = '指数向上溢出！以舍入至无穷';
      }
      if (+Exponent === 0 && +Mantissa === 0) {
        setTotal(SpecialValue.get(`0`));
        message = '指数向下溢出！以舍入至0';
      }
      if (message) {
        notification.error({
          key: 'zhishuyichu',
          message,
          duration: 0
        });
      }
      return true;
    }
  };
  const next = () => {
    if (all[progress]()) {
      setProgress(progress + 1);
    }
  };
  const prev = () => {
    setProgress(progress - 1);
  };
  const isShow = (num) => {
    return progress > num;
  };
  const matchDom = () => {
    return (
      <div>
        <div className={Style['btn-box']}>
          <Steps current={progress}>
            {steps.map((item) => (
              <Step key={item.title} description={item.description} title={item.title} />
            ))}
          </Steps>
          <div style={{ height: '20px' }}></div>
        </div>
        <div className={Style['btn-centent']}>
          {isShow(0) && <IEEE754 data={total} key={Math.random()} none={totalNone}></IEEE754>}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="center">
        <div className={Style['search-box']}>
          <Search
            placeholder="输入至少2个10进制的值，用逗号分割"
            enterButton="编码"
            onSearch={enCode}
          />
        </div>
        <div style={{ marginLeft: '20px' }}>
          {bitMap.length > 1 && progress < steps.length && (
            <Button type="primary" onClick={() => next()}>
              {progress == steps.length - 1 ? '完成' : '下一步'}
            </Button>
          )}
          {/* {bitMap.length > 1 && progress > 0 && (
            <Button type="primary" onClick={() => prev()}>
              上一步
            </Button>
          )} */}
        </div>
      </div>
      {bitMap.length > 1 && matchDom()}
      <div>
        {bitMap.map((item, index) => {
          return (
            <div style={{ marginBottom: '20px' }} key={item.key}>
              <IEEE754
                data={{ ...item, index }}
                none={none}
                move={true}
                newData={newData}
              ></IEEE754>
            </div>
          );
        })}
      </div>
      {/* {bitMap.length > 1 && progress >= steps.length - 1 && (
        <DetailsList
          data={{
            DecimalTruthValue: DecimalTruthValue.value,
            BinaryTruthValue,
            formulaData: { Sign, Exponent, Hide, Mantissa }
          }}
        />
      )} */}
    </div>
  );
};
