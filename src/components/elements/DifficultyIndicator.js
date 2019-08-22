import React from "react";
import {LOG_RENDER} from "../../services/constants";
import * as RS from "reactstrap";

export const DifficultyIndicator = ({difficultyThreshold, setDifficultyThreshold}) => {
    LOG_RENDER && console.log("Render difficulty indicator");
    return <div className="difficulty-indicator my-4">
        <RS.Label htmlFor="range" className="mr-3">Difficulty:</RS.Label>
        <input
            id="range" type="range" min="0" max="1" step="0.1"
            value={difficultyThreshold} onChange={(event) => setDifficultyThreshold(event.target.value)}
        />
        {/*<span id="output">*/}
        {/*    {difficultyThreshold}*/}
        {/*</span>*/}
    </div>;
};
