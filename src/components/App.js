import React from 'react';
import '../css/App.css';
import {Word} from './Word';
import '../services/webgazer.js'

export const App = () => {
    const text = "A sample sentence for eye tracking";

    console.log("Render App");
    return <div className="App">
        <header className="App-header">
            <p>{
                text.split(" ").map((word, index) => <React.Fragment key={index}>
                    <Word word={word} />{" "}
                </React.Fragment>)
            }</p>
        </header>
    </div>;
};