import { BigDecimal } from 'bigdecimal'
export function NumberWithReg(s) {
  return [
    {
      val: s.match(/^(-?)(\d+)\.(\d+)e-(\d+)$/),
      f() {
        //["1.25e-21", "1", "25", "21"]
        let m = this.val
        return {
          sign: m[1],
          value: removeAfterZero(m[2] + m[3]),
          order: ~(+m[4] + m[3].length) + 1,
          other: m
        }
      }
    },
    {
      val: s.match(/^(-?)(\d+)\.(\d+)e\+(\d+)$/),
      f() {
        //["-", "1.25e+21", "1", "25", "21"]
        let m = this.val
        return {
          sign: m[1],
          value: removeAfterZero(m[2] + m[3]),
          order: m[4] - m[3].length,
          other: m
        }
      }
    },
    {
      val: s.match(/^(-?)(\d+)e-(\d+)$/),
      f() {
        //["-", "1e-21", "1", "21"]
        let m = this.val
        return {
          sign: m[1],
          value: removeAfterZero(m[2]),
          order: ~m[3] + 1,
          other: m
        }
      }
    },
    {
      val: s.match(/^(-?)(\d+)e\+(\d+)$/),
      f() {
        //["-", "1e+21", "1", "21"]
        let m = this.val
        return {
          sign: m[1],
          value: removeAfterZero(m[2]),
          order: +m[3],
          other: m
        }
      }
    },
    {
      val: s.match(/^(-?)(\d+)\.(\d+)$/),
      f() {
        //["-", "1.21", "1", "21"]
        let m = this.val
        return {
          sign: m[1],
          value: removeAfterZero(m[2] + m[3]),
          order: ~m[3].length + 1,
          other: m
        }
      }
    },
    {
      val: s.match(/^(-?)(\d+)$/),
      f() {
        //["-", "126"]
        let m = this.val
        return {
          sign: m[1],
          value: removeAfterZero(m[2]),
          order: 0,
          other: m
        }
      }
    }
  ]
}
//格式化数字
export function NumberToFilter(n) {
  const obj = NumberWithReg(`${n}`)
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].val) {
      return obj[i].f()
    }
  }
}
export function NumberToString(a){
  a = new BigDecimal(a)
  return a.toPlainString()
}
export function removeAfterZero(value){
  value = value.replace(/^0+(?=[^0])/, '')
  return value ? value : '0'
}
export function removeBeforeZero(value){
  value = value.replace(/(?<=[^0])0+$/, '')
  return value ? value : '0'
}
export default {
  //商和余数运算
  rem(a, b) {
    a = new BigDecimal(a)
    b = new BigDecimal(b)
    return a.divideAndRemainder(b).map(t => t.toPlainString())
  },
  
  //加法
  add(a, b){
    a = new BigDecimal(a)
    b = new BigDecimal(b)
    return a.add(b).toPlainString()
  },
  //减法
  sub(a, b){
    a = new BigDecimal(a)
    b = new BigDecimal(b)
    return a.subtract(b).toPlainString()
  },
  //乘法
  mul(a, b) {
    a = new BigDecimal(a)
    b = new BigDecimal(b)
    return a.multiply(b).toPlainString()
  },
  //除法
  div(a, b) {
    a = new BigDecimal(a)
    b = new BigDecimal(b)
    return a.divide(b).toPlainString()
  }
}