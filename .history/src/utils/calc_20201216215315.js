export function removeBeforeZero(value) {
  value = value.replace(/^0+(?!0)/, '');
  value = value.replace(/^\./, '0.');
  return value ? value : '0';
}
export function removeAfterZero(value) {
  if (!value) return '0';
  value = `${value}`;
  value = value.replace(/\.(0+)?$/, '');
  if (value.indexOf('.') > -1) {
    value = value.replace(/(?<!0)0+$/, '');
  }
  return value;
}
export function NumberWithReg(s) {
  return [
    {
      val: s.match(/^(-?)(\d+)\.(\d+)e-(\d+)$/),
      f() {
        //["1.25e-21", "1", "25", "21"]
        let m = this.val;
        return {
          sign: m[1],
          value: removeBeforeZero(m[2] + m[3]),
          order: ~(+m[4] + m[3].length) + 1,
          other: m
        };
      }
    },
    {
      val: s.match(/^(-?)(\d+)\.(\d+)e\+(\d+)$/),
      f() {
        //["-", "1.25e+21", "1", "25", "21"]
        let m = this.val;
        return {
          sign: m[1],
          value: removeBeforeZero(m[2] + m[3]),
          order: m[4] - m[3].length,
          other: m
        };
      }
    },
    {
      val: s.match(/^(-?)(\d+)e-(\d+)$/),
      f() {
        //["-", "1e-21", "1", "21"]
        let m = this.val;
        return {
          sign: m[1],
          value: removeBeforeZero(m[2]),
          order: ~m[3] + 1,
          other: m
        };
      }
    },
    {
      val: s.match(/^(-?)(\d+)e\+(\d+)$/),
      f() {
        //["-", "1e+21", "1", "21"]
        let m = this.val;
        return {
          sign: m[1],
          value: removeBeforeZero(m[2]),
          order: +m[3],
          other: m
        };
      }
    },
    {
      val: s.match(/^(-?)(\d+)\.(\d+)$/),
      f() {
        //["-", "1.21", "1", "21"]
        let m = this.val;
        return {
          sign: m[1],
          value: removeBeforeZero(m[2] + m[3]),
          order: ~m[3].length + 1,
          other: m
        };
      }
    },
    {
      val: s.match(/^(-?)(\d+)$/),
      f() {
        //["-", "126"]
        let m = this.val;
        return {
          sign: m[1],
          value: removeBeforeZero(m[2]),
          order: 0,
          other: m
        };
      }
    }
  ];
}
//格式化数字
export function NumberToFilter(n) {
  const obj = NumberWithReg(`${n}`);
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].val) {
      return obj[i].f();
    }
  }
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
  let all = arr.map((item) => {
    return NumberToFilter(item);
  });
  //获取最大阶数
  let max = Max(all);
  //获取最小阶数
  let min = Min(all);
  return { arr, all, max, min };
}
function pad(num) {
  // 如果是1e-25这种不带小数点的 返回0
  let len = num.other.length === 4 ? 0 : num.other[3].length;
  if (num.order < 0) {
    // 10的指数
    return `${num.sign}0.${''.padEnd(~num.order - len, 0)}${num.value}`;
  } else {
    return `${num.sign}${num.value}${''.padEnd(num.order, 0)}`;
  }
}
export function NumberToString(value) {
  let s = value.toString();
  //后2个对结果有影响，所以去掉
  const obj = NumberWithReg(s).slice(0, 4);
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].val) {
      return pad(obj[i].f());
    }
  }
  return s;
}
export default {
  //加法
  add(...arg) {
    let { all, min } = getChild(arg);
    let num = all.reduce((total, item) => {
      return total + item.value * 10 ** (item.order + Math.abs(min));
    }, 0);
    return `${num / 10 ** Math.abs(min)}`;
  },
  //减法
  sub(...arg) {
    let { all, min } = getChild(arg);
    let num = all.reduce((total, item, i) => {
      i === 1 && (total = total.value * 10 ** (total.order + Math.abs(min)));
      return total - item.value * 10 ** (item.order + Math.abs(min));
    });
    return `${num / 10 ** Math.abs(min)}`;
  },
  //乘法
  mul(...arg) {
    let { all } = getChild(arg);
    let num = all.reduce(
      (total, item) => {
        return {
          value: total.value * item.value,
          order: total.order + item.order
        };
      },
      { value: 1, order: 0 }
    );
    if (num.order < 0) {
      return `${num.value / 10 ** (~num.order + 1)}`;
    }
    return `${num.value * 10 ** num.order}`;
  },
  //除法
  div(...arg) {
    let { arr, all } = getChild(arg);
    //可以自定义返回，如果有除数或者被除数为0返回的值
    if (arr.includes(0)) {
      console.warn(`除数或者被除数为 0,以返回 1 处理`);
      return 1;
    }
    let num = all.reduce((total, item) => {
      let min = Math.abs(Min([total, item]));
      let num = (total.value * 10 ** (total.order + min)) / (item.value * 10 ** (item.order + min));
      return NumberToFilter(num);
    });
    if (num.order < 0) {
      return `${num.value / 10 ** (~num.order + 1)}`;
    }
    return `${num.value * 10 ** num.order}`;
  }
};

console.log(NumberToString('1.7976931348623157e+30'));
