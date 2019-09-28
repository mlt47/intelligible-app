import {exampleDoc} from "../documents/example";
import {NOT_FOUND} from "./constants";

const allDocs = {
    example: {id: "example", title: "Example sentence (repeated)", summary: "Try the test example sentence", processedDoc: exampleDoc},
    dogs: {id: "cae", title: "Cambridge Assessment English", summary: "Cambridge Assessment English, or University of Cambridge English Language Assessment, is one of three exam boards which form the Cambridge Assessment Group, a non-teaching department of the University of Cambridge."},
    menageries: {id: "menageries", title: "Menageries", summary: "A menagerie is a collection of captive animals, frequently exotic, kept for display; or the place where such a collection is kept, a precursor to the modern zoological garden."}
};

export const api = {
    docs: {
        get: (id) => {
            const doc = allDocs[id];
            return (doc && doc.processedDoc) ? {title: doc.title, doc: doc.processedDoc} : NOT_FOUND;
        },
        getSummaries: () => {
            return Object.values(allDocs).map(({id, title, summary}, index) => ({id, title, summary}));
        }
    }
};
