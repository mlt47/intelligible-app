import React from 'react';
import '../css/App.css';
import {Word} from './Word';

export const App = () => {
    const text = "A sample sentence for eye tracking";

    console.log("Render App");
    return <div className="App">
        <header className="App-header">
            <p>{
                text.split(" ").map(word => <React.Fragment>
                    <Word word={word} />{" "}
                </React.Fragment>)
            }</p>
        </header>
    </div>;
};