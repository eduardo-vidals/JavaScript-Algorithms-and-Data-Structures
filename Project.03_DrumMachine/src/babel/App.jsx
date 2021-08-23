/* eslint-disable import/first */
import './App.css';
import React from "react";

const padBank = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"app-wrapper"}>
                <Header/>
                <DrumMachine padBank={padBank}/>
            </div>
        );
    }
}

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "Sound",
        }
        this.displayName = this.displayName.bind(this);
    }

    displayName(name) {
        this.setState({
            display: name
        })
    }

    render() {
        let padBank = this.props.padBank.map((drumObj, i, bankArr) => {
            return (
                    <DrumPad
                        clip={bankArr[i].url}
                        clipId={bankArr[i].id}
                        keyCode={bankArr[i].keyCode}
                        keyTrigger={bankArr[i].keyTrigger}
                        displayName={this.displayName}
                    />
            );
        });
        return (
            <div id={"drum-wrapper"}>
                <div id={"drum-machine"}>
                    {padBank}
                </div>
                <div id={"display-wrapper"}>
                    <p id={"display"}> {this.state.display} </p>
                </div>
            </div>
        );

    }
}

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            padStyle: {
                backgroundColor: "#e7e7e7"
            }
        }
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.keyCode === this.props.keyCode) {
            this.playSound();
        }
    }

    activatePad() {
        if (this.state.padStyle.backgroundColor === "#e06868") {
            this.setState({
                padStyle: {
                    backgroundColor: "#e7e7e7"
                }
            })
        } else {
            this.setState({
                padStyle: {
                    backgroundColor: "#e06868"
                }
            });
        }
    }

    playSound() {
        const sound = document.getElementById(this.props.keyTrigger);
        sound.currentTime = 0;
        this.activatePad();
        setTimeout(() => {
            this.activatePad();
        }, 100)
        sound.play();
        console.log(this.props.clipId);
        this.props.displayName(this.props.clipId);
    }

    render() {
        return (
            <div className={"drum-pad"} onClick={this.playSound} style={this.state.padStyle} id={this.props.clipId}>
                <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}/>
                {this.props.keyTrigger}
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
            <h1 id={"header"}> DRUM PAD </h1>
        );
    }
}

export default App;
