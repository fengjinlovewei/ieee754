export function removeBeforeZero(value) {
  value = value.replace(/^0+(?!0)/, '');
  value = value.replace(/^\./, '0.');
  return value ? value : '0';
}
// 为什么叫SF??? 顺丰快递？还是影魔？
const SF = [
  {
    reg: /^NaN|Infinity|-Infinity$/,
    f(m) {
      //["NaN", "Infinity", "-Infinity"]
      return {
        sign: '',
        value: m[0],
        order: 0,
        other: m
      };
    }
  },
  {
    reg: /^(-?)(\d+)\.(\d+)e-(\d+)$/,
    f(m) {
      //["1.25e-21", "1", "25", "21"]
      return {
        sign: m[1],
        value: removeBeforeZero(m[2] + m[3]),
        order: ~(+m[4] + m[3].length) + 1,
        other: m
      };
    }
  },
  {
    reg: /^(-?)(\d+)\.(\d+)e\+(\d+)$/,
    f(m) {
      //["-", "1.25e+21", "1", "25", "21"]
      return {
        sign: m[1],
        value: removeBeforeZero(m[2] + m[3]),
        order: m[4] - m[3].length,
        other: m
      };
    }
  },
  {
    reg: /^(-?)(\d+)e-(\d+)$/,
    f(m) {
      //["-", "1e-21", "1", "21"]
      return {
        sign: m[1],
        value: removeBeforeZero(m[2]),
        order: ~m[3] + 1,
        other: m
      };
    }
  },
  {
    reg: /^(-?)(\d+)e\+(\d+)$/,
    f(m) {
      //["-", "1e+21", "1", "21"]
      return {
        sign: m[1],
        value: removeBeforeZero(m[2]),
        order: +m[3],
        other: m
      };
    }
  },
  {
    reg: /^(-?)(\d+)\.(\d+)$/,
    f(m) {
      //["-", "1.21", "1", "21"]
      return {
        sign: m[1],
        value: removeBeforeZero(m[2] + m[3]),
        order: ~m[3].length + 1,
        other: m
      };
    }
  },
  {
    reg: /^(-?)(\d+)$/,
    f(m) {
      //["-", "126"]
      return {
        sign: m[1],
        value: removeBeforeZero(m[2]),
        order: 0,
        other: m
      };
    }
  }
];
export function NumberWithReg(v, len = SF.length) {
  v = `${v}`;
  let i = 0,
    value = null;
  while (i < len) {
    value = v.match(SF[i].reg);
    if (value) {
      return SF[i].f(value);
    }
    i++;
  }
  if (len === 5) return v;
  return SF[0].f('NaN'.match(SF[0].reg));
}
function Max(all) {
  return Math.max.apply(
    null,
    all.map((item) => {
      return item.order;
    })
  );
}
function Min(all) {
  return Math.min.apply(
    null,
    all.map((item) => {
      return item.order;
    })
  );
}
//提供计算必要的数值信息
function getChild(arr) {
  //过滤后数组
  let all = arr.map((item) => NumberWithReg(item));
  //获取最大阶数
  let max = Max(all);
  //获取最小阶数
  let min = Min(all);
  return { arr, all, max, min };
}
function pad(num) {
  //如果是NaN,Infinity,-Infinity,他们的other的length都为1
  if (num.other.length === 1) {
    return num.other[0];
  }
  // 如果是1e-25这种不带小数点的 返回0
  let len = num.other.length === 4 ? 0 : num.other[3].length;
  if (num.order < 0) {
    // 10的指数
    return `${num.sign}0.${''.padEnd(~num.order - len, 0)}${num.value}`;
  } else {
    return `${num.sign}${num.value}${''.padEnd(num.order, 0)}`;
  }
}
// 前置校验函数
function beforeVerify(fn) {
  return function (...arg) {
    if (arg.length === 0) return;
    //对于四则运算，至少要两个数，一的数字统统死啦死啦滴
    if (arg.length === 1) return 'NaN';
    return fn.apply(this, arg);
  };
}
export function NumberToString(value) {
  //后2个对结果有影响，所以去掉
  const s = NumberWithReg(value, 5);
  if (typeof s === 'string') return s;
  return pad(s);
}
export default {
  //加法
  add: beforeVerify(function (...arg) {
    const { all, min } = getChild(arg),
      absMin = Math.abs(min),
      num = all.reduce((total, item, i) => {
        return total + `${item.sign}${item.value}` * 10 ** (item.order + absMin);
      }, 0);
    return `${num / 10 ** absMin}`;
  }),
  //减法
  sub: beforeVerify(function (...arg) {
    const { all, min } = getChild(arg),
      absMin = Math.abs(min),
      first = all.shift(),
      num = all.reduce((total, item) => {
        return total - `${item.sign}${item.value}` * 10 ** (item.order + absMin);
      }, `${first.sign}${first.value}` * 10 ** (first.order + absMin));
    return `${num / 10 ** absMin}`;
  }),
  //乘法
  mul: beforeVerify(function (...arg) {
    const { all } = getChild(arg),
      num = all.reduce(
        (total, item) => {
          return {
            value: total.value * `${item.sign}${item.value}`,
            order: total.order + item.order
          };
        },
        { value: 1, order: 0 }
      );
    if (num.order < 0) {
      return `${num.value / 10 ** (~num.order + 1)}`;
    }
    return `${num.value * 10 ** num.order}`;
  }),
  //除法
  div: beforeVerify(function (...arg) {
    const { all } = getChild(arg);
    const num = all.reduce((total, item) => {
      //取2个数的最小指数的绝对值min
      const min = Math.abs(Min([total, item])),
        num =
          (`${total.sign}${total.value}` * 10 ** (total.order + min)) /
          (`${item.sign}${item.value}` * 10 ** (item.order + min));
      //除完的数很大可能会出现小数，所以需要再次格式化
      return NumberWithReg(num);
    });
    if (num.order < 0) {
      return `${num.sign}${num.value / 10 ** (~num.order + 1)}`;
    }
    return `${num.sign}${num.value * 10 ** num.order}`;
  })
};
