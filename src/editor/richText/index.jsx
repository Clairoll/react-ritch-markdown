/*
 * @Autor: Clairoll
 * @Date: 2020-08-25 15:17:35
 * @LastEditTime: 2020-09-08 16:53:32
 * @Email: 1755033445@qq.com
 * @description: 富文本编辑器
 */
import React, { useState, useMemo, useEffect } from "react";
import { Upload, message, Icon } from "antd";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { EditControl } from "./constant";
import Table from "braft-extensions/dist/table";
import "braft-editor/dist/index.css";
import "braft-extensions/dist/table.css";

import "./index.less";

const options = {
  // defaultColumns: 3, // 默认列数
  // defaultRows: 3, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: 'border="1" style="border-collapse: collapse"', // 指定输出HTML时附加到table标签上的属性字符串
};

const RichTexts = (props) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );

  //图片上传回调
  const uploadImageChange = (info, editorState) => {
    if (info.file.status === "done") {
      // 富文本图片上传成功，将图片地址加入富文本内容
      let data = ContentUtils.insertMedias(editorState, [
        { type: "IMAGE", url: info.file.response.url },
      ]);
      setEditorState(data);
      // 回调给父组件
      props.getValue(data.toHTML());
    } else if (info.file.status === "error") {
      message.error("图片上传失败");
    }
  };

  //文件上传回调
  const uploadFileChange = (info, editorState) => {
    if (info.file.status === "done") {
      // 富文本文件上传成功，将图片地址加入富文本内容
      let data = ContentUtils.insertHTML(
        editorState,
        `<a target="_blank" href="${info.file.response.data.url}">${info.file.response.data.file_name}</a>`
      );

      setEditorState(data);
      // 回调给父组件
      props.getValue(data.toHTML());
    } else if (info.file.status === "error") {
      message.error("文件上传失败");
    }
  };

  const extendControls = [
    {
      key: "antd-uploader",
      type: "component",
      component: (
        <Upload
          action="/api/site/image"
          accept="image/*"
          onChange={(info) => uploadImageChange(info, editorState)}
          showUploadList={false}
          name="0"
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button
            type="button"
            className="control-item button upload-button"
            data-title="插入图片"
          >
            <Icon type="picture" />
          </button>
        </Upload>
      ),
    },
    {
      key: "antd-directory",
      type: "component",
      component: (
        <Upload
          action="/api/site/annex"
          onChange={(info) => uploadFileChange(info, editorState)}
          name="0"
          showUploadList={false}
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button
            type="button"
            className="control-item button upload-button"
            data-title="上传文件"
          >
            <Icon type="folder-add" />
          </button>
        </Upload>
      ),
    },
  ];

  useMemo(() => {
    //  恢复到上次草稿
    if (props.lastValue) {
      setEditorState(BraftEditor.createEditorState(props.lastValue));
    }
    if (props.defaultValue) {
      setEditorState(BraftEditor.createEditorState(props.defaultValue));
    }
  }, [props.lastValue, props.defaultValue]);

  useEffect(() => {
    BraftEditor.use(Table(options));
  }, []);
  return (
    <div id="myRitch">
      <BraftEditor
        value={editorState}
        controls={[...EditControl, Table]}
        onChange={(editorState) => {
          setEditorState(editorState);
          props.getValue(editorState.toHTML());
        }}
        id="editor-id"
        extendControls={extendControls}
      />
    </div>
  );
};
export default RichTexts;
