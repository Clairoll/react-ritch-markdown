import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import Axios from "axios";

// 语法高亮插件
import hljs from "highlight.js";
// 流程图插件
import markdownItMermaid from "@liradb2000/markdown-it-mermaid";

import ImagePlugin from "./plugin/imagePlugin";
import FilePlugin from "./plugin/filePlugin";
import LinkPlugin from "./plugin/linkPlugin";
import InnerMenu from "./plugin/innerMenuPlugin";
// 导入编辑器的样式
import "react-markdown-editor-lite/lib/index.css";

// 自定义样式
import "./index.less";

//
MdEditor.use(ImagePlugin);
MdEditor.use(FilePlugin);
MdEditor.use(LinkPlugin);
MdEditor.use(InnerMenu);

const mdParser = new MarkdownIt({
  breaks: true, // 转换段落里的 '\n' 到 <br>。
  linkify: true, // 将类似 URL 的文本自动转换为链接。
  typographer: true, // 启用一些语言中立的替换 + 引号美化
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ""; // 使用额外的默认转义
  },
})
  .use(require("markdown-it-toc"))
  .use(markdownItMermaid);

class MarkDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: null,
    };
  }

  MdEditorRef = React.createRef();

  handleEditorChange = ({ html, text }) => {
    this.props.getValue(text);
  };

  clearContent = () => {
    if (this.MdEditorRef.current) {
      this.MdEditorRef.current.setText("");
    }
  };

  renderHTML = (value) => {
    return mdParser.render(value);
  };

  // 粘贴图片上传
  myUploadFn = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        let obj = new FormData();
        obj.append("file", file);
        Axios.post("/api/site/markdown_image", obj).then((res) => {
          let { data } = res;
          resolve(data.url);
        });
      };
      reader.readAsDataURL(file);
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.state.defaultValue) {
      this.MdEditorRef.current.setText(prevProps.defaultValue);
      this.setState({ defaultValue: prevProps.defaultValue });
    }
  }

  render() {
    return (
      <div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => this.renderHTML(text)}
          onChange={this.handleEditorChange}
          ref={this.MdEditorRef}
          onImageUpload={this.myUploadFn}
        />
      </div>
    );
  }
}

MarkDown.defaultProps = {
  getValue: (data) => {
    return data;
  },
  defaultValue:''
};
export default MarkDown;
