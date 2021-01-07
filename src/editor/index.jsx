/*
 * @Autor: Clairoll
 * @Date: 2020-09-08 16:49:05
 * @LastEditTime: 2021-01-07 14:50:36
 * @Email: 1755033445@qq.com
 * @description:
 */
import React from "react";
import RichTexts from "./richText";
import MarkDown from "./markdown";
import "./index.css";

class Editors extends React.Component {
  constructor(props) {
    super(props);
  }
  refadd = React.createRef();

  // 清空编辑器
  clearContent = () => {
    this.refadd.current.clearContent();
  };

  // 获取编辑器内容
  getValue = (value) => {
    this.props.onChange(value);
  };

  render() {
    const { props } = this;
    return (
      <div id="editors">
        {props.isRitch ? (
          <RichTexts
            ref={this.refadd}
            getValue={this.getValue}
            defaultValue={props.defaultValue}
          />
        ) : (
          <MarkDown
            ref={this.refadd}
            getValue={this.getValue}
            defaultValue={props.defaultValue}
          />
        )}
      </div>
    );
  }
}

Editors.defaultProps = {
  isRitch: false,
  defaultValue: "",
  onChange: () => {},
};

export default Editors;
