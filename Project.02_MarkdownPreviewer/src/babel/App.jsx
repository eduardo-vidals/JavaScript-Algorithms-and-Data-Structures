/* eslint-disable import/first */

import './App.css';
import React from "react";
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import themeStyle from 'react-syntax-highlighter/dist/esm/styles/prism/twilight'
import remarkGfm from 'remark-gfm'
import remarkBreaks from "remark-breaks";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainHeight: 0,
            columnHeight: 0,
            textAreaHeight: 0
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        let screenHeight = document.getElementById("app-wrapper").clientHeight;
        let headerHeight = document.getElementById("header").clientHeight;
        let footerHeight = document.getElementById("footer").clientHeight;
        let textAreaTopHeight = document.getElementById("editor-top").clientHeight;
        let containerHeight = screenHeight - headerHeight - footerHeight;
        let textAreaHeight = screenHeight - headerHeight - textAreaTopHeight - footerHeight;
        this.setState({
            mainHeight: headerHeight,
            columnHeight: containerHeight,
            textAreaHeight: textAreaHeight
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.updateDimensions();
            window.addEventListener('resize', this.updateDimensions);
        }, 0)
    }

    render() {
        return (
            <div id={"app-wrapper"}>
                <Header/>
                <Main mainHeight={this.state.mainHeight}
                      columnHeight={this.state.columnHeight}
                      textAreaHeight={this.state.textAreaHeight}
                />
                <Footer/>
            </div>

        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <header id={"header"}>
                <h1 id={"header-title"}> React Markdown Previewer </h1>
            </header>
        );
    }
}

let placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div> </div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: placeholder
        }
        this.updatePreview = this.updatePreview.bind(this);
    }

    updatePreview(event) {
        this.setState({
            markdown: event.target.value,
        })
    }

    render() {
        return (
            <main id={"main"} style={{top: this.props.mainHeight}}>
                <div id={"editor-div"} className={"column"} style={{height: this.props.columnHeight}}>
                    <div id={"editor-top"}>
                        <i id={"editor-icon"} className={"fas fa-edit"}> </i>
                        <p id={"editor-text"}> Markdown </p>
                    </div>

                    <div id={"editor-wrapper"}>
                        <textarea id={"editor"} value={this.state.markdown}
                                  onChange={this.updatePreview} style={{height: this.props.textAreaHeight}}> </textarea>
                    </div>
                </div>
                <div id={"preview-div"} className={"column"} style={{height: this.props.columnHeight}}>
                    <div id={"preview-top"}>
                        <i id={"preview-icon"} className="fas fa-eye"> </i>
                        <p id={"preview-text"}> Preview </p>
                    </div>

                    <div id={"preview"} style={{height: this.props.textAreaHeight}}>
                        <ReactMarkdown children={this.state.markdown} remarkPlugins={[[remarkGfm], [remarkBreaks]]}
                                       components={{
                                           a: ({...props}) => <a target={"_blank"}{...props}/>,
                                           code({inline, className, children, ...props}) {
                                               const match = /language-(\w+)/.exec(className || '')
                                               return !inline && match ? (
                                                   <SyntaxHighlighter
                                                       children={String(children).replace(/\n$/, '')}
                                                       customStyle={{margin: 0, paddingLeft: "10px"}}
                                                       style={themeStyle}
                                                       showLineNumbers={true}
                                                       language={match[1]}
                                                       PreTag="div"
                                                       {...props}
                                                   />
                                               ) : (
                                                   <code className={className} {...props} >
                                                       {children}
                                                   </code>
                                               )
                                           }
                                       }}/>
                    </div>
                </div>
            </main>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <footer id={"footer"}>
                <a href={"https://github.com/eduardo-vidals/JavaScript-and-React"} target={"_blank"}> <i
                    id={"github-icon"} className="fab fa-github"> </i> </a>
            </footer>
        );
    }
}

export default App;