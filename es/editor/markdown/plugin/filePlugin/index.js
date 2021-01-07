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
 * @Date: 2020-08-27 16:51:19
 * @LastEditTime: 2020-12-23 14:07:05
 * @Email: 1755033445@qq.com
 * @description: 基于react-markdown-editor-lite 的文件上传组件
 */
import React from "react";
import { PluginComponent } from "react-markdown-editor-lite";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

var Counter = /*#__PURE__*/function (_PluginComponent) {
  _inherits(Counter, _PluginComponent);

  var _super = _createSuper(Counter);

  function Counter() {
    var _this;

    _classCallCheck(this, Counter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.uploadChange = function (info) {
      if (info.file.status === "done") {
        // 插入Markdown
        var str = "[".concat(info.file.response.data.file_name, "](").concat(info.file.response.data.url, ")");

        _this.editor.insertText(str);
      } else if (info.file.status === "error") {
        message.error("图片上传失败");
      }
    };

    return _this;
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("span", {
        className: "button button-type-counter",
        title: "\u63D2\u5165\u6587\u4EF6"
      }, /*#__PURE__*/React.createElement(Upload, {
        action: "/api/site/annex",
        onChange: function onChange(info) {
          return _this2.uploadChange(info);
        },
        name: "0"
      }, /*#__PURE__*/React.createElement(UploadOutlined, null)));
    }
  }]);

  return Counter;
}(PluginComponent);

Counter.pluginName = "file-upload";
Counter.align = "left";
export default Counter;