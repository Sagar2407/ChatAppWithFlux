webpackJsonp([3,6],{

/***/ 440:
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

	var _stores = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Dashboard = function (_React$Component) {
	  (0, _inherits3.default)(Dashboard, _React$Component);

	  function Dashboard() {
	    (0, _classCallCheck3.default)(this, Dashboard);
	    return (0, _possibleConstructorReturn3.default)(this, (Dashboard.__proto__ || (0, _getPrototypeOf2.default)(Dashboard)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Dashboard, [{
	    key: 'render',
	    value: function render() {
	      var sessionUser = _stores.SessionStore.getSessionUser();
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h1',
	          null,
	          'This would be user\'s dashboard'
	        ),
	        _react2.default.createElement(
	          'span',
	          null,
	          ' Welcome! ',
	          sessionUser.firstName + ' ' + sessionUser.lastName
	        )
	      );
	    }
	  }]);
	  return Dashboard;
	}(_react2.default.Component);

	Dashboard.contextTypes = {
	  router: _react2.default.PropTypes.object
	};


	module.exports = Dashboard;

/***/ }

});