import React from 'react'
import { useHistory } from 'react-router-dom'
import './App.css'

import { Radio } from 'antd';

function App(props) {
  let { location, push } = useHistory();
  console.log(location)
  const page = location.pathname == '/' ? '/page1' : location.pathname
  const change = (e) => {
    console.log(e.target.value)
    push(e.target.value)
  }
  return (
    <div className='App'>
      <div className="center">
        <Radio.Group defaultValue={page} buttonStyle="solid" onChange={change}>
          <Radio.Button value="/page1">原码 & 补码</Radio.Button>
          <Radio.Button value="/page2">10进制转IEEE754</Radio.Button>
          <Radio.Button value="/page3">IEEE754加法运算</Radio.Button>
          <Radio.Button value="/page4">IEEE754转10进制</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default App
