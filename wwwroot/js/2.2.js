webpackJsonp([2,6],{

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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

	var _reactBootstrap = __webpack_require__(29);

	var _ChatActions = __webpack_require__(125);

	var _ChatActions2 = _interopRequireDefault(_ChatActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChatUser = function (_Component) {
	  (0, _inherits3.default)(ChatUser, _Component);

	  function ChatUser() {
	    (0, _classCallCheck3.default)(this, ChatUser);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (ChatUser.__proto__ || (0, _getPrototypeOf2.default)(ChatUser)).call(this));

	    _this.state = {
	      message: ""
	    };
	    _this._handleOnChange = _this._handleOnChange.bind(_this);
	    _this._handleOnClick = _this._handleOnClick.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(ChatUser, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('input', { type: 'text', value: this.state.message,
	          onChange: this._handleOnChange }),
	        _react2.default.createElement(
	          _reactBootstrap.Button,
	          { onClick: this._handleOnClick },
	          'Submit Message'
	        )
	      );
	    }
	  }, {
	    key: '_handleOnChange',
	    value: function _handleOnChange(e) {
	      this.setState({ message: e.target.value });
	    }
	  }, {
	    key: '_handleOnClick',
	    value: function _handleOnClick() {
	      _ChatActions2.default.insertMessage({
	        userId: this.props.id, message: this.state.message
	      });
	      // this.mess.value=""
	      this.setState({ message: "" });
	    }
	  }]);
	  return ChatUser;
	}(_react.Component);

	exports.default = ChatUser;

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(15);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _altInstance = __webpack_require__(46);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	var _ChatActions = __webpack_require__(125);

	var _ChatActions2 = _interopRequireDefault(_ChatActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChatStore = function () {
	  function ChatStore() {
	    (0, _classCallCheck3.default)(this, ChatStore);

	    this.messages = [];
	    this.bindListeners({
	      insertMessage: _ChatActions2.default.INSERT_MESSAGE

	    });
	  }

	  (0, _createClass3.default)(ChatStore, [{
	    key: 'insertMessage',
	    value: function insertMessage(payload) {
	      if (!payload.error) {
	        console.log(payload);
	        this.messages.push({
	          id: payload.data.chat.userId,
	          message: payload.data.chat.message,
	          time: payload.data.chat.time
	        });
	      }
	    }
	  }]);
	  return ChatStore;
	}();

	exports.default = _altInstance2.default.createStore(ChatStore, 'ChatStore');

/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

	var _ChatUser = __webpack_require__(418);

	var _ChatUser2 = _interopRequireDefault(_ChatUser);

	var _ChatStore = __webpack_require__(432);

	var _ChatStore2 = _interopRequireDefault(_ChatStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Chat = function (_Component) {
	  (0, _inherits3.default)(Chat, _Component);

	  function Chat() {
	    (0, _classCallCheck3.default)(this, Chat);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Chat.__proto__ || (0, _getPrototypeOf2.default)(Chat)).call(this));

	    _this.state = {
	      messages: []
	    };
	    _this._handleChatStore = _this._handleChatStore.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(Chat, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _ChatStore2.default.listen(this._handleChatStore);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _ChatStore2.default.unlisten(this._handleChatStore);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_ChatUser2.default, { id: '1' }),
	        _react2.default.createElement(_ChatUser2.default, { id: '2' }),
	        this.state.messages && this.state.messages.map(function (message, idx) {
	          return _react2.default.createElement(
	            'li',
	            { key: idx },
	            message.message
	          );
	        })
	      );
	    }
	  }, {
	    key: '_handleChatStore',
	    value: function _handleChatStore(state) {
	      this.setState({ messages: state.messages });
	    }
	  }]);
	  return Chat;
	}(_react.Component);

	Chat.contextTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};


	module.exports = Chat;

/***/ }

});