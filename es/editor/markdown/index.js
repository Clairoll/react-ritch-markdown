function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import Axios from "axios"; // 语法高亮插件

import hljs from "highlight.js"; // 流程图插件

import markdownItMermaid from "@liradb2000/markdown-it-mermaid";
import ImagePlugin from "./plugin/imagePlugin";
import FilePlugin from "./plugin/filePlugin";
import LinkPlugin from "./plugin/linkPlugin";
import InnerMenu from "./plugin/innerMenuPlugin"; // 导入编辑器的样式

import "react-markdown-editor-lite/lib/index.css"; // 自定义样式

import "./index.less"; //

MdEditor.use(ImagePlugin);
MdEditor.use(FilePlugin);
MdEditor.use(LinkPlugin);
MdEditor.use(InnerMenu);
var mdParser = new MarkdownIt({
  breaks: true,
  // 转换段落里的 '\n' 到 <br>。
  linkify: true,
  // 将类似 URL 的文本自动转换为链接。
  typographer: true,
  // 启用一些语言中立的替换 + 引号美化
  html: true,
  highlight: function highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ""; // 使用额外的默认转义
  }
}).use(require("markdown-it-toc")).use(markdownItMermaid);

var MarkDown = /*#__PURE__*/function (_React$Component) {
  _inherits(MarkDown, _React$Component);

  var _super = _createSuper(MarkDown);

  function MarkDown(props) {
    var _this;

    _classCallCheck(this, MarkDown);

    _this = _super.call(this, props);
    _this.MdEditorRef = React.createRef();

    _this.handleEditorChange = function (_ref) {
      var html = _ref.html,
          text = _ref.text;

      _this.props.getValue(text);
    };

    _this.clearContent = function () {
      if (_this.MdEditorRef.current) {
        _this.MdEditorRef.current.setText("");
      }
    };

    _this.renderHTML = function (value) {
      return mdParser.render(value);
    };

    _this.myUploadFn = function (file) {
      return new Promise(function (resolve) {
        var reader = new FileReader();

        reader.onload = function () {
          var obj = new FormData();
          obj.append("file", file);
          Axios.post("/api/site/markdown_image", obj).then(function (res) {
            var data = res.data;
            resolve(data.url);
          });
        };

        reader.readAsDataURL(file);
      });
    };

    _this.state = {
      defaultValue: null
    };
    return _this;
  }

  _createClass(MarkDown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.defaultValue !== this.state.defaultValue) {
        this.MdEditorRef.current.setText(prevProps.defaultValue);
        this.setState({
          defaultValue: prevProps.defaultValue
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MdEditor, {
        style: {
          height: "500px"
        },
        renderHTML: function renderHTML(text) {
          return _this2.renderHTML(text);
        },
        onChange: this.handleEditorChange,
        ref: this.MdEditorRef,
        onImageUpload: this.myUploadFn
      }));
    }
  }]);

  return MarkDown;
}(React.Component);

MarkDown.defaultProps = {
  getValue: function getValue(data) {
    return data;
  },
  defaultValue: ''
};
export default MarkDown;