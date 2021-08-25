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

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "app-wrapper" },
                React.createElement(Calculator, null),
                React.createElement(Credits, null)
            );
        }
    }]);

    return App;
}(React.Component);

var operations = ["*", "/", "+", "-"];
var endsWithOperator = /[*+-/]$/;
var endsWithTwoOperators = /[*/+][-]$/;

var Calculator = function (_React$Component2) {
    _inherits(Calculator, _React$Component2);

    function Calculator(props) {
        _classCallCheck(this, Calculator);

        var _this2 = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

        _this2.state = {
            display: 0,
            formula: String.fromCharCode(160),
            number: "",
            prevVal: "",
            operation: "",
            decimal: false,
            negative: false,
            evaluatedResult: "",
            recentlyEvaluated: false
        };
        _this2.onClick = _this2.onClick.bind(_this2);
        _this2.calculate = _this2.calculate.bind(_this2);
        _this2.clear = _this2.clear.bind(_this2);
        _this2.isNumber = _this2.isNumber.bind(_this2);
        _this2.isOperation = _this2.isOperation.bind(_this2);
        _this2.handleNumber = _this2.handleNumber.bind(_this2);
        _this2.handleOperation = _this2.handleOperation.bind(_this2);
        _this2.handleDecimal = _this2.handleDecimal.bind(_this2);
        return _this2;
    }

    _createClass(Calculator, [{
        key: "onClick",
        value: function onClick(event) {
            var curVal = event.target.value;
            if (curVal === "AC") {
                this.clear();
            } else if (this.isNumber(curVal)) {
                this.handleNumber(curVal);
            } else if (curVal === ".") {
                this.handleDecimal(curVal);
            } else if (this.isOperation(curVal)) {
                this.handleOperation(curVal);
            } else if (curVal === "=") {
                this.calculate();
                this.setState({
                    recentlyEvaluated: true
                });
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this.setState({
                display: 0,
                formula: String.fromCharCode(160),
                number: "",
                operation: "",
                prevVal: "",
                decimal: false,
                recentlyEvaluated: false
            });
        }
    }, {
        key: "calculate",
        value: function calculate() {
            this.setState({
                display: 0,
                number: "",
                operation: ""
            });

            var prodInt = void 0,
                divInt = void 0,
                addInt = void 0,
                minusInt = void 0,
                prodFloat = void 0,
                divFloat = void 0,
                addFloat = void 0,
                minusFloat = void 0;
            if (this.state.negative) {
                prodInt = parseInt(this.state.prevVal) * parseInt(this.state.number) * -1;
                divInt = parseInt(this.state.prevVal) / parseInt(this.state.number) * -1;
                addInt = parseInt(this.state.prevVal) + parseInt(this.state.number) * -1;
                minusInt = parseInt(this.state.prevVal) - parseInt(this.state.number) * -1;
                prodFloat = parseFloat(this.state.prevVal) * parseFloat(this.state.number) * -1;
                divFloat = parseFloat(this.state.prevVal) / parseFloat(this.state.number) * -1;
                addFloat = parseFloat(this.state.prevVal) + parseFloat(this.state.number) * -1;
                minusFloat = parseFloat(this.state.prevVal) - parseFloat(this.state.number) * -1;
                this.setState({
                    negative: false
                });
            } else {
                prodInt = parseInt(this.state.prevVal) * parseInt(this.state.number);
                divInt = parseInt(this.state.prevVal) / parseInt(this.state.number);
                addInt = parseInt(this.state.prevVal) + parseInt(this.state.number);
                minusInt = parseInt(this.state.prevVal) - parseInt(this.state.number);
                prodFloat = parseFloat(this.state.prevVal) * parseFloat(this.state.number);
                divFloat = parseFloat(this.state.prevVal) / parseFloat(this.state.number);
                addFloat = parseFloat(this.state.prevVal) + parseFloat(this.state.number);
                minusFloat = parseFloat(this.state.prevVal) - parseFloat(this.state.number);
            }

            if (divFloat.toString().includes(".") || divInt.toString().includes(".")) {
                this.setState({
                    decimal: true
                });
            }

            if (this.state.decimal) {
                if (this.state.operation === "*") {
                    this.setState({
                        display: prodFloat,
                        prevVal: prodFloat,
                        evaluatedResult: prodFloat,
                        formula: prodFloat
                    });
                }
                if (this.state.operation === "/") {
                    this.setState({
                        display: divFloat,
                        prevVal: divFloat,
                        evaluatedResult: divFloat,
                        formula: divFloat
                    });
                }
                if (this.state.operation === "+") {
                    this.setState({
                        display: addFloat,
                        prevVal: addFloat,
                        evaluatedResult: addFloat,
                        formula: addFloat
                    });
                }
                if (this.state.operation === "-") {
                    this.setState({
                        display: minusFloat,
                        prevVal: minusFloat,
                        evaluatedResult: minusFloat,
                        formula: minusFloat
                    });
                }
            } else {
                if (this.state.operation === "*") {
                    this.setState({
                        display: prodInt,
                        prevVal: prodInt,
                        evaluatedResult: prodInt,
                        formula: prodInt
                    });
                }
                if (this.state.operation === "/") {
                    this.setState({
                        display: divInt,
                        prevVal: divInt,
                        evaluatedResult: divInt,
                        formula: divInt
                    });
                }
                if (this.state.operation === "+") {
                    this.setState({
                        display: addInt,
                        prevVal: addInt,
                        evaluatedResult: addInt,
                        formula: addInt
                    });
                }
                if (this.state.operation === "-") {
                    this.setState({
                        display: minusInt,
                        prevVal: minusInt,
                        evaluatedResult: minusInt,
                        formula: minusInt
                    });
                }
            }
        }
    }, {
        key: "isNumber",
        value: function isNumber(number) {
            return number.match(/[0-9]+/);
        }
    }, {
        key: "isOperation",
        value: function isOperation(operation) {
            return operations.includes(operation);
        }
    }, {
        key: "handleNumber",
        value: function handleNumber(number) {
            // meaning that there is a prev value and an operation in the stack
            if (this.state.display.toString() === "0" && number === "0") {
                this.setState({
                    display: 0,
                    formula: "0"
                });
            } else {
                if (this.state.prevVal === "") {
                    this.setState({
                        display: this.state.number + number,
                        formula: this.state.formula + number,
                        number: this.state.number + number
                    });
                } else {
                    if (this.state.recentlyEvaluated && this.state.display === this.state.evaluatedResult) {
                        this.setState({
                            display: number,
                            formula: "" + number,
                            number: "" + number,
                            operation: "",
                            prevVal: "",
                            decimal: false,
                            recentlyEvaluated: false
                        });
                    } else {
                        this.setState({
                            display: this.state.number + number,
                            formula: this.state.formula + number,
                            number: this.state.number + number
                        });
                    }
                }
            }
        }
    }, {
        key: "handleOperation",
        value: function handleOperation(operation) {
            if (endsWithOperator.test(this.state.formula)) {
                // substr is the last available operation
                var substr = this.state.formula.substring(this.state.formula.length - 1, this.state.formula.length);
                var formula = this.state.formula.substring(0, this.state.formula.length - 1);
                if (operation === "-" && substr !== "-") {
                    this.setState({
                        display: operation,
                        formula: formula + substr + operation,
                        negative: true,
                        recentlyEvaluated: false
                    });
                } else {
                    if (formula.match(endsWithTwoOperators)) {
                        this.setState({
                            display: operation,
                            formula: formula.substring(0, this.state.formula.length - 2) + operation,
                            operation: operation,
                            negative: false,
                            recentlyEvaluated: false
                        });
                    } else {
                        this.setState({
                            display: operation,
                            formula: formula.substring(0, this.state.formula.length - 1) + operation,
                            operation: operation,
                            negative: false,
                            recentlyEvaluated: false
                        });
                    }
                }
            } else {
                if (operations.includes(this.state.operation)) {
                    this.calculate();
                    this.setState({
                        display: operation,
                        formula: this.state.formula + operation,
                        operation: operation
                    });
                } else {
                    // set the prev val once an operation is clicked
                    if (this.state.prevVal === "") {
                        if (this.state.display === 0) {
                            this.setState({
                                display: operation,
                                formula: "0" + operation,
                                prevVal: "0",
                                number: "",
                                operation: operation
                            });
                        } else {
                            this.setState({
                                display: operation,
                                formula: this.state.formula + operation,
                                prevVal: this.state.formula,
                                number: "",
                                operation: operation
                            });
                        }
                    } else {
                        this.setState({
                            display: operation,
                            formula: this.state.formula + operation,
                            number: "",
                            operation: operation
                        });
                    }
                }
            }
        }
    }, {
        key: "handleDecimal",
        value: function handleDecimal(decimal) {
            if (this.state.display.toString() === "0") {
                this.setState({
                    display: "0.",
                    formula: "0.",
                    number: "0.",
                    decimal: true
                });
            } else if (!this.state.display.toString().includes(decimal)) {
                this.setState({
                    display: this.state.display.toString() + ".",
                    formula: this.state.formula.toString() + ".",
                    number: this.state.number.toString() + ".",
                    decimal: true
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "calculator-wrapper" },
                React.createElement(
                    "div",
                    { id: "calculator" },
                    React.createElement(
                        "div",
                        { id: "formula" },
                        this.state.formula
                    ),
                    React.createElement(
                        "div",
                        { id: "display" },
                        this.state.display
                    ),
                    React.createElement(Buttons, {
                        onClick: this.onClick })
                )
            );
        }
    }]);

    return Calculator;
}(React.Component);

var Buttons = function (_React$Component3) {
    _inherits(Buttons, _React$Component3);

    function Buttons(props) {
        _classCallCheck(this, Buttons);

        return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this, props));
    }

    _createClass(Buttons, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    { id: "clear", className: "big-button top-button", value: "AC",
                        onClick: this.props.onClick },
                    "AC"
                ),
                React.createElement(
                    "button",
                    { id: "modulus", className: "button top-button", value: "%", onClick: this.props.onClick },
                    "%"
                ),
                React.createElement(
                    "button",
                    { id: "divide", className: "button operations-button", value: "/",
                        onClick: this.props.onClick },
                    "\xF7"
                ),
                React.createElement(
                    "button",
                    { id: "seven", className: "button normal-button", value: 7, onClick: this.props.onClick },
                    "7"
                ),
                React.createElement(
                    "button",
                    { id: "eight", className: "button normal-button", value: 8, onClick: this.props.onClick },
                    "8"
                ),
                React.createElement(
                    "button",
                    { id: "nine", className: "button normal-button", value: 9, onClick: this.props.onClick },
                    "9"
                ),
                React.createElement(
                    "button",
                    { id: "multiply", className: "button operations-button", value: "*",
                        onClick: this.props.onClick },
                    "x"
                ),
                React.createElement(
                    "button",
                    { id: "four", className: "button normal-button", value: 4, onClick: this.props.onClick },
                    "4"
                ),
                React.createElement(
                    "button",
                    { id: "five", className: "button normal-button", value: 5, onClick: this.props.onClick },
                    "5"
                ),
                React.createElement(
                    "button",
                    { id: "six", className: "button normal-button", value: 6, onClick: this.props.onClick },
                    "6"
                ),
                React.createElement(
                    "button",
                    { id: "subtract", className: "button operations-button", value: "-",
                        onClick: this.props.onClick },
                    "-"
                ),
                React.createElement(
                    "button",
                    { id: "one", className: "button normal-button", value: 1, onClick: this.props.onClick },
                    "1"
                ),
                React.createElement(
                    "button",
                    { id: "two", className: "button normal-button", value: 2, onClick: this.props.onClick },
                    "2"
                ),
                React.createElement(
                    "button",
                    { id: "three", className: "button normal-button", value: 3, onClick: this.props.onClick },
                    "3"
                ),
                React.createElement(
                    "button",
                    { id: "add", className: "button operations-button", value: "+",
                        onClick: this.props.onClick },
                    "+"
                ),
                React.createElement(
                    "button",
                    { id: "zero", className: "big-button normal-button", value: 0, onClick: this.props.onClick },
                    "0"
                ),
                React.createElement(
                    "button",
                    { id: "decimal", className: "button normal-button", value: ".",
                        onClick: this.props.onClick },
                    "."
                ),
                React.createElement(
                    "button",
                    { id: "equals", className: "equals-button operations-button", value: "=",
                        onClick: this.props.onClick },
                    "="
                )
            );
        }
    }]);

    return Buttons;
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
                null,
                React.createElement(
                    "p",
                    { id: "credits" },
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