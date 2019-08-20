import React from "react";

export const Word = ({word}) => {
    console.log(`Render word [${word}]`);
    return <span>
        {word}
    </span>
};