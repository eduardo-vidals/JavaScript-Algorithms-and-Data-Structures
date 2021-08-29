/* eslint-disable import/first */
import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"app-wrapper"}>
                <Header/>
                <Timer/>
                <Credits/>
            </div>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"header"}>
                <h1> 25 + 5 Clock </h1>
            </div>
        )
    }
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerState: 'stopped',
            timerLabel: "Session",
            timer: 1500,
            intervalId: ""
        }
        this.incrementBreak = this.incrementBreak.bind(this);
        this.decrementBreak = this.decrementBreak.bind(this);
        this.incrementSession = this.incrementSession.bind(this);
        this.decrementSession = this.decrementSession.bind(this);
        this.start = this.start.bind(this);
        this.reset = this.reset.bind(this);
        this.timerState = this.timerState.bind(this);
    }

    incrementBreak() {
        if (this.state.breakLength < 60 && this.state.timerState === 'stopped') {
            this.setState((state) => ({
                breakLength: ++state.breakLength
            }));
        }
    }

    decrementBreak() {
        if (this.state.breakLength > 1 && this.state.timerState === 'stopped') {
            this.setState((state) => ({
                breakLength: --state.breakLength
            }));
        }
    }

    incrementSession() {
        if (this.state.sessionLength < 60 && this.state.timerState === 'stopped') {
            this.setState((state) => ({
                sessionLength: ++state.sessionLength,
                timer: state.timer + 60
            }));
        }
    }

    decrementSession() {
        if (this.state.sessionLength > 1 && this.state.timerState === 'stopped') {
            this.setState((state) => ({
                sessionLength: --state.sessionLength,
                timer: state.timer - 60
            }));
        }
    }

    start() {
        let intervalId = setInterval(() => {
            this.decrementTimer();
            this.timerStatus();
        }, 1000);

        this.setState({
            intervalId: intervalId
        })
    }

    reset() {
        let audio = document.getElementById("beep");
        audio.load();

        clearInterval(this.state.intervalId);
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timerState: 'stopped',
            timerLabel: "Session",
            timer: 1500,
            intervalId: ""
        })
    }

    decrementTimer() {
        this.setState(state => ({
            timer: --state.timer
        }));
    }

    timerStatus() {
        let timer = this.state.timer;
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

    beep(timer) {
        if (timer === 0) {
            let audio = document.getElementById("beep");
            audio.play();
        }
    }

    switchTimer(num, str) {
        this.setState({
            timer: num,
            timerLabel: str,
        });
    }

    timerState() {
        if (this.state.timerState === 'stopped') {
            this.start();
            this.setState({timerState: 'running'});
        } else {
            this.setState({timerState: 'stopped'});
            clearInterval(this.state.intervalId);
        }
    }

    timerFormatted() {
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }

    render() {
        return (
            <div id={"timer-wrapper"}>
                <div id={"lengths-wrapper"}>
                    <div id={"break-label"}>
                        <p> Break Length </p>
                        <div id={"length-options"}>
                            <i className="fas fa-arrow-down" id={"break-decrement"} onClick={this.decrementBreak}> </i>
                            <p id={"break-length"}> {this.state.breakLength} </p>
                            <i className="fas fa-arrow-up" id={"break-increment"} onClick={this.incrementBreak}> </i>
                        </div>
                    </div>

                    <div id={"session-label"}>
                        <p> Session Length</p>
                        <div id={"session-options"}>
                            <i className="fas fa-arrow-down" id={"session-decrement"}
                               onClick={this.decrementSession}> </i>
                            <p id={"session-length"}> {this.state.sessionLength} </p>
                            <i className="fas fa-arrow-up" id={"session-increment"}
                               onClick={this.incrementSession}> </i>
                        </div>
                    </div>
                </div>
                <div id={"timer-label"}>
                    <p> {this.state.timerLabel} </p>
                    <p id={"time-left"}> {this.timerFormatted()} </p>
                </div>

                <div id={"timer-options"}>
                    <div id={"start_stop"} onClick={this.timerState}>
                        <i className="fas fa-play"> </i>
                        <i className="fas fa-pause" id={"pause"}> </i>
                    </div>
                    <i className="fas fa-sync-alt" id={"reset"} onClick={this.reset}> </i>
                </div>

                <audio
                    src="https://github.com/eduardo-vidals/JavaScript-and-React/blob/main/Project.05_25+5Clock/Birdsong%20iPhone%20alarm.mp3?raw=true"
                    id={"beep"}
                />
            </div>
        );
    }
}

class Credits extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"credits"}>
                <p> Designed and Coded by <br/> Eduardo Vidals </p>
            </div>
        );
    }
}


export default App;
