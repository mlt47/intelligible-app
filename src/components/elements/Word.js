import React from "react";
import {LOG_RENDER} from "../../services/constants";

export const Word = ({word}) => {
    LOG_RENDER && console.log(`Render word [${word.word}]`);
    return <span>{word.word}</span>
};
