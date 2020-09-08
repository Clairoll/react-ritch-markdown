/*
 * @Autor: Clairoll
 * @Date: 2020-09-08 16:49:05
 * @LastEditTime: 2020-09-08 16:54:23
 * @Email: 1755033445@qq.com
 * @param {String} lastValue 上一次草稿的值
 * @param {String} defaultValue 默认值
 * @param {String} isRitch 显示哪个编辑器
 * @param {Function} getEditorValue 获取编辑器的值返回给父组件
 * @description: 
 */
import React, { useState } from "react";
import RichTexts from "./richText/index.jsx";
import MarkDown from "./markdown/index.jsx";
import { Button } from "antd";
import "./index.less";

const Editors = (props) => {
  const [isRitch, setIsRitch] = useState(true);
  const getValue = (value) => {
    console.log(value, "123");
    //  返回给父组件
    // props.change()
  };
  return (
    <div id="editors">
      <div className="changeButton">
        <Button onClick={() => setIsRitch(!isRitch)}>
          {isRitch ? "文本格式" : "MarkDown"}
        </Button>
      </div>
      {isRitch ? (
        <RichTexts getValue={getValue} defaultValue={props.defaultValue} lastValue={props.lastValue}/>
      ) : (
        <MarkDown getValue={getValue} defaultValue={props.defaultValue} lastValue={props.lastValue}/>
      )}
    </div>
  );
};

export default Editors;
