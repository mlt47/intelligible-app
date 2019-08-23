import React, {useState, useEffect} from "react";
import * as RS from "reactstrap";
import {Word} from "../elements/Word";
import {LOG_RENDER} from "../../services/constants";
import {ShowLoading} from "../elements/ShowLoading";
import {api} from "../../services/api";
import {withRouter} from "react-router";
import {showEyeTracker, hideEyeTracker} from "../../services/webgazer";

export const Document = withRouter(({difficultyThreshold, setDifficultyThreshold, eyeTracking, match: {params: {documentId}}}) => {
    const [processedDoc, setProcessedDoc] = useState(null);
    useEffect(() => {setProcessedDoc(api.docs.get(documentId))}, [documentId]);
    useEffect(() => {
        eyeTracking ? showEyeTracker(window.webgazer) : hideEyeTracker(window.webgazer);
        return () => {hideEyeTracker(window.webgazer)};
    }, [eyeTracking]);

    LOG_RENDER && console.log("Render Document");
    return <RS.Card>
        <RS.CardBody>
            <ShowLoading until={processedDoc} thenRender={processedDoc => <div>
                <h1>{processedDoc.title}</h1>
                <div className="increase-spacing">
                    {processedDoc.doc.map((word, index) => <React.Fragment key={`${word.word}-${index}`}>
                        {![".", ",", ":", ";"].includes(word.word) && " "}
                        <Word word={word} difficultyThreshold={difficultyThreshold} setDifficultyThreshold={setDifficultyThreshold} eyeTracking={eyeTracking} />
                    </React.Fragment>)}
                </div>
            </div>} />
        </RS.CardBody>
    </RS.Card>;
});
