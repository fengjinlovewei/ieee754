import React, { useEffect } from 'react'
import './index.css'
export default (props) => {
  const {className, type, children} = props
  const maps = (type) => {
    return {
      0: 'bit-s',
      1: 'bit-e',
      2: 'bit-m',
      3: 'bit-z1',
      4: 'bit-z2'
    }[type]
  }
  return (
    <span className={`bit-item ${maps(type)} ${className}`}>{children}</span>
  )
}