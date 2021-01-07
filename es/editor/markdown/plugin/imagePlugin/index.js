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

/*
 * @Autor: Clairoll
 * @Date: 2020-08-27 14:58:04
 * @LastEditTime: 2020-12-23 15:11:10
 * @Email: 1755033445@qq.com
 * @description: 基于react-markdown-editor-lite 的图片上传组件
 */
import React from "react";
import { PluginComponent } from "react-markdown-editor-lite";
import { UploadOutlined, PictureOutlined } from "@ant-design/icons";
import { Upload, Modal, message, Button, Form, Input, Row, Col } from "antd";
import "./index.less";

var Counter = /*#__PURE__*/function (_PluginComponent) {
  _inherits(Counter, _PluginComponent);

  var _super = _createSuper(Counter);

  // 这里定义插件名称，注意不能重复
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  function Counter(props) {
    var _this;

    _classCallCheck(this, Counter);

    _this = _super.call(this, props);
    _this.formRef = React.createRef();

    _this.handleClick = function () {
      // 更新一下自身的state
      _this.setState({
        isShowModel: true
      });
    };

    _this.handleCancel = function () {
      _this.setState({
        isShowModel: false
      });
    };

    _this.uploadChange = function (info) {
      if (info.file.status === "done") {
        _this.formRef.current.setFieldsValue({
          url: info.file.response.url
        });
      } else if (info.file.status === "error") {
        message.error("图片上传失败");
      }
    };

    _this.handleSubmit = function (values) {
      var str;

      if (values.link) {
        str = "[![".concat(values.desc, "](").concat(values.url, " \"").concat(values.desc, "\")](").concat(values.link, " \"").concat(values.desc, "\")");
      } else {
        str = "![".concat(values.desc, "](").concat(values.url, " \"").concat(values.desc, "\")");
      }

      _this.editor.insertText(str);

      _this.setState({
        isShowModel: false
      });

      _this.formRef.current.resetFields();
    };

    _this.state = {
      isShowModel: false
    };
    return _this;
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "button button-type-counter",
        title: "\u63D2\u5165\u56FE\u7247",
        onClick: function onClick() {
          return _this2.handleClick();
        }
      }, /*#__PURE__*/React.createElement(PictureOutlined, null)), /*#__PURE__*/React.createElement(Modal, {
        title: "\u6DFB\u52A0\u56FE\u7247",
        visible: this.state.isShowModel,
        onCancel: function onCancel() {
          return _this2.handleCancel();
        },
        footer: null
      }, /*#__PURE__*/React.createElement(Form, {
        ref: this.formRef,
        onFinish: this.handleSubmit,
        className: "login-form"
      }, /*#__PURE__*/React.createElement(Form.Item, {
        label: "\u56FE\u7247\u5730\u5740",
        name: "url",
        rules: [{
          required: true,
          message: "请输入图片地址!"
        }]
      }, /*#__PURE__*/React.createElement(Row, {
        gutter: 20
      }, /*#__PURE__*/React.createElement(Col, {
        span: 16
      }, /*#__PURE__*/React.createElement(Input, {
        size: "large",
        placeholder: "\u8BF7\u8F93\u5165\u56FE\u7247\u5730\u5740"
      })), /*#__PURE__*/React.createElement(Col, {
        span: 8
      }, /*#__PURE__*/React.createElement(Upload, {
        action: "/api/site/markdown_image",
        accept: "image/*",
        onChange: function onChange(info) {
          return _this2.uploadChange(info);
        },
        showUploadList: false
      }, /*#__PURE__*/React.createElement(Button, {
        size: "large"
      }, /*#__PURE__*/React.createElement(UploadOutlined, null), " \u672C\u5730\u4E0A\u4F20"))))), /*#__PURE__*/React.createElement(Form.Item, {
        label: "\u56FE\u7247\u63CF\u8FF0",
        name: "desc"
      }, /*#__PURE__*/React.createElement(Input, {
        size: "large",
        placeholder: "\u8BF7\u8F93\u5165\u56FE\u7247\u63CF\u8FF0"
      })), /*#__PURE__*/React.createElement(Form.Item, {
        label: "\u56FE\u7247\u94FE\u63A5",
        name: "link"
      }, /*#__PURE__*/React.createElement(Input, {
        size: "large",
        placeholder: "\u8BF7\u8F93\u5165\u56FE\u7247\u94FE\u63A5"
      })), /*#__PURE__*/React.createElement(Form.Item, null, /*#__PURE__*/React.createElement("div", {
        className: "footer"
      }, /*#__PURE__*/React.createElement(Button, {
        size: "large",
        htmlType: "submit"
      }, "\u786E\u5B9A"), /*#__PURE__*/React.createElement(Button, {
        size: "large",
        onClick: function onClick() {
          return _this2.handleCancel();
        }
      }, "\u53D6\u6D88"))))));
    }
  }]);

  return Counter;
}(PluginComponent);

Counter.pluginName = "image-upload";
Counter.align = "left";
export default Counter;