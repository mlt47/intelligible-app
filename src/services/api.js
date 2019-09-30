import {exampleDoc} from "../documents/example";
import {NOT_FOUND} from "./constants";

const allDocs = {
    example: {id: "example", title: "Example sentence (repeated)", summary: "Try the test example sentence", processedDoc: exampleDoc},
    cae: {id: "cae", title: "Cambridge Assessment English", summary: "Cambridge Assessment English, or University of Cambridge English Language Assessment, is one of three exam boards which form the Cambridge Assessment Group, a non-teaching department of the University of Cambridge."},
    computer_lab: {id: "computer_lab", title: "Department of Computer Science and Technology", summary: "The Department of Computer Science and Technology, formerly the Computer Laboratory, is the computer science department of the University of Cambridge. The current head of department is Professor Ann Copestake."}
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
