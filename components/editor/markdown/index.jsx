import React, { useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import Axios from 'axios'

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
const MarkDown = forwardRef((props, ref) => {
  const mdParser = new MarkdownIt({
    breaks: true, // 转换段落里的 '\n' 到 <br>。
    linkify: true, // 将类似 URL 的文本自动转换为链接。
    typographer: true, // 启用一些语言中立的替换 + 引号美化
    html: true,
    highlight: function(str, lang) {
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
  const MdEditorRef = useRef();
  // 完成！
  const handleEditorChange = ({ html, text }) => {
    props.getValue(text);
  };
  useMemo(() => {
    // 恢复到上一次的编辑
    if ((props.lastValue || props.lastValue == "") && MdEditorRef.current) {
      MdEditorRef.current.setText(props.lastValue);
    }

    if (
      (props.defaultValue || props.defaultValue == "") &&
      MdEditorRef.current
    ) {
      MdEditorRef.current.setText(props.defaultValue);
    }
  }, [
    props.lastValue || props.lastValue == "",
    props.defaultValue || props.defaultValue == "",
  ]);

  // 清空内容
  useImperativeHandle(ref, () => ({
    clearContent: () => {
      if (MdEditorRef.current) {
        MdEditorRef.current.setText(props.lastValue);
      }
    },
  }));

  const renderHTML = (value) => {
    return mdParser.render(value);
  };

  // 粘贴图片上传
  const myUploadFn = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        let obj = new FormData();
        obj.append("file", file);
        Axios.post("/api/site/markdown_image", obj)
          .then((res) => {
            let { data } = res;
            resolve(data.url);
          })
      };
      reader.readAsDataURL(file);
    });
};

  return (
    <div>
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => renderHTML(text)}
        onChange={handleEditorChange}
        ref={MdEditorRef}
        defaultValue={props.defaultValue}
        onImageUpload={myUploadFn}
      />
    </div>
  );
});

export default MarkDown;
