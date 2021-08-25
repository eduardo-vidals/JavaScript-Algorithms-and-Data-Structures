/* eslint-disable import/first */
import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div id={"app-wrapper"}>
                <Calculator/>
                <Credits/>
            </div>
        );
    }
}

let operations = ["*", "/", "+", "-"];
let endsWithOperator = /[*+-/]$/
let endsWithTwoOperators = /[*/+][-]$/

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 0,
            formula: String.fromCharCode(160),
            number: "",
            prevVal: "",
            operation: "",
            decimal: false,
            negative: false,
            evaluatedResult: "",
            recentlyEvaluated: false
        }
        this.onClick = this.onClick.bind(this);
        this.calculate = this.calculate.bind(this);
        this.clear = this.clear.bind(this);
        this.isNumber = this.isNumber.bind(this);
        this.isOperation = this.isOperation.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleOperation = this.handleOperation.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
    }

    onClick(event) {
        let curVal = event.target.value;
        if (curVal === "AC") {
            this.clear();
        } else if (this.isNumber(curVal)) {
            this.handleNumber(curVal);
        } else if (curVal === ".") {
            this.handleDecimal(curVal)
        } else if (this.isOperation(curVal)) {
            this.handleOperation(curVal);
        } else if (curVal === "=") {
            this.calculate();
            this.setState({
                recentlyEvaluated: true
            })
        }
    }

    clear() {
        this.setState({
            display: 0,
            formula: String.fromCharCode(160),
            number: "",
            operation: "",
            prevVal: "",
            decimal: false,
            recentlyEvaluated: false,
        })
    }

    calculate() {
        this.setState({
            display: 0,
            number: "",
            operation: ""
        })

        let prodInt, divInt, addInt, minusInt, prodFloat, divFloat, addFloat, minusFloat;
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
            })
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
                decimal: true,
            });
        }

        if (this.state.decimal) {
            if (this.state.operation === "*") {
                this.setState({
                    display: prodFloat,
                    prevVal: prodFloat,
                    evaluatedResult: prodFloat,
                    formula: prodFloat
                })
            }
            if (this.state.operation === "/") {
                this.setState({
                    display: divFloat,
                    prevVal: divFloat,
                    evaluatedResult: divFloat,
                    formula: divFloat
                })
            }
            if (this.state.operation === "+") {
                this.setState({
                    display: addFloat,
                    prevVal: addFloat,
                    evaluatedResult: addFloat,
                    formula: addFloat
                })
            }
            if (this.state.operation === "-") {
                this.setState({
                    display: minusFloat,
                    prevVal: minusFloat,
                    evaluatedResult: minusFloat,
                    formula: minusFloat
                })
            }
        } else {
            if (this.state.operation === "*") {
                this.setState({
                    display: prodInt,
                    prevVal: prodInt,
                    evaluatedResult: prodInt,
                    formula: prodInt
                })
            }
            if (this.state.operation === "/") {
                this.setState({
                    display: divInt,
                    prevVal: divInt,
                    evaluatedResult: divInt,
                    formula: divInt
                })
            }
            if (this.state.operation === "+") {
                this.setState({
                    display: addInt,
                    prevVal: addInt,
                    evaluatedResult: addInt,
                    formula: addInt
                })
            }
            if (this.state.operation === "-") {
                this.setState({
                    display: minusInt,
                    prevVal: minusInt,
                    evaluatedResult: minusInt,
                    formula: minusInt
                })
            }
        }
    }

    isNumber(number) {
        return number.match(/[0-9]+/);
    }

    isOperation(operation) {
        return operations.includes(operation);
    }

    handleNumber(number) {
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
                    number: this.state.number + number,
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
                        recentlyEvaluated: false,
                    });
                } else {
                    this.setState({
                        display: this.state.number + number,
                        formula: this.state.formula + number,
                        number: this.state.number + number,
                    })
                }
            }
        }
    }

    handleOperation(operation) {
        if (endsWithOperator.test(this.state.formula)) {
            // substr is the last available operation
            let substr = this.state.formula.substring(this.state.formula.length - 1, this.state.formula.length);
            let formula = this.state.formula.substring(0, this.state.formula.length - 1);
            if (operation === "-" && substr !== "-") {
                this.setState({
                    display: operation,
                    formula: formula + substr + operation,
                    negative: true,
                    recentlyEvaluated: false,
                })
            } else {
                if (formula.match(endsWithTwoOperators)) {
                    this.setState({
                        display: operation,
                        formula: formula.substring(0, this.state.formula.length - 2) + operation,
                        operation: operation,
                        negative: false,
                        recentlyEvaluated: false,
                    });
                } else {
                    this.setState({
                        display: operation,
                        formula: formula.substring(0, this.state.formula.length - 1) + operation,
                        operation: operation,
                        negative: false,
                        recentlyEvaluated: false,
                    });
                }
            }
        } else {
            if (operations.includes(this.state.operation)) {
                this.calculate();
                this.setState({
                    display: operation,
                    formula: this.state.formula + operation,
                    operation: operation,
                })
            } else {
                // set the prev val once an operation is clicked
                if (this.state.prevVal === "") {
                    if (this.state.display === 0){
                        this.setState({
                            display: operation,
                            formula: "0" + operation,
                            prevVal: "0",
                            number: "",
                            operation: operation,
                        });
                    } else {
                        this.setState({
                            display: operation,
                            formula: this.state.formula + operation,
                            prevVal: this.state.formula,
                            number: "",
                            operation: operation,
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

    handleDecimal(decimal) {
        if (this.state.display.toString() === "0") {
            this.setState({
                display: "0.",
                formula: "0.",
                number: "0.",
                decimal: true
            })
        } else if (!this.state.display.toString().includes(decimal)) {
            this.setState({
                display: this.state.display.toString() + ".",
                formula: this.state.formula.toString() + ".",
                number: this.state.number.toString() + ".",
                decimal: true
            });
        }
    }

    render() {
        return (
            <div id={"calculator-wrapper"}>
                <div id={"calculator"}>
                    <div id={"formula"}>
                        {this.state.formula}
                    </div>
                    <div id={"display"}>
                        {this.state.display}
                    </div>
                    <Buttons
                        onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button id={"clear"} className={"big-button top-button"} value={"AC"}
                        onClick={this.props.onClick}>AC
                </button>
                <button id={"modulus"} className={"button top-button"} value={"%"} onClick={this.props.onClick}>%
                </button>
                <button id={"divide"} className={"button operations-button"} value={"/"}
                        onClick={this.props.onClick}>÷</button>
                <button id={"seven"} className={"button normal-button"} value={7} onClick={this.props.onClick}>7
                </button>
                <button id={"eight"} className={"button normal-button"} value={8} onClick={this.props.onClick}>8
                </button>
                <button id={"nine"} className={"button normal-button"} value={9} onClick={this.props.onClick}>9</button>
                <button id={"multiply"} className={"button operations-button"} value={"*"}
                        onClick={this.props.onClick}>x
                </button>
                <button id={"four"} className={"button normal-button"} value={4} onClick={this.props.onClick}>4</button>
                <button id={"five"} className={"button normal-button"} value={5} onClick={this.props.onClick}>5</button>
                <button id={"six"} className={"button normal-button"} value={6} onClick={this.props.onClick}>6</button>
                <button id={"subtract"} className={"button operations-button"} value={"-"}
                        onClick={this.props.onClick}>-
                </button>
                <button id={"one"} className={"button normal-button"} value={1} onClick={this.props.onClick}>1</button>
                <button id={"two"} className={"button normal-button"} value={2} onClick={this.props.onClick}>2</button>
                <button id={"three"} className={"button normal-button"} value={3} onClick={this.props.onClick}>3
                </button>
                <button id={"add"} className={"button operations-button"} value={"+"}
                        onClick={this.props.onClick}>+
                </button>
                <button id={"zero"} className={"big-button normal-button"} value={0} onClick={this.props.onClick}>0
                </button>
                <button id={"decimal"} className={"button normal-button"} value={"."}
                        onClick={this.props.onClick}>.
                </button>
                <button id={"equals"} className={"equals-button operations-button"} value={"="}
                        onClick={this.props.onClick}>=
                </button>
            </div>
        )
    }
}

class Credits extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p id={"credits"}> Designed and Coded by <br/> Eduardo Vidals </p>
            </div>
        );
    }
}

export default App;
