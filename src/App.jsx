import React from 'react';
import { useHistory } from 'react-router-dom';
import { routerList } from './router';
import './App.scss';

import { Radio } from 'antd';

function App(props) {
  let { location, push } = useHistory();
  const page = location.pathname == '/' ? routerList[0].path : location.pathname;
  const change = (e) => {
    push(e.target.value);
  };
  return (
    <div className="App">
      <div className="center">
        <Radio.Group defaultValue={page} buttonStyle="solid" onChange={change}>
          {routerList.map((item) => (
            <Radio.Button value={item.path} key={item.path}>
              {item.title}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default App;
