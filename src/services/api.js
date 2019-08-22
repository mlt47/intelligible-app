import {exampleDoc} from "../documents/example";
import {NOT_FOUND} from "./constants";

const allDocs = {
    example: {id: "example", title: "Example sentence", summary: "Try the test example sentence", processedDoc: exampleDoc},
    dogs: {id: "dogs", title: "Dogs", summary: "Read up about dogs"},
    menageries: {id: "menageries", title: "Menageries", summary: "Find out about one of Russel's favourite words - menagerie"}
};

export const api = {
    docs: {
        get: (id) => {
            const doc = allDocs[id];
            return (doc && doc.processedDoc) ? doc.processedDoc : NOT_FOUND;
        },
        getSummaries: () => {
            return Object.values(allDocs).map(({id, title, summary}, index) => ({id, title, summary}));
        }
    }
};
