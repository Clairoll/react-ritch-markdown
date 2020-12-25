/*
 * @Autor: Clairoll
 * @Date: 2020-09-08 16:49:05
 * @LastEditTime: 2020-12-25 15:16:36
 * @Email: 1755033445@qq.com
 * @param {String} lastValue 上一次草稿的值
 * @param {String} defaultValue 默认值
 * @param {String} isRitch 显示哪个编辑器
 * @param {Function} getEditorValue 获取编辑器的值返回给父组件
 * @description:
 */
import React from "react";
import RichTexts from "./richText/index.jsx";
import MarkDown from "./markdown/index.jsx";
import { Button } from "antd";
import "./index.css";

class Editors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRitch: true,
      isButton: false,
    };
  }
  refadd = React.createRef();

  // 清空编辑器
  clearContent = () => {
    this.refadd.current.clearContent();
  };

  // 获取编辑器内容
  getValue = (value) => {
    this.props.getEditorValue(value);
  };

  render() {
    const { props, state } = this;
    const { isRitch, isButton } = state;
    return (
      <div id="editors">
        {(isButton || props.isButton) && (
          <div className="changeButton">
            <Button onClick={() => this.setState({ isRitch: !isRitch })}>
              {isRitch ? "文本格式" : "MarkDown"}
            </Button>
          </div>
        )}
        {isRitch ? (
          <RichTexts
            ref={this.refadd}
            getValue={this.getValue}
            defaultValue={props.defaultValue}
            lastValue={props.lastValue}
          />
        ) : (
          <MarkDown
            ref={this.refadd}
            getValue={this.getValue}
            defaultValue={props.defaultValue}
            lastValue={props.lastValue}
          />
        )}
      </div>
    );
  }
}

export default Editors;
