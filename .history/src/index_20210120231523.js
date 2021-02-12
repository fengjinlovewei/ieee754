import React from 'react';
import ReactDOM from 'react-dom';
import './style/base.scss';
import './style/common.scss';
import Router from './router';
import { Provider } from 'react-redux';
import Store from './store';
import * as serviceWorker from './serviceWorker';

// Firefox和Chrome早期版本中带有前缀
var MutationObserver =
  window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
// 选择目标节点
var target = document.getElementsByTagName('body')[0];
// 创建观察者对象
var observer = new MutationObserver(function (mutations) {
  console.log(mutations);
  mutations.forEach(function (mutation) {
    console.log(mutation.type);
  });
});
// 配置观察选项:
var config = { childList: true };
// 传入目标节点和观察选项
observer.observe(target, config);
ReactDOM.render(
  <Provider store={Store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
