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
 * @Date: 2020-09-08 16:49:05
 * @LastEditTime: 2021-01-07 14:50:36
 * @Email: 1755033445@qq.com
 * @description:
 */
import React from "react";
import RichTexts from "./richText";
import MarkDown from "./markdown";
import "./index.css";

var Editors = /*#__PURE__*/function (_React$Component) {
  _inherits(Editors, _React$Component);

  var _super = _createSuper(Editors);

  function Editors(props) {
    var _this;

    _classCallCheck(this, Editors);

    _this = _super.call(this, props);
    _this.refadd = React.createRef();

    _this.clearContent = function () {
      _this.refadd.current.clearContent();
    };

    _this.getValue = function (value) {
      _this.props.onChange(value);
    };

    return _this;
  }

  _createClass(Editors, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return /*#__PURE__*/React.createElement("div", {
        id: "editors"
      }, props.isRitch ? /*#__PURE__*/React.createElement(RichTexts, {
        ref: this.refadd,
        getValue: this.getValue,
        defaultValue: props.defaultValue
      }) : /*#__PURE__*/React.createElement(MarkDown, {
        ref: this.refadd,
        getValue: this.getValue,
        defaultValue: props.defaultValue
      }));
    }
  }]);

  return Editors;
}(React.Component);

Editors.defaultProps = {
  isRitch: false,
  defaultValue: "",
  onChange: function onChange() {}
};
export default Editors;