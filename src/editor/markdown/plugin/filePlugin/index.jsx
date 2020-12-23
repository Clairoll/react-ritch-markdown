/*
 * @Autor: Clairoll
 * @Date: 2020-08-27 16:51:19
 * @LastEditTime: 2020-12-23 14:07:05
 * @Email: 1755033445@qq.com
 * @description: 基于react-markdown-editor-lite 的文件上传组件
 */
import React from "react";
import { PluginComponent } from "react-markdown-editor-lite";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

class Counter extends PluginComponent {
  // 这里定义插件名称，注意不能重复
  static pluginName = "file-upload";
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = "left";
  //图片上传回调
  uploadChange = (info) => {
    if (info.file.status === "done") {
      // 插入Markdown
      let str = `[${info.file.response.data.file_name}](${info.file.response.data.url})`;
      this.editor.insertText(str);
    } else if (info.file.status === "error") {
      message.error("图片上传失败");
    }
  };

  render() {
    return (
      <span className="button button-type-counter" title="插入文件">
        <Upload
          action="/api/site/annex"
          onChange={(info) => this.uploadChange(info)}
          name="0"
        >
          <UploadOutlined />
        </Upload>
      </span>
    );
  }
}
export default Counter;
