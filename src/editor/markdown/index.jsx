import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

import ImagePlugin from "./plugin/imagePlugin";
import FilePlugin from './plugin/filePlugin'
import LinkPlugin from './plugin/linkPlugin'
// 导入编辑器的样式
import "react-markdown-editor-lite/lib/index.css";

// 自定义样式
import "./index.less";

//
MdEditor.use(ImagePlugin);
MdEditor.use(FilePlugin);
MdEditor.use(LinkPlugin);
const MarkDown = (props) => {
  const mdParser = new MarkdownIt();
  // 完成！
  const handleEditorChange = ({ html, text }) => {
    props.getValue(html)
    // console.log("handleEditorChange", html, text);
  };

  return (
    <div>
      <MdEditor
        style={{ height: "500px" }}
        // onImageUpload={(flie) => Upload(flie)}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MarkDown;
