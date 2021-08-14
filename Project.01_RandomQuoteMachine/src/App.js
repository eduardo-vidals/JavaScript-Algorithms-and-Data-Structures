var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable import/first */
import './App.css';
import React from "react";
import AutoHeight from 'react-auto-height';

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            text: "",
            author: "",
            color: "",
            quotes: [],
            colors: ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'],
            initialColor: "",
            tweetQuote: "",
            tumblrQuote: ""
        };
        _this.newQuote = _this.newQuote.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json").then(function (res) {
                return res.json();
            }).then(function (result) {
                var randomIndex = Math.floor(Math.random() * result.quotes.length);
                var randomColor = Math.floor(Math.random() * _this2.state.colors.length);
                _this2.setState({
                    isLoaded: true,
                    quotes: result.quotes,
                    text: result.quotes[randomIndex].quote,
                    author: result.quotes[randomIndex].author,
                    color: _this2.state.colors[randomColor],
                    initialColor: _this2.state.colors[randomColor]
                });
                var tweetURL = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + _this2.state.text + '" - ' + _this2.state.author);
                var tumblrURL = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' + encodeURIComponent(_this2.state.author) + '&content=' + encodeURIComponent(_this2.state.text) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';

                _this2.setState({
                    tweetQuote: tweetURL,
                    tumblrQuote: tumblrURL
                });
            });
        }
    }, {
        key: 'newQuote',
        value: function newQuote() {
            var _this3 = this;

            // set a timeout for text + author, as it ensures that the text will
            // not pre-load before it turns white
            setTimeout(function () {
                var randomIndex = Math.floor(Math.random() * _this3.state.quotes.length);
                _this3.setState(function (state) {
                    return {
                        text: state.quotes[randomIndex].quote,
                        author: state.quotes[randomIndex].author
                    };
                });
            }, 675);

            // random color + update the state
            var randomColor = Math.floor(Math.random() * this.state.colors.length);
            this.setState(function (state) {
                return {
                    color: state.colors[randomColor]
                };
            });

            // transition for buttons and background
            document.getElementById("root").style.transition = "background-color 1s ease";
            var all = document.getElementsByClassName("color-transition");
            for (var i = 0; i < all.length; i++) {
                all[i].style.transition = "background-color 1s ease";
            }

            // transition for text
            all = document.getElementsByClassName("text-transition");

            var _loop = function _loop(_i) {
                all[_i].style.opacity = 0;
                all[_i].style.transition = "opacity 675ms ease-out";
                all[_i].addEventListener("transitionend", function () {
                    all[_i].style.opacity = 1;
                    all[_i].style.transition = "opacity 500ms ease-in";
                    all[_i].style.color = _this3.state.color;
                    // after 675ms the state color can now be used, an initial color variable was
                    // used so that the text isn't automatically updated when the DOM updates
                    // the state color to the new color, so in this case, the text color updates
                    // after 675ms
                });
            };

            for (var _i = 0; _i < all.length; _i++) {
                _loop(_i);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var colorStyle = {
                backgroundColor: this.state.color
            };

            document.getElementById("root").style.backgroundColor = this.state.color;
            return React.createElement(
                AutoHeight,
                { id: 'quote-box', element: 'div' },
                React.createElement(
                    'div',
                    { id: "quote", style: { color: this.state.initialColor } },
                    React.createElement(
                        'p',
                        { id: "text", className: "text-transition" },
                        ' "',
                        this.state.text,
                        '" '
                    ),
                    React.createElement(
                        'p',
                        { id: "author", className: "text-transition" },
                        ' - ',
                        this.state.author,
                        ' '
                    )
                ),
                React.createElement(
                    'div',
                    { className: "buttons" },
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: this.state.tweetQuote, target: "_blank", id: "tweet-quote",
                                    className: "fab fa-twitter color-transition", style: colorStyle },
                                ' '
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: this.state.tumblrQuote, target: "_blank",
                                    className: "fab fa-tumblr color-transition", style: colorStyle },
                                ' '
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: "buttons new-quote-button" },
                    React.createElement(
                        'button',
                        { id: "new-quote", className: "color-transition", onClick: this.newQuote,
                            style: colorStyle },
                        'New quote'
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

export default App;