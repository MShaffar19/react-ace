'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brace = require('brace');

var _brace2 = _interopRequireDefault(_brace);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ace$acequire = _brace2.default.acequire('ace/range');

var Range = _ace$acequire.Range;


var editorOptions = ['minLines', 'maxLines', 'readOnly', 'highlightActiveLine', 'tabSize', 'enableBasicAutocompletion', 'enableLiveAutocompletion', 'enableSnippets '];

var ReactAce = function (_Component) {
  _inherits(ReactAce, _Component);

  function ReactAce(props) {
    _classCallCheck(this, ReactAce);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactAce).call(this, props));

    ['onChange', 'onFocus', 'onBlur', 'onCopy', 'onPaste', 'onScroll', 'handleOptions'].forEach(function (method) {
      _this[method] = _this[method].bind(_this);
    });
    return _this;
  }

  _createClass(ReactAce, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props;
      var name = _props.name;
      var className = _props.className;
      var onBeforeLoad = _props.onBeforeLoad;
      var mode = _props.mode;
      var theme = _props.theme;
      var fontSize = _props.fontSize;
      var value = _props.value;
      var cursorStart = _props.cursorStart;
      var showGutter = _props.showGutter;
      var wrapEnabled = _props.wrapEnabled;
      var showPrintMargin = _props.showPrintMargin;
      var keyboardHandler = _props.keyboardHandler;
      var onLoad = _props.onLoad;
      var commands = _props.commands;
      var annotations = _props.annotations;
      var markers = _props.markers;


      this.editor = _brace2.default.edit(name);

      if (onBeforeLoad) {
        onBeforeLoad(_brace2.default);
      }

      var editorProps = Object.keys(this.props.editorProps);
      for (var i = 0; i < editorProps.length; i++) {
        this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
      }

      this.editor.getSession().setMode('ace/mode/' + mode);
      this.editor.setTheme('ace/theme/' + theme);
      this.editor.setFontSize(fontSize);
      this.editor.setValue(value, cursorStart);
      this.editor.renderer.setShowGutter(showGutter);
      this.editor.getSession().setUseWrapMode(wrapEnabled);
      this.editor.setShowPrintMargin(showPrintMargin);
      this.editor.on('focus', this.onFocus);
      this.editor.on('blur', this.onBlur);
      this.editor.on('copy', this.onCopy);
      this.editor.on('paste', this.onPaste);
      this.editor.on('change', this.onChange);
      this.editor.session.on('changeScrollTop', this.onScroll);
      this.handleOptions(this.props);
      this.editor.getSession().setAnnotations(annotations || []);
      this.handleMarkers(markers || []);

      // get a list of possible options to avoid 'misspelled option errors'
      var availableOptions = this.editor.$options;
      for (var _i = 0; _i < editorOptions.length; _i++) {
        var option = editorOptions[_i];
        if (availableOptions.hasOwnProperty(option)) {
          this.editor.setOption(option, this.props[option]);
        }
      }

      if (Array.isArray(commands)) {
        commands.forEach(function (command) {
          _this2.editor.commands.addCommand(command);
        });
      }

      if (keyboardHandler) {
        this.editor.setKeyboardHandler('ace/keyboard/' + keyboardHandler);
      }

      if (className) {
        this.refs.editor.className += ' ' + className;
      }

      if (onLoad) {
        onLoad(this.editor);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var oldProps = this.props;

      for (var i = 0; i < editorOptions.length; i++) {
        var option = editorOptions[i];
        if (nextProps[option] !== oldProps[option]) {
          this.editor.setOption(option, nextProps[option]);
        }
      }

      if (nextProps.className !== oldProps.className) {
        (function () {
          var appliedClasses = _this3.refs.editor.className;
          var appliedClassesArray = appliedClasses.trim().split(' ');
          var oldClassesArray = oldProps.className.trim().split(' ');
          oldClassesArray.forEach(function (oldClass) {
            var index = appliedClassesArray.indexOf(oldClass);
            appliedClassesArray.splice(index, 1);
          });
          _this3.refs.editor.className = ' ' + nextProps.className + ' ' + appliedClassesArray.join(' ');
        })();
      }

      if (nextProps.mode !== oldProps.mode) {
        this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
      }
      if (nextProps.theme !== oldProps.theme) {
        this.editor.setTheme('ace/theme/' + nextProps.theme);
      }
      if (nextProps.keyboardHandler !== oldProps.keyboardHandler) {
        if (nextProps.keyboardHandler) {
          this.editor.setKeyboardHandler('ace/keyboard/' + nextProps.keyboardHandler);
        } else {
          this.editor.setKeyboardHandler(null);
        }
      }
      if (nextProps.fontSize !== oldProps.fontSize) {
        this.editor.setFontSize(nextProps.fontSize);
      }
      if (nextProps.wrapEnabled !== oldProps.wrapEnabled) {
        this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled);
      }
      if (nextProps.showPrintMargin !== oldProps.showPrintMargin) {
        this.editor.setShowPrintMargin(nextProps.showPrintMargin);
      }
      if (nextProps.showGutter !== oldProps.showGutter) {
        this.editor.renderer.setShowGutter(nextProps.showGutter);
      }
      if (!(0, _lodash2.default)(nextProps.setOptions, oldProps.setOptions)) {
        this.handleOptions(nextProps);
      }
      if (!(0, _lodash2.default)(nextProps.annotations, oldProps.annotations)) {
        this.editor.getSession().setAnnotations(nextProps.annotations || []);
      }
      if (!(0, _lodash2.default)(nextProps.markers, oldProps.markers)) {
        this.handleMarkers(nextProps.markers || []);
      }
      if (this.editor && this.editor.getValue() !== nextProps.value) {
        // editor.setValue is a synchronous function call, change event is emitted before setValue return.
        this.silent = true;
        var pos = this.editor.session.selection.toJSON();
        this.editor.setValue(nextProps.value, nextProps.cursorStart);
        this.editor.session.selection.fromJSON(pos);
        this.silent = false;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.editor.destroy();
      this.editor = null;
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      if (this.props.onChange && !this.silent) {
        var value = this.editor.getValue();
        this.props.onChange(value);
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      if (this.props.onFocus) {
        this.props.onFocus();
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }
  }, {
    key: 'onCopy',
    value: function onCopy(text) {
      if (this.props.onCopy) {
        this.props.onCopy(text);
      }
    }
  }, {
    key: 'onPaste',
    value: function onPaste(text) {
      if (this.props.onPaste) {
        this.props.onPaste(text);
      }
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      if (this.props.onScroll) {
        this.props.onScroll(this.editor);
      }
    }
  }, {
    key: 'handleOptions',
    value: function handleOptions(props) {
      var setOptions = Object.keys(props.setOptions);
      for (var y = 0; y < setOptions.length; y++) {
        this.editor.setOption(setOptions[y], props.setOptions[setOptions[y]]);
      }
    }
  }, {
    key: 'handleMarkers',
    value: function handleMarkers(markers) {
      var _this4 = this;

      // remove foreground markers
      var currentMarkers = this.editor.getSession().getMarkers(true);
      for (var i in currentMarkers) {
        if (currentMarkers.hasOwnProperty(i)) {
          this.editor.getSession().removeMarker(currentMarkers[i].id);
        }
      }
      // remove background markers
      currentMarkers = this.editor.getSession().getMarkers(false);
      for (var _i2 in currentMarkers) {
        if (currentMarkers.hasOwnProperty(_i2)) {
          this.editor.getSession().removeMarker(currentMarkers[_i2].id);
        }
      }
      // add new markers
      markers.forEach(function (_ref) {
        var startRow = _ref.startRow;
        var startCol = _ref.startCol;
        var endRow = _ref.endRow;
        var endCol = _ref.endCol;
        var className = _ref.className;
        var type = _ref.type;
        var _ref$inFront = _ref.inFront;
        var inFront = _ref$inFront === undefined ? false : _ref$inFront;

        var range = new Range(startRow, startCol, endRow, endCol);
        _this4.editor.getSession().addMarker(range, className, type, inFront);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var name = _props2.name;
      var width = _props2.width;
      var height = _props2.height;

      var divStyle = { width: width, height: height };
      return _react2.default.createElement('div', { ref: 'editor',
        id: name,
        style: divStyle
      });
    }
  }]);

  return ReactAce;
}(_react.Component);

exports.default = ReactAce;


ReactAce.propTypes = {
  mode: _react.PropTypes.string,
  theme: _react.PropTypes.string,
  name: _react.PropTypes.string,
  className: _react.PropTypes.string,
  height: _react.PropTypes.string,
  width: _react.PropTypes.string,
  fontSize: _react.PropTypes.number,
  showGutter: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  onCopy: _react.PropTypes.func,
  onPaste: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onScroll: _react.PropTypes.func,
  value: _react.PropTypes.string,
  onLoad: _react.PropTypes.func,
  onBeforeLoad: _react.PropTypes.func,
  minLines: _react.PropTypes.number,
  maxLines: _react.PropTypes.number,
  readOnly: _react.PropTypes.bool,
  highlightActiveLine: _react.PropTypes.bool,
  tabSize: _react.PropTypes.number,
  showPrintMargin: _react.PropTypes.bool,
  cursorStart: _react.PropTypes.number,
  editorProps: _react.PropTypes.object,
  setOptions: _react.PropTypes.object,
  annotations: _react.PropTypes.array,
  markers: _react.PropTypes.array,
  keyboardHandler: _react.PropTypes.string,
  wrapEnabled: _react.PropTypes.bool,
  enableBasicAutocompletion: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array]),
  enableLiveAutocompletion: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array]),
  commands: _react.PropTypes.array
};

ReactAce.defaultProps = {
  name: 'brace-editor',
  mode: '',
  theme: '',
  height: '500px',
  width: '500px',
  value: '',
  fontSize: 12,
  showGutter: true,
  onChange: null,
  onPaste: null,
  onLoad: null,
  onScroll: null,
  minLines: null,
  maxLines: null,
  readOnly: false,
  highlightActiveLine: true,
  showPrintMargin: true,
  tabSize: 4,
  cursorStart: 1,
  editorProps: {},
  setOptions: {},
  wrapEnabled: false,
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false
};