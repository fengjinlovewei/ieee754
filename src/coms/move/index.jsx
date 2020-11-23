import React from 'react';

import Style from './index.module.scss';

export default (props) => {
  const { callback, move, children, className } = props;
  let start = 0;
  const Events = {
    mouseup() {
      Object.keys(Events).forEach((event) => {
        window.removeEventListener(event, Events[event], false);
      });
    },
    mousemove(e) {
      callback(((e.pageX - start) / 10) >> 0);
    }
  };
  const onMouseDown = (e) => {
    if (!move) return;
    start = e.pageX;
    Object.keys(Events).forEach((event) => {
      window.addEventListener(event, Events[event], false);
    });
  };
  return (
    <span className={`${Style['move-box']} ${className}`} onMouseDown={onMouseDown}>
      {children}
    </span>
  );
};
