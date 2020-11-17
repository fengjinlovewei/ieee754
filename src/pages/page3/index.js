import React, { useState, useCallback, useRef } from 'react';
import { Input, Button, Steps } from 'antd';
import IEEE754 from '@/coms/ieee754';
import { ToIEEE754, ToAdd, ToRound, sortMiddleware, Fill } from '@/utils';
import './index.css';

const { Step } = Steps;
const { Search } = Input;
const steps = [
  {
    title: '阶码对阶',
    content: 'First-content'
  },
  {
    title: '尾数相加',
    content: 'Second-content'
  },
  {
    title: '规格化',
    content: 'Last-content'
  },
  {
    title: '舍入',
    content: 'Last-content'
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
      const o = ToIEEE754(item);
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
        return ToAdd(2, total, item.Hide + item.Mantissa + item.Round);
      }, 0);
      let [left, right] = t.split('.');
      let Mantissa = right.slice(0, 52);
      setTotal({
        ...total,
        Hide: `${left}.`,
        Mantissa: Mantissa + Fill(52 - Mantissa.length),
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
      let Exponent = ToAdd(2, total.Exponent, len.toString(2));
      // 得到阶码
      Exponent = Fill(11 - Exponent.length) + Exponent;
      // left的第一位肯定是1，所致直接去后面所有的值和 right 拼接就好了
      // 然后和 right 拼接成隐藏位 + 尾数 + 舍入位
      all = left.slice(1) + rigth;
      console.log(all);
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
      const { Exponent, Mantissa } = ToRound(total);
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
    console.log(total);
    return (
      <div>
        <div className="page3-btn-box">
          <Steps current={progress}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div style={{ height: '20px' }}></div>
        </div>
        <div className="page3-btn-centent">
          {isShow(0) && <IEEE754 data={total} key={Math.random()} none={totalNone}></IEEE754>}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="center">
        <div className="search-box">
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
