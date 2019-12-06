import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import "./style/normalize.css";
import "./style/index.less";

/**
 * @param {object} config 总配置选项
 */
window.ChartView = function(el, config) {
  let dom = document.getElementById(el);
  ReactDOM.render(<App config={config} />, dom);
  return this;
};
