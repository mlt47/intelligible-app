import React, {useState, useEffect} from "react";
import {Word} from "../elements/Word";
import {LOG_RENDER} from "../../services/constants";
import {ShowLoading} from "../elements/ShowLoading";
import {DifficultyIndicator} from "../elements/DifficultyIndicator";
import {api} from "../../services/api";

export const Document = ({match: {params: {documentId}}}) => {
    const [processedDoc, setProcessedDoc] = useState(null);
    useEffect(() => {setProcessedDoc(api.docs.get(documentId))}, [documentId]);
    const [difficultyThreshold, setDifficultyThreshold] = useState(1);

    LOG_RENDER && console.log("Render Document");
    return <ShowLoading until={processedDoc} thenRender={processedDoc => <div className="d-flex flex-column">
        <div>
            {processedDoc.map((word, index) => <React.Fragment key={`${word.word}-${index}`}>
                <Word word={word} difficultyThreshold={difficultyThreshold} />{" "}
            </React.Fragment>)}
        </div>
        <div className="mt-auto">
            <DifficultyIndicator difficultyThreshold={difficultyThreshold} setDifficultyThreshold={setDifficultyThreshold} />
        </div>
    </div>} />;
};
