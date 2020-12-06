import Calc, {
  NumberToFilter,
  removeAfterZero,
  NumberToString,
  removeBeforeZero
} from '@/utils/calc';

//0.0000000000000000000000001
//console.log(NumberToString(5e-324));
//console.log(toAdd(10, '', ''))
//console.log(NumberToString('2.220446049250313e-16'))
//console.log(binaryToDecimal('0.010011001100110011001100110011001100110011001100110100'))
//console.log(toFloat('0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005'));
//特殊值常量
console.log(toIndex(2, 80));
console.log(toInt('1180591620717411300000'));
const SpecialValue = (() => {
  const Z_11_0 = fill(11),
    Z_11_1 = fill(11, 1),
    Z_16_0 = fill(16),
    Z_51_0 = fill(51),
    Z_52_0 = fill(52);

  return new Map([
    [
      '0',
      {
        Sign: '0',
        Hide: '0.',
        Exponent: Z_11_0,
        Mantissa: Z_52_0,
        Round: Z_16_0,
        DecimalTruthValue: '0',
        BinaryTruthValue: '0',
        roundValue: {
          Sign: '0',
          Hide: '0.',
          Exponent: Z_11_0,
          Mantissa: Z_52_0,
          BinaryTruthValue: '0',
          DecimalTruthValue: {
            truthSign: '',
            value: '0',
            text: []
          }
        }
      }
    ],
    [
      '-0',
      {
        Sign: '1',
        Hide: '0.',
        Exponent: Z_11_0,
        Mantissa: Z_52_0,
        Round: Z_16_0,
        DecimalTruthValue: '-0',
        BinaryTruthValue: '-0',
        roundValue: {
          Sign: '1',
          Hide: '0.',
          Exponent: Z_11_0,
          Mantissa: Z_52_0,
          BinaryTruthValue: '-0',
          DecimalTruthValue: {
            truthSign: '-',
            value: '0',
            text: []
          }
        }
      }
    ],
    [
      'NaN',
      {
        Sign: '0',
        Hide: '0.',
        Exponent: Z_11_1,
        Mantissa: Z_51_0 + 1,
        Round: Z_16_0,
        DecimalTruthValue: 'NaN',
        BinaryTruthValue: 'NaN',
        roundValue: {
          Sign: '0',
          Hide: '0.',
          Exponent: Z_11_1,
          Mantissa: Z_51_0 + 1,
          BinaryTruthValue: 'NaN',
          DecimalTruthValue: {
            truthSign: '',
            value: 'NaN',
            text: []
          }
        }
      }
    ],
    [
      'Infinity',
      {
        Sign: '0',
        Hide: '0.',
        Exponent: Z_11_1,
        Mantissa: Z_52_0,
        Round: Z_16_0,
        DecimalTruthValue: 'Infinity',
        BinaryTruthValue: 'Infinity',
        roundValue: {
          Sign: '0',
          Hide: '0.',
          Exponent: Z_11_1,
          Mantissa: Z_52_0,
          BinaryTruthValue: 'Infinity',
          DecimalTruthValue: {
            truthSign: '',
            value: 'Infinity',
            text: []
          }
        }
      }
    ],
    [
      '-Infinity',
      {
        Sign: '1',
        Hide: '0.',
        Exponent: Z_11_1,
        Mantissa: Z_52_0,
        Round: Z_16_0,
        DecimalTruthValue: '-Infinity',
        BinaryTruthValue: '-Infinity',
        roundValue: {
          Sign: '1',
          Hide: '0.',
          Exponent: Z_11_1,
          Mantissa: Z_52_0,
          BinaryTruthValue: '-Infinity',
          DecimalTruthValue: {
            truthSign: '',
            value: '-Infinity',
            text: []
          }
        }
      }
    ]
  ]);
})();
// 填充函数
export function fill(length, value = 0) {
  return ''.padEnd(length, value);
}
//10进制整数转化2进制
export function toInt(int, list) {
  if (!int) return '0';
  int = `${int}`;
  if (int < 2) {
    list &&
      list.push({
        dividend: int,
        key: int,
        quotient: 0,
        remainder: +int
      });
    return int;
  }
  const intArr = int.split('');
  let tip = 0,
    str = '';
  for (let n of intArr) {
    n = tip ? +n + 10 : n;
    let a = n / 2,
      b = a >> 0;
    tip = a === b ? 0 : 1;
    str += b;
  }
  str = removeBeforeZero(str);
  list &&
    list.push({
      dividend: int,
      key: int,
      quotient: str,
      remainder: tip
    });
  return '' + toInt(str, list) + tip;
}
//10进制小数转化2进制
//注意：返回值以.开头，而不是0.
//这个点有用，作为分隔符
export function toFloat(float, list) {
  let floatStr = '.';
  if (!float) return floatStr;
  // -1022 - 52
  for (let i = 0; i < 1074; i++) {
    // 被乘数
    const data = { multiplicand: float, key: i };
    //float = Calc.mul(float, 2);
    float = toAdd(10, float, float);
    if (float >= 1) {
      floatStr += 1;
      // 余数
      data.remainder = '1';
      if (float == 1) {
        // 乘积
        data.product = '0';
        list && list.push(data);
        break;
      }
      float = float.replace('1.', '0.');
    } else {
      // 余数
      data.remainder = '0';

      floatStr += 0;
    }
    // 乘积
    data.product = float;
    list && list.push(data);
  }
  return floatStr;
}
//转化成2进制总函数（可以是整数，小数，浮点数）
export function toBinary(num) {
  let [int, float] = num.split('.');
  let intStr = int ? toInt(int) : '0';
  let floatStr = float ? toFloat(`0.${float}`) : '.';
  return intStr + floatStr;
}
// 求指数运算
export function toIndex(x, y) {
  // 假设： x = 3, y = 80
  // 保险起见，取 2 的52次方
  const e = 2 ** 52,
    // 利用换低公式求出 log 3 f = e；f = 32
    max = (Math.log(e) / Math.log(x)) >> 0,
    len = (y / max) >> 0,
    rem = y % max,
    arr = Array(len).fill(max);
  arr.push(rem);
  // arr = [32,32,16]
  const c = arr.shift();
  let total = x ** c;
  for (let item of arr) {
    for (let i = 0; i < item; i++) {
      total = toAdd(10, ...Array(+x).fill(total));
    }
  }
  return total;
}
//二进制转化10进制
export function binaryToDecimal(value) {
  value = `${value}`;
  let [int, float] = value.replace('-', '').split('.');
  const clone = () => ({
    text: [],
    value: '0'
  });
  if (int) {
    int = int.split('');
    let size = int.length - 1;
    int = int.reduce((total, item, i) => {
      return {
        text: [
          ...total.text,
          {
            item: item,
            size: size - i
          }
        ],
        //value: toAdd(10, total.value, item === '1' ? `${2 ** (size - i)}` : '0')
        value: toAdd(10, total.value, item === '1' ? `${toIndex(2, size - i)}` : '0')
      };
    }, clone());
  } else {
    int = clone();
  }
  if (float) {
    float = float.split('');
    float = float.reduce((total, item, i) => {
      return {
        text: [
          ...total.text,
          {
            item: item,
            size: ~i
          }
        ],
        value: toAdd(10, total.value, item === '1' ? `${2 ** ~i}` : '0')
      };
    }, clone());
  } else {
    float = clone();
  }
  return {
    truthSign: value.indexOf('-') > -1 ? '-' : '',
    text: int.text.concat(float.text),
    value: removeAfterZero(toAdd(10, int.value, float.value))
  };
}
//无精度损失加法计算, base参数为进制数
export function toAdd(base, ...arg) {
  //首先把参与加法计算的参数格式化
  arg = arg.map((t) => NumberToFilter(t));
  //取出最小的指数，因为其他数字要与此值为基准，就是以值对阶
  //取出最大的指数，因为如果参与运算的都是小数需要把0还回去
  const order = (() => {
    const orderList = arg.map((t) => t.order);
    return {
      min: Math.min(...orderList)
      //max: Math.max(...orderList)
    };
  })();
  let len = 0, //对完阶后的所有参数取长度最大的那一个，初始值为0
    tip = 0, //运算过程中向上进位，进几的值，默认值为0
    totalArr = []; //存储进完位后的对应位的实际值
  // 把所有要参与运算的值进行对阶
  let newArg = arg.map((t) => {
    let //大阶向小阶看齐；然后比如10进制：6702，转化成['2','0','7','6']
      value = (t.value + fill(t.order - order.min)).split('').reverse(),
      length = value.length;
    // 如果长度比现有的大，就覆盖
    if (length > len) {
      len = length;
    }
    return value;
  });
  // 开始运算
  for (let i = 0; i < len; i++) {
    // 把进位值tip与reduce配合进行（所有参数）同位运算
    let num = newArg.reduce((total, item) => {
      return total + (item[i] ? +item[i] : 0);
    }, tip);
    // 如果大于基数，说明要进位，比如10进制各位各参数的值为：8,7,9,7,
    // 31，tip就为3，各位实际值num为1
    if (num >= base) {
      tip = Math.floor(num / base);
      num = num % base;
    } else {
      tip = 0;
    }
    totalArr.unshift(num);
  }
  // 运算结束如果还有tip，说明最高位最后的tip，与要把tip转换成基数为base的值
  // 因为tip本身是10进制的，能想明白不。
  if (tip) {
    totalArr.unshift(base == 10 ? tip : toInt(tip));
  }
  //运算完成之后还要把阶数还回去
  if (order.min < 0) {
    let h = Math.abs(order.min) - totalArr.length;
    //如果最小阶的绝对值 - 数值长度<0,则可以直接插入小数点
    //否则，需要填补缺失的0
    if (h < 0) {
      totalArr.splice(order.min, 0, '.');
      totalArr = totalArr.join('');
    } else {
      totalArr = '0.' + ''.padEnd(h, 0) + totalArr.join('');
    }
    //去除末尾的 0, 然后再去除末尾的 .
    totalArr = totalArr.replace(/(?<!0)0+$/, '').replace(/\.$/, '');
  } else {
    totalArr = totalArr.join('');
  }
  return totalArr;
}
//判断是否为特殊值
export function isSpecialValue({ Sign, Exponent, Mantissa }) {
  for (let Special of SpecialValue.values()) {
    if (Sign === Special.Sign && Exponent === Special.Exponent && Mantissa === Special.Exponent) {
      return { ...Special };
    }
    return false;
  }
}
// 判断是否为数字类型
export function isNumber(value) {
  const reg = /(^-?[0-9]+((.([0-9]+(e\+|e\-))?[0-9]+)|((e\+|e\-)[0-9]+))?)$/;
  return reg.test(value);
}
//IEEE754转10进制和2进制
export function ieee754ToDecimal({ Sign, Exponent, Mantissa }) {
  if (Exponent.length !== 11) {
    return console.error('指数不是11位!!');
  }
  if (Mantissa.length !== 52) {
    return console.error('尾数不是52位！！');
  }
  let truthSign = Sign === '0' ? '' : '-';
  let BinaryTruthValue, DecimalTruthValue;
  Exponent = binaryToDecimal(Exponent).value - 1023;
  //补上隐藏的1.
  //但是，当指数为全0，尾数部位全0时，隐藏位为0.
  if (Exponent <= -1023 && +Mantissa != 0) {
    Mantissa = Mantissa.split('');
  } else {
    Mantissa = (1 + Mantissa).split('');
  }
  if (Exponent >= 0) {
    //得到二进制真值
    if (Exponent > 52) {
      BinaryTruthValue = Mantissa.join('') + fill(Exponent - 52);
    } else {
      Mantissa.splice(Exponent + 1, 0, '.');
      BinaryTruthValue = Mantissa.join('');
    }
  } else {
    //得到二进制真值
    BinaryTruthValue = `0.${fill(~Exponent)}` + Mantissa.join('');
  }
  //得到十进制真值
  DecimalTruthValue = binaryToDecimal(truthSign + BinaryTruthValue);
  return { BinaryTruthValue, DecimalTruthValue };
}
//舍入函数
// Exponent, Mantissa, Round 是必须填写的
export function toRound({ Sign, Exponent, Mantissa, Round }) {
  const roundValue = { Sign, Exponent, Mantissa };
  //如果舍入位第一位为1，后面也存在1，那么符合进1条件
  const v1 = Round[0] == 1 && Round.match(/1/g).length > 1;
  //如果舍入位第一位为1，尾数最后一位为1，那么符合进1条件
  const v2 = Round[0] == 1 && Mantissa[51] == 1;
  if (v1 || v2) {
    //获得进位后的尾数
    let tip = toAdd(2, 1 + Mantissa, 1);
    //如果尾数 > 53 说明进位了1
    if (tip.length > 53) {
      roundValue.Mantissa = tip.substr(1, 52);
      roundValue.Exponent = toAdd(2, Exponent, 1);
      //查看舍入后的值是否是特殊值，比如溢出什么的
      let Special = isSpecialValue(roundValue);
      if (Special) {
        return { ...Special.roundValue };
      }
    } else {
      //若果没有进位，重新赋值尾数就可以了
      roundValue.Mantissa = tip.substr(1, 52);
    }
  }
  let before = ieee754ToDecimal({
    Sign,
    Exponent: roundValue.Exponent,
    Mantissa: roundValue.Mantissa
  });
  roundValue.DecimalTruthValue = before.DecimalTruthValue;
  roundValue.BinaryTruthValue = removeAfterZero(before.BinaryTruthValue);
  return roundValue;
}
//转化成IEEE754格式总函数
export function toIEEE754(value) {
  value = `${value}`;
  if (SpecialValue.has(value)) return SpecialValue.get(value);
  if (!isNumber(value)) {
    return alert('必须是数字');
  }
  value = NumberToString(value);
  let Hide = '1.', //隐藏位的值
    Sign = '0', //机器码的符号
    truthSign = ''; //真值的符号
  if (value.indexOf('-') > -1) {
    Sign = '1';
    truthSign = '-';
  }
  debugger;
  //去掉真值的符号
  let DecimalTruthValue = (value = value.replace('-', ''));
  //得到二进制编码
  let Binary = toBinary(value);

  if (Binary.indexOf('1') < 0) {
    return SpecialValue.get(truthSign + '0');
  }

  //找第一个1，和第一个.得到指数真值
  let exponentTruthValue = Binary.indexOf('.') - Binary.indexOf('1');
  //如果是正数，就要-1
  if (exponentTruthValue > 0) {
    exponentTruthValue--;
  }
  //得到编码后的指数
  //这里就是为了处理极限小数做的兼容！！
  const zhi = exponentTruthValue + 1023;
  let Exponent = toInt(Math.max(zhi, 0));
  Exponent = fill(11 - Exponent.length) + Exponent;

  // 过滤完.的二进制
  let filterBinary = Binary.replace('.', '');

  //获取尾数和舍入位
  let truthValue;
  if (zhi > 0) {
    truthValue = filterBinary.substr(filterBinary.indexOf('1') + 1, 68);
  } else {
    Hide = '0.';
    //zhi = ~zhi + 2;
    truthValue = filterBinary.substr(1023, 52);
  }
  truthValue = truthValue + fill(68 - truthValue.length);
  //获取尾数
  let Mantissa = truthValue.substr(0, 52);

  //获得舍入的参考值
  let Round = truthValue.substr(52);

  //二进制的真值
  let BinaryTruthValue = (() => {
    //针对无限循环小数的真值，取第一个1和之后的52 + 16 + 1位
    let len = Binary.indexOf('1') + 52 + 16 + 1;
    return Binary.substr(0, len);
  })();
  //舍入后的值
  const roundValue = toRound({ Sign, Exponent, Mantissa, Round });
  roundValue.Hide = Hide;

  return {
    Sign,
    Exponent,
    Mantissa,
    Round,
    Hide,
    BinaryTruthValue: removeAfterZero(truthSign + BinaryTruthValue),
    DecimalTruthValue: removeAfterZero(truthSign + DecimalTruthValue),
    roundValue
  };
}
//sort 的中间件
export function sortMiddleware(key) {
  return (a, b) => {
    return b[key] - a[key];
  };
}
// 原码
export function toTrueCode({ value = '', bits = '32' }) {
  bits--;
  value = `${value}`;
  const Sign = value.indexOf('-') > -1 ? '1' : '0';
  value = value.replace('-', '');
  value = toInt(value);
  value = value.slice(~bits + 1);
  value = fill(bits - value.length) + value;
  return Sign + value;
}
// 反码
export function toOnesComplementCode(value = '') {
  const key = ['1', '0'];
  return value
    .split('')
    .map((item) => key[item])
    .join('');
}
// 补码
export function toComplementCode({ value = '', bits = '32' }) {
  value = toTrueCode({ value, bits });
  if (value[0] === '0') {
    return value;
  }
  value = value.replace(/^1/, '0');
  value = toOnesComplementCode(value);

  value = toAdd(2, value, 1);
  return value.slice(~bits + 1);
}
