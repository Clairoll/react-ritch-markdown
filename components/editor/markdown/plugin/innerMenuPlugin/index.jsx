/*
 * @Autor: Clairoll
 * @Date: 2020-08-27 14:58:04
 * @LastEditTime: 2020-12-25 14:43:57
 * @Email: 1755033445@qq.com
 * @description: 基于react-markdown-editor-lite 的链接组件
 */
import React from "react";
import { PluginComponent } from "react-markdown-editor-lite";
import { MenuOutlined } from "@ant-design/icons";

class InnerMenu extends PluginComponent {
  // 这里定义插件名称，注意不能重复
  static pluginName = "menu-plugin";
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = "left";

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    let str = `@[TOC](目录名称)`;
    this.editor.insertText(str);
  };

  render() {
    return (
      <>
        <span
          className="button button-type-counter"
          title="插入目录"
          onClick={() => this.handleClick()}
        >
          <MenuOutlined />
        </span>
      </>
    );
  }
}
export default InnerMenu;
