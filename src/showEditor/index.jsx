import React from "react";
import MarkdownIt from "markdown-it";

// 语法高亮插件
import hljs from "highlight.js";
// 流程图插件
import markdownItMermaid from "@liradb2000/markdown-it-mermaid";

import "./index.less";

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

class ShowEditors extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const { isRitch, value } = this.props;
    return (
      <div id="myEditors">
        {isRitch ? (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <div
            id="myMarkdown"
            dangerouslySetInnerHTML={{ __html: mdParser.render(value) }}
          />
        )}
      </div>
    );
  }
}

ShowEditors.defaultProps = {
  isRitch: false,
  value: null,
};
export default ShowEditors;
