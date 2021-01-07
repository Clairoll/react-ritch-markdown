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
 * @Date: 2020-08-25 15:17:35
 * @LastEditTime: 2021-01-06 16:32:46
 * @Email: 1755033445@qq.com
 * @description: 富文本编辑器
 */
import React from "react";
import { Upload, message } from "antd";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { FolderAddOutlined, PictureOutlined } from "@ant-design/icons";
import Axios from "axios";
import Table from "braft-extensions/dist/table";
import "braft-editor/dist/index.css";
import "braft-extensions/dist/table.css";
import "./index.less";
var options = {
  withDropdown: true,
  // 插入表格前是否弹出下拉菜单
  columnResizable: true,
  // 是否允许拖动调整列宽，默认false
  exportAttrString: 'border="1" style="border-collapse: collapse"' // 指定输出HTML时附加到table标签上的属性字符串

};
BraftEditor.use(Table(options));

var RichTexts = /*#__PURE__*/function (_React$Component) {
  _inherits(RichTexts, _React$Component);

  var _super = _createSuper(RichTexts);

  function RichTexts(props) {
    var _this;

    _classCallCheck(this, RichTexts);

    _this = _super.call(this, props);

    _this.uploadImageChange = function (info, editorState) {
      if (info.file.status === "done") {
        // 富文本图片上传成功，将图片地址加入富文本内容
        var data = ContentUtils.insertMedias(editorState, [{
          type: "IMAGE",
          url: info.file.response.data.url
        }]);

        _this.setState({
          editorState: data
        }); // 回调给父组件


        _this.props.getValue(data.toHTML());
      } else if (info.file.status === "error") {
        message.error("图片上传失败");
      }
    };

    _this.uploadFileChange = function (info, editorState) {
      if (info.file.status === "done") {
        // 富文本文件上传成功，将图片地址加入富文本内容
        var data = ContentUtils.insertHTML(editorState, "<a target=\"_blank\" href=\"".concat(info.file.response.data.url, "\">").concat(info.file.response.data.file_name, "</a>"));

        _this.setState({
          editorState: data
        }); // 回调给父组件


        _this.props.getValue(data.toHTML());
      } else if (info.file.status === "error") {
        message.error("文件上传失败");
      }
    };

    _this.onChange = function (editorState) {
      _this.setState({
        editorState: editorState
      }, _this.props.getValue(editorState.toHTML()));
    };

    _this.clearContent = function () {
      _this.setState({
        editorState: ContentUtils.clear(_this.state.editorState)
      });
    };

    _this.myUploadFn = function (param) {
      var obj = new FormData();
      obj.append("name", param.file.name);
      obj.append("0", param.file);
      Axios.post("/api/site/image", obj).then(function (res) {
        if (res.data && res.data.code === 0) {
          var data = res.data.data;
          param.success({
            url: data.url,
            meta: {
              id: data.id,
              title: data.name,
              alt: data.name
            }
          });
        }

        console.log(res);
      }).catch(function (err) {
        param.error({
          msg: "上传失败!"
        });
      });
    };

    _this.state = {
      editorState: BraftEditor.createEditorState(null),
      defaultValue: BraftEditor.createEditorState(null)
    };
    _this.extendControls = [{
      key: "antd-uploader",
      type: "component",
      component: /*#__PURE__*/React.createElement(Upload, {
        action: "/api/site/image",
        accept: "image/*",
        onChange: function onChange(info) {
          return _this.uploadImageChange(info, _this.state.editorState);
        },
        showUploadList: false,
        name: "0",
        data: {
          name: "0"
        }
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "control-item button upload-button",
        "data-title": "\u63D2\u5165\u56FE\u7247"
      }, /*#__PURE__*/React.createElement(PictureOutlined, null)))
    }, {
      key: "antd-directory",
      type: "component",
      component: /*#__PURE__*/React.createElement(Upload, {
        action: "/api/site/annex",
        onChange: function onChange(info) {
          return _this.uploadFileChange(info, _this.state.editorState);
        },
        name: "0",
        showUploadList: false
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "control-item button upload-button",
        "data-title": "\u4E0A\u4F20\u6587\u4EF6"
      }, /*#__PURE__*/React.createElement(FolderAddOutlined, null)))
    }];
    return _this;
  } //图片上传回调


  _createClass(RichTexts, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.defaultValue !== this.state.defaultValue) {
        this.setState({
          editorState: BraftEditor.createEditorState(prevProps.defaultValue),
          defaultValue: prevProps.defaultValue
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var editorState = this.state.editorState;
      return /*#__PURE__*/React.createElement("div", {
        id: "myRitch"
      }, /*#__PURE__*/React.createElement(BraftEditor, {
        value: editorState,
        onChange: this.onChange,
        media: {
          uploadFn: this.myUploadFn
        },
        id: "editor-id",
        extendControls: this.extendControls
      }));
    }
  }]);

  return RichTexts;
}(React.Component);

RichTexts.defaultProps = {
  getValue: function getValue(data) {
    return data;
  },
  defaultValue: ''
};
export default RichTexts;