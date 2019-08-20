import React, {useEffect} from 'react';
import '../css/App.css';
import {Word} from './Word';

function App() {
    useEffect(() => {
        window.webgazer.setGazeListener((data, elapsedTime) => {
            if (data !== null) {
                console.log(`(${data.x}, ${data.y}) ${elapsedTime}`);
            }
        }).begin();
    }, []);

    const text = "A sample sentence for eye tracking";

    console.log("Render App");
    return <div className="App">
        <header className="App-header">
            <p>{
                text.split(" ").map(word => <><Word word={word} />  </>)
            }</p>
        </header>
    </div>;
}

export default App;
