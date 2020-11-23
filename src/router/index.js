import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import App from '../App';
import DecimalToBinary from '@/pages/decimalToBinary';
import MachineCode from '@/pages/machineCode';
import DecimalToIEEE from '@/pages/decimalToIEEE';
import IEEEadd from '@/pages/IEEEadd';
import IEEEToDecimal from '@/pages/IEEEToDecimal';

export const routerList = [
  {
    path: '/decimalToBinary',
    title: '10进制转2进制',
    component: DecimalToBinary
  },
  {
    path: '/machineCode',
    title: '原码 & 补码',
    component: MachineCode
  },
  {
    path: '/DecimalToIEEE',
    title: '10进制转IEEE754',
    component: DecimalToIEEE
  },
  {
    path: '/IEEEAdd',
    title: 'IEEE754加法运算',
    component: IEEEadd
  },
  {
    path: '/IEEEToDecimal',
    title: 'IEEE754转10进制',
    component: IEEEToDecimal
  }
];
export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <CacheSwitch>
            {routerList.map((item) => (
              <CacheRoute path={item.path} key={item.path} component={item.component} />
            ))}
            <Redirect from="/*" to={routerList[0].path} />
          </CacheSwitch>
        </App>
      </Router>
    );
  }
}
