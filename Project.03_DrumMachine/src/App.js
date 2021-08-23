var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable import/first */
import './App.css';
import React from "react";

var padBank = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}];

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: "app-wrapper" },
                React.createElement(Header, null),
                React.createElement(DrumMachine, { padBank: padBank })
            );
        }
    }]);

    return App;
}(React.Component);

var DrumMachine = function (_React$Component2) {
    _inherits(DrumMachine, _React$Component2);

    function DrumMachine(props) {
        _classCallCheck(this, DrumMachine);

        var _this2 = _possibleConstructorReturn(this, (DrumMachine.__proto__ || Object.getPrototypeOf(DrumMachine)).call(this, props));

        _this2.state = {
            display: "Sound"
        };
        _this2.displayName = _this2.displayName.bind(_this2);
        return _this2;
    }

    _createClass(DrumMachine, [{
        key: 'displayName',
        value: function displayName(name) {
            this.setState({
                display: name
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var padBank = this.props.padBank.map(function (drumObj, i, bankArr) {
                return React.createElement(DrumPad, {
                    clip: bankArr[i].url,
                    clipId: bankArr[i].id,
                    keyCode: bankArr[i].keyCode,
                    keyTrigger: bankArr[i].keyTrigger,
                    displayName: _this3.displayName
                });
            });
            return React.createElement(
                'div',
                { id: "drum-wrapper" },
                React.createElement(
                    'div',
                    { id: "drum-machine" },
                    padBank
                ),
                React.createElement(
                    'div',
                    { id: "display-wrapper" },
                    React.createElement(
                        'p',
                        { id: "display" },
                        ' ',
                        this.state.display,
                        ' '
                    )
                )
            );
        }
    }]);

    return DrumMachine;
}(React.Component);

var DrumPad = function (_React$Component3) {
    _inherits(DrumPad, _React$Component3);

    function DrumPad(props) {
        _classCallCheck(this, DrumPad);

        var _this4 = _possibleConstructorReturn(this, (DrumPad.__proto__ || Object.getPrototypeOf(DrumPad)).call(this, props));

        _this4.state = {
            padStyle: {
                backgroundColor: "#e7e7e7"
            }
        };
        _this4.playSound = _this4.playSound.bind(_this4);
        _this4.handleKeyPress = _this4.handleKeyPress.bind(_this4);
        return _this4;
    }

    _createClass(DrumPad, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('keydown', this.handleKeyPress);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('keydown', this.handleKeyPress);
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(e) {
            if (e.keyCode === this.props.keyCode) {
                this.playSound();
            }
        }
    }, {
        key: 'activatePad',
        value: function activatePad() {
            if (this.state.padStyle.backgroundColor === "#e06868") {
                this.setState({
                    padStyle: {
                        backgroundColor: "#e7e7e7"
                    }
                });
            } else {
                this.setState({
                    padStyle: {
                        backgroundColor: "#e06868"
                    }
                });
            }
        }
    }, {
        key: 'playSound',
        value: function playSound() {
            var _this5 = this;

            var sound = document.getElementById(this.props.keyTrigger);
            sound.currentTime = 0;
            this.activatePad();
            setTimeout(function () {
                _this5.activatePad();
            }, 100);
            sound.play();
            console.log(this.props.clipId);
            this.props.displayName(this.props.clipId);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: "drum-pad", onClick: this.playSound, style: this.state.padStyle, id: this.props.clipId },
                React.createElement('audio', { className: 'clip', id: this.props.keyTrigger, src: this.props.clip }),
                this.props.keyTrigger
            );
        }
    }]);

    return DrumPad;
}(React.Component);

var Header = function (_React$Component4) {
    _inherits(Header, _React$Component4);

    function Header(props) {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'h1',
                { id: "header" },
                ' DRUM PAD '
            );
        }
    }]);

    return Header;
}(React.Component);

export default App;