import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import App from '../App';
import Page1 from '@/pages/page1';
import Page2 from '@/pages/page2';
import Page3 from '@/pages/page3';
import Page4 from '@/pages/page4';

export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <CacheSwitch>
            <CacheRoute path="/page1" component={Page1} />
            <CacheRoute path="/Page2" component={Page2} />
            <CacheRoute path="/Page3" component={Page3} />
            <CacheRoute path="/Page4" component={Page4} />
            <Redirect from="/*" to="/page1" />
          </CacheSwitch>
        </App>
      </Router>
    );
  }
}
