import React, {useState, useEffect} from "react";
import * as RS from "reactstrap";
import {Word} from "../elements/Word";
import {LOG_RENDER} from "../../services/constants";
import {ShowLoading} from "../elements/ShowLoading";
import {api} from "../../services/api";
import {withRouter} from "react-router";

export const Document = withRouter(({difficultyThreshold, setDifficultyThreshold, match: {params: {documentId}}}) => {
    const [processedDoc, setProcessedDoc] = useState(null);
    useEffect(() => {setProcessedDoc(api.docs.get(documentId))}, [documentId]);

    LOG_RENDER && console.log("Render Document");
    return <RS.Card>
        <RS.CardBody>
            <ShowLoading until={processedDoc} thenRender={processedDoc => <div>
                {processedDoc.map((word, index) => <React.Fragment key={`${word.word}-${index}`}>
                    {![".", ",", ":", ";"].includes(word.word) && " "}
                    <Word word={word} difficultyThreshold={difficultyThreshold} setDifficultyThreshold={setDifficultyThreshold} />
                </React.Fragment>)}
            </div>} />
        </RS.CardBody>
    </RS.Card>;
});
