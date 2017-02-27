webpackJsonp([4,6],{

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getPrototypeOf = __webpack_require__(19);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(15);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(4);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(3);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NotFoundComponent = function (_React$Component) {
	  (0, _inherits3.default)(NotFoundComponent, _React$Component);

	  function NotFoundComponent() {
	    (0, _classCallCheck3.default)(this, NotFoundComponent);
	    return (0, _possibleConstructorReturn3.default)(this, (NotFoundComponent.__proto__ || (0, _getPrototypeOf2.default)(NotFoundComponent)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(NotFoundComponent, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "col-sm-9 col-sm-offset-1 col-md-11 col-md-offset-1 main" },
	        _react2.default.createElement(
	          "h2",
	          null,
	          "The Route your are trying to access does not exists."
	        )
	      );
	    }
	  }]);
	  return NotFoundComponent;
	}(_react2.default.Component);

	module.exports = NotFoundComponent;

/***/ }

});