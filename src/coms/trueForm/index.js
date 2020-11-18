import React, { useEffect } from 'react'
import Bit from '@/coms/bit'
import { Divider } from 'antd'

export default (props) => {
  let { data } = props
  const getRoundClass = (i) => {
    return i === 0 ? '0' : '2'
  }
  return (
    <div>
      {
        data.map((item, i) => {
          return (
            <Bit key={item} type={getRoundClass(i)}>{item}</Bit>
          )
        })
      }
    </div>
  )
}