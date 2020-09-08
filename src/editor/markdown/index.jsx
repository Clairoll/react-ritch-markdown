/*
 * @Autor: Clairoll
 * @Date: 2020-09-08 16:49:05
 * @LastEditTime: 2020-09-08 16:56:50
 * @Email: 1755033445@qq.com
 * @description: 
 */
import React, { useMemo, useRef } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

import ImagePlugin from "./plugin/imagePlugin";
import FilePlugin from "./plugin/filePlugin";
import LinkPlugin from "./plugin/linkPlugin";
// 导入编辑器的样式
import "react-markdown-editor-lite/lib/index.css";

// 自定义样式
import "./index.less";

//
MdEditor.use(ImagePlugin);
MdEditor.use(FilePlugin);
MdEditor.use(LinkPlugin);
const MarkDown = (props) => {
  const mdParser = new MarkdownIt().use(require('markdown-it-toc'));
  const MdEditorRef = useRef();
  // 完成！
  const handleEditorChange = ({ html, text }) => {
    props.getValue(text);
  };
  useMemo(() => {
    // 恢复到上一次的编辑
    if (props.lastValue && MdEditorRef.current) {
      MdEditorRef.current.setText(props.lastValue)
    }
  }, [props.lastValue]);

  return (
    <div>
      <MdEditor
        style={{ height: "500px" }}
        // onImageUpload={(flie) => Upload(flie)}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        ref={MdEditorRef}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};

export default MarkDown;
