import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import App from '../App';
import DecimalToBinary from '@/pages/decimalToBinary';
import MachineCode from '@/pages/machineCode';
import DecimalToIEEE from '@/pages/decimalToIEEE';
import IEEEAdd from '@/pages/IEEEAdd';
import IEEEToDecimal from '@/pages/IEEEToDecimal';
import IEEEdoc from '@/pages/IEEEdoc';

export const routerList = [
  {
    path: '/decimalToBinary',
    title: '10进制转2进制',
    component: DecimalToBinary,
    cache: true
  },
  {
    path: '/machineCode',
    title: '原码 & 补码',
    component: MachineCode,
    cache: true
  },
  {
    path: '/DecimalToIEEE',
    title: '10进制转IEEE754',
    component: DecimalToIEEE,
    cache: true
  },
  {
    path: '/IEEEAdd',
    title: 'IEEE754加法运算',
    component: IEEEAdd,
    cache: true
  },
  {
    path: '/IEEEToDecimal',
    title: 'IEEE754转10进制',
    component: IEEEToDecimal,
    cache: true
  },
  {
    path: '/IEEEdoc',
    title: 'IEEE754-2008文档',
    component: IEEEdoc,
    cache: false
  }
];
export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <CacheSwitch>
            {routerList.map((item) => {
              const R = item.cache ? CacheRoute : Route;
              return <R path={item.path} key={item.path} component={item.component} />;
            })}
            <Redirect from="/*" to={routerList[0].path} />
          </CacheSwitch>
        </App>
      </Router>
    );
  }
}
