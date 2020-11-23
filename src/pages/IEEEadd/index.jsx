import React, { useState, useCallback, useRef } from 'react';
import { Input, Button, Steps } from 'antd';
import IEEE754 from '@/coms/ieee754';
import { toIEEE754, toAdd, toRound, sortMiddleware, fill } from '@/utils';

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
    title: '舍入',
    description: '根据四舍六入五取偶原则进行舍入操作。'
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
    let arr = value.split(',').map((item) => {
      CURRENT.current = [];
      const o = toIEEE754(item);
      return {
        key: Math.random(),
        Sign: o.Sign,
        ...o.roundValue,
        Round: ''
      };
    });
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
        alert('对阶错误！');
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
        return toAdd(2, total, item.Hide + item.Mantissa + item.Round);
      }, 0);
      let [left, right] = t.split('.');
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
      let [left, rigth] = all.split('.');
      // 获得阶码要加的数值
      let len = left.length - 1;
      let Exponent = toAdd(2, total.Exponent, len.toString(2));
      // 得到阶码
      Exponent = fill(11 - Exponent.length) + Exponent;
      // left的第一位肯定是1，所致直接去后面所有的值和 right 拼接就好了
      // 然后和 right 拼接成隐藏位 + 尾数 + 舍入位
      all = left.slice(1) + rigth;
      setTotal({
        ...total,
        Exponent,
        Hide: `1.`,
        Mantissa: all.slice(0, 52),
        Round: all.slice(52)
      });
      return true;
    },
    3: () => {
      if (progress !== 3) return false;
      const { Exponent, Mantissa } = toRound(total);
      setTotal({
        ...total,
        Exponent,
        Hide: `1.`,
        Mantissa,
        Round: ''
      });
    }
  };
  const next = () => {
    if (all[progress]()) {
      setProgress(progress + 1);
    }
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
              下一步
            </Button>
          )}
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
    </div>
  );
};
