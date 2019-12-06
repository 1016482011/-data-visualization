import React, { PureComponent } from "react";
import style from "../style/index.less";

export default class Notice extends PureComponent {
  render() {
    const data = this.props.data;
    return (
      <ul className={style["notice-ul"]}>
        {data &&
          data.map((v, index) => {
            return (
              <li key={index}>
                <a>{v.text}</a>
              </li>
            );
          })}
      </ul>
    );
  }
}
