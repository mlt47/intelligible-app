import React, {useState, useEffect} from "react";
import {Word} from "../elements/Word";
import {LOG_RENDER} from "../../services/constants";
import {ShowLoading} from "../elements/ShowLoading";
import {api} from "../../services/api";

export const Document = ({match: {params: {documentId}}}) => {
    const [processedDoc, setProcessedDoc] = useState(null);
    useEffect(() => {setProcessedDoc(api.docs.get(documentId))}, [documentId]);

    LOG_RENDER && console.log("Render Document");
    return <ShowLoading until={processedDoc} thenRender={processedDoc => <div>
        {processedDoc.map((word, index) => <React.Fragment key={`${word.word}-${index}`}>
            <Word word={word} />{" "}
        </React.Fragment>)}
    </div>} />;
};
