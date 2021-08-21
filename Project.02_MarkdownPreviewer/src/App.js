var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable import/first */

import './App.css';
import React from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import themeStyle from 'react-syntax-highlighter/dist/esm/styles/prism/twilight';
import remarkGfm from 'remark-gfm';
import remarkBreaks from "remark-breaks";

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            mainHeight: 0,
            columnHeight: 0,
            textAreaHeight: 0
        };
        _this.updateDimensions = _this.updateDimensions.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'updateDimensions',
        value: function updateDimensions() {
            var screenHeight = document.getElementById("app-wrapper").clientHeight;
            var headerHeight = document.getElementById("header").clientHeight;
            var footerHeight = document.getElementById("footer").clientHeight;
            var textAreaTopHeight = document.getElementById("editor-top").clientHeight;
            var containerHeight = screenHeight - headerHeight - footerHeight;
            var textAreaHeight = screenHeight - headerHeight - textAreaTopHeight - footerHeight;
            this.setState({
                mainHeight: headerHeight,
                columnHeight: containerHeight,
                textAreaHeight: textAreaHeight
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                _this2.updateDimensions();
                window.addEventListener('resize', _this2.updateDimensions);
            }, 0);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: "app-wrapper" },
                React.createElement(Header, null),
                React.createElement(Main, { mainHeight: this.state.mainHeight,
                    columnHeight: this.state.columnHeight,
                    textAreaHeight: this.state.textAreaHeight
                }),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'header',
                { id: "header" },
                React.createElement(
                    'h1',
                    { id: "header-title" },
                    ' React Markdown Previewer '
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var placeholder = '# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here\'s some other cool stuff:\n\nHere\'s some code, `<div> </div>`, between 2 backticks.\n\n```javascript\n// this is multi-line code:\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == \'```\' && lastLine == \'```\') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere\'s also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let\'s not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)';

var Main = function (_React$Component3) {
    _inherits(Main, _React$Component3);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this4 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this4.state = {
            markdown: placeholder
        };
        _this4.updatePreview = _this4.updatePreview.bind(_this4);
        return _this4;
    }

    _createClass(Main, [{
        key: 'updatePreview',
        value: function updatePreview(event) {
            this.setState({
                markdown: event.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'main',
                { id: "main", style: { top: this.props.mainHeight } },
                React.createElement(
                    'div',
                    { id: "editor-div", className: "column", style: { height: this.props.columnHeight } },
                    React.createElement(
                        'div',
                        { id: "editor-top" },
                        React.createElement(
                            'i',
                            { id: "editor-icon", className: "fas fa-edit" },
                            ' '
                        ),
                        React.createElement(
                            'p',
                            { id: "editor-text" },
                            ' Markdown '
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: "editor-wrapper" },
                        React.createElement(
                            'textarea',
                            { id: "editor", value: this.state.markdown,
                                onChange: this.updatePreview, style: { height: this.props.textAreaHeight } },
                            ' '
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: "preview-div", className: "column", style: { height: this.props.columnHeight } },
                    React.createElement(
                        'div',
                        { id: "preview-top" },
                        React.createElement(
                            'i',
                            { id: "preview-icon", className: 'fas fa-eye' },
                            ' '
                        ),
                        React.createElement(
                            'p',
                            { id: "preview-text" },
                            ' Preview '
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: "preview", style: { height: this.props.textAreaHeight } },
                        React.createElement(ReactMarkdown, { children: this.state.markdown, remarkPlugins: [[remarkGfm], [remarkBreaks]],
                            components: {
                                a: function a(_ref) {
                                    var props = _objectWithoutProperties(_ref, []);

                                    return React.createElement('a', Object.assign({ target: "_blank" }, props));
                                },
                                code: function code(_ref2) {
                                    var inline = _ref2.inline,
                                        className = _ref2.className,
                                        children = _ref2.children,
                                        props = _objectWithoutProperties(_ref2, ['inline', 'className', 'children']);

                                    var match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? React.createElement(SyntaxHighlighter, Object.assign({
                                        children: String(children).replace(/\n$/, ''),
                                        customStyle: { margin: 0, paddingLeft: "10px" },
                                        style: themeStyle,
                                        showLineNumbers: true,
                                        language: match[1],
                                        PreTag: 'div'
                                    }, props)) : React.createElement(
                                        'code',
                                        Object.assign({ className: className }, props),
                                        children
                                    );
                                }
                            } })
                    )
                )
            );
        }
    }]);

    return Main;
}(React.Component);

var Footer = function (_React$Component4) {
    _inherits(Footer, _React$Component4);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'footer',
                { id: "footer" },
                React.createElement(
                    'a',
                    { href: "https://github.com/eduardo-vidals/JavaScript-and-React", target: "_blank" },
                    ' ',
                    React.createElement(
                        'i',
                        {
                            id: "github-icon", className: 'fab fa-github' },
                        ' '
                    ),
                    ' '
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

export default App;