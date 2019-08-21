import React from "react";
import {Word} from "../elements/Word";
import * as RS from "reactstrap";
import {LOG_RENDER} from "../../services/constants";

export const Document = ({match: {params: {documentId}}}) => {
    const text = "A sample sentence for eye tracking";

    LOG_RENDER && console.log("Render Document");
    return <React.Fragment>
        <h1>Document: {documentId}</h1>
        <RS.Row>
            <RS.Col>{
                text.split(" ").map((word, index) => <React.Fragment key={`${word}-${index}`}>
                    <Word word={word} />{" "}
                </React.Fragment>)
            }</RS.Col>
        </RS.Row>
    </React.Fragment>;
};
