/* eslint-disable import/first */
import './App.css';
import React from "react";
import AutoHeight from 'react-auto-height'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            author: "",
            color: "",
            quotes: [],
            colors: ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
                '#e74c3c', '#9b59b6', '#FB6964', '#342224',
                '#472E32', '#BDBB99', '#77B1A9', '#73A857'],
            initialColor: "",
            tweetQuote: "",
            tumblrQuote: ""
        }
        this.newQuote = this.newQuote.bind(this);
    }

    componentDidMount() {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
            .then(res => res.json())
            .then(
                (result) => {
                    let randomIndex = Math.floor(Math.random() * result.quotes.length);
                    let randomColor = Math.floor(Math.random() * this.state.colors.length);
                    this.setState({
                        isLoaded: true,
                        quotes: result.quotes,
                        text: result.quotes[randomIndex].quote,
                        author: result.quotes[randomIndex].author,
                        color: this.state.colors[randomColor],
                        initialColor: this.state.colors[randomColor]
                    });
                }
            )
    }

    newQuote() {
        // set a timeout for text + author, as it ensures that the text will
        // not pre-load before it turns white
        setTimeout(() => {
            let randomIndex = Math.floor(Math.random() * this.state.quotes.length);
            this.setState(state => ({
                text: state.quotes[randomIndex].quote,
                author: state.quotes[randomIndex].author
            }));
        }, 675);


        // random color + update the state
        let randomColor = Math.floor(Math.random() * this.state.colors.length);
        this.setState(state => ({
            color: state.colors[randomColor]
        }));

        // transition for buttons and background
        document.getElementById("root").style.transition = "background-color 2s ease";
        let all = document.getElementsByClassName("color-transition");
        for (let i = 0; i < all.length; i++) {
            all[i].style.transition = "background-color 2s ease";
        }

        // transition for text
        all = document.getElementsByClassName("text-transition");
        for (let i = 0; i < all.length; i++) {
            all[i].style.opacity = 0;
            all[i].style.transition = "opacity 675ms ease-out";
            all[i].addEventListener("transitionend", () => {
                all[i].style.opacity = 1;
                all[i].style.transition = "opacity 500ms ease-in";
                all[i].style.color = this.state.color;
                // after 675ms the state color can now be used, an initial color variable was
                // used so that the text isn't automatically updated when the DOM updates
                // the state color to the new color, so in this case, the text color updates
                // after 675ms
            })
        }

    }

    render() {
        let colorStyle = {
            backgroundColor: this.state.color
        }

        document.getElementById("root").style.backgroundColor = this.state.color;
        let tweetURL = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' +
            this.state.text + '" - ' + this.state.author);
        let tumblrURL = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' +
            encodeURIComponent(this.state.author) + '&content=' + encodeURIComponent(this.state.text) +
            '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
        return (
            <AutoHeight id="quote-box" element="div">
                <div id={"quote"} style={{color: this.state.initialColor}}>
                    <p id={"text"} className={"text-transition"}> "{this.state.text}" </p>
                    <p id={"author"} className={"text-transition"}> - {this.state.author} </p>
                </div>


                <div className={"buttons"}>
                    <ul>
                        <li>
                            <a href={tweetURL} target={"_blank"} id={"tweet-quote"}
                               className={"fab fa-twitter color-transition"} style={colorStyle}> </a>
                        </li>

                        <li>
                            <a href={tumblrURL} target={"_blank"}
                               className={"fab fa-tumblr color-transition"} style={colorStyle}> </a>
                        </li>
                    </ul>
                </div>

                <div className={"buttons new-quote-button"}>
                    <button id={"new-quote"} className={"color-transition"} type={"button"} onClick={this.newQuote}
                            style={colorStyle}>
                        New quote
                    </button>
                </div>
            </AutoHeight>
        );
    }
}

export default App;
