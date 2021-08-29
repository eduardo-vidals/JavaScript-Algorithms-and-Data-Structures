var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable import/first */
import './App.css';
import React from "react";

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "app-wrapper" },
                React.createElement(Header, null),
                React.createElement(Timer, null),
                React.createElement(Credits, null)
            );
        }
    }]);

    return App;
}(React.Component);

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header(props) {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "header" },
                React.createElement(
                    "h1",
                    null,
                    " 25 + 5 Clock "
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var Timer = function (_React$Component3) {
    _inherits(Timer, _React$Component3);

    function Timer(props) {
        _classCallCheck(this, Timer);

        var _this3 = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

        _this3.state = {
            breakLength: 5,
            sessionLength: 25,
            timerState: 'stopped',
            timerLabel: "Session",
            timer: 1500,
            intervalId: ""
        };
        _this3.incrementBreak = _this3.incrementBreak.bind(_this3);
        _this3.decrementBreak = _this3.decrementBreak.bind(_this3);
        _this3.incrementSession = _this3.incrementSession.bind(_this3);
        _this3.decrementSession = _this3.decrementSession.bind(_this3);
        _this3.start = _this3.start.bind(_this3);
        _this3.reset = _this3.reset.bind(_this3);
        _this3.timerState = _this3.timerState.bind(_this3);
        return _this3;
    }

    _createClass(Timer, [{
        key: "incrementBreak",
        value: function incrementBreak() {
            if (this.state.breakLength < 60 && this.state.timerState === 'stopped') {
                this.setState(function (state) {
                    return {
                        breakLength: ++state.breakLength
                    };
                });
            }
        }
    }, {
        key: "decrementBreak",
        value: function decrementBreak() {
            if (this.state.breakLength > 1 && this.state.timerState === 'stopped') {
                this.setState(function (state) {
                    return {
                        breakLength: --state.breakLength
                    };
                });
            }
        }
    }, {
        key: "incrementSession",
        value: function incrementSession() {
            if (this.state.sessionLength < 60 && this.state.timerState === 'stopped') {
                this.setState(function (state) {
                    return {
                        sessionLength: ++state.sessionLength,
                        timer: state.timer + 60
                    };
                });
            }
        }
    }, {
        key: "decrementSession",
        value: function decrementSession() {
            if (this.state.sessionLength > 1 && this.state.timerState === 'stopped') {
                this.setState(function (state) {
                    return {
                        sessionLength: --state.sessionLength,
                        timer: state.timer - 60
                    };
                });
            }
        }
    }, {
        key: "start",
        value: function start() {
            var _this4 = this;

            var intervalId = setInterval(function () {
                _this4.decrementTimer();
                _this4.timerStatus();
            }, 1000);

            this.setState({
                intervalId: intervalId
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            var audio = document.getElementById("beep");
            audio.load();

            clearInterval(this.state.intervalId);
            this.setState({
                breakLength: 5,
                sessionLength: 25,
                timerState: 'stopped',
                timerLabel: "Session",
                timer: 1500,
                intervalId: ""
            });
        }
    }, {
        key: "decrementTimer",
        value: function decrementTimer() {
            this.setState(function (state) {
                return {
                    timer: --state.timer
                };
            });
        }
    }, {
        key: "timerStatus",
        value: function timerStatus() {
            var timer = this.state.timer;
            this.beep(timer);
            if (timer < 0) {
                if (this.state.intervalId) {
                    clearInterval(this.state.intervalId);
                }
                if (this.state.timerLabel === 'Session') {
                    this.start();
                    this.switchTimer(this.state.breakLength * 60, 'Break');
                } else {
                    this.start();
                    this.switchTimer(this.state.sessionLength * 60, 'Session');
                }
            }
        }
    }, {
        key: "beep",
        value: function beep(timer) {
            if (timer === 0) {
                var audio = document.getElementById("beep");
                audio.play();
            }
        }
    }, {
        key: "switchTimer",
        value: function switchTimer(num, str) {
            this.setState({
                timer: num,
                timerLabel: str
            });
        }
    }, {
        key: "timerState",
        value: function timerState() {
            if (this.state.timerState === 'stopped') {
                this.start();
                this.setState({ timerState: 'running' });
            } else {
                this.setState({ timerState: 'stopped' });
                clearInterval(this.state.intervalId);
            }
        }
    }, {
        key: "timerFormatted",
        value: function timerFormatted() {
            var minutes = Math.floor(this.state.timer / 60);
            var seconds = this.state.timer - minutes * 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return minutes + ':' + seconds;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "timer-wrapper" },
                React.createElement(
                    "div",
                    { id: "lengths-wrapper" },
                    React.createElement(
                        "div",
                        { id: "break-label" },
                        React.createElement(
                            "p",
                            null,
                            " Break Length "
                        ),
                        React.createElement(
                            "div",
                            { id: "length-options" },
                            React.createElement(
                                "i",
                                { className: "fas fa-arrow-down", id: "break-decrement", onClick: this.decrementBreak },
                                " "
                            ),
                            React.createElement(
                                "p",
                                { id: "break-length" },
                                " ",
                                this.state.breakLength,
                                " "
                            ),
                            React.createElement(
                                "i",
                                { className: "fas fa-arrow-up", id: "break-increment", onClick: this.incrementBreak },
                                " "
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { id: "session-label" },
                        React.createElement(
                            "p",
                            null,
                            " Session Length"
                        ),
                        React.createElement(
                            "div",
                            { id: "session-options" },
                            React.createElement(
                                "i",
                                { className: "fas fa-arrow-down", id: "session-decrement",
                                    onClick: this.decrementSession },
                                " "
                            ),
                            React.createElement(
                                "p",
                                { id: "session-length" },
                                " ",
                                this.state.sessionLength,
                                " "
                            ),
                            React.createElement(
                                "i",
                                { className: "fas fa-arrow-up", id: "session-increment",
                                    onClick: this.incrementSession },
                                " "
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { id: "timer-label" },
                    React.createElement(
                        "p",
                        null,
                        " ",
                        this.state.timerLabel,
                        " "
                    ),
                    React.createElement(
                        "p",
                        { id: "time-left" },
                        " ",
                        this.timerFormatted(),
                        " "
                    )
                ),
                React.createElement(
                    "div",
                    { id: "timer-options" },
                    React.createElement(
                        "div",
                        { id: "start_stop", onClick: this.timerState },
                        React.createElement(
                            "i",
                            { className: "fas fa-play" },
                            " "
                        ),
                        React.createElement(
                            "i",
                            { className: "fas fa-pause", id: "pause" },
                            " "
                        )
                    ),
                    React.createElement(
                        "i",
                        { className: "fas fa-sync-alt", id: "reset", onClick: this.reset },
                        " "
                    )
                ),
                React.createElement("audio", {
                    src: "https://github.com/eduardo-vidals/JavaScript-and-React/blob/main/Project.05_25+5Clock/Birdsong%20iPhone%20alarm.mp3?raw=true",
                    id: "beep"
                })
            );
        }
    }]);

    return Timer;
}(React.Component);

var Credits = function (_React$Component4) {
    _inherits(Credits, _React$Component4);

    function Credits(props) {
        _classCallCheck(this, Credits);

        return _possibleConstructorReturn(this, (Credits.__proto__ || Object.getPrototypeOf(Credits)).call(this, props));
    }

    _createClass(Credits, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "credits" },
                React.createElement(
                    "p",
                    null,
                    " Designed and Coded by ",
                    React.createElement("br", null),
                    " Eduardo Vidals "
                )
            );
        }
    }]);

    return Credits;
}(React.Component);

export default App;