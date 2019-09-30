import React, {useState, useEffect} from "react";
import * as RS from "reactstrap";
import {LOG_RENDER} from "../../services/constants";
import {api} from "../../services/api";
import {Link} from "react-router-dom";
import {ShowLoading} from "../elements/ShowLoading";

export const Home = () => {
    const [docs, setDocs] = useState(null);
    useEffect(() => {setDocs(api.docs.getSummaries())}, []);

    LOG_RENDER && console.log("Render Home");
    return <React.Fragment>
        <p className="text-center mt-5 mb-4 pt-1">
            Pick or upload a document that you would like to read and we'll simplify the language for you!
        </p>
        <RS.ListGroup className="mb-5">
            <RS.Row>
                <RS.Col md={{offset:4, size: 4}}>
                    <RS.Button className="mb-4" color="primary text-dark" block onClick={() => window.alert("This feature is not yet implemented 🙂")}>
                        <strong>Process a new document</strong>
                    </RS.Button>
                </RS.Col>
            </RS.Row>
            <ShowLoading until={docs} thenRender={(docs) => {
                return docs.map((doc, index) => <RS.ListGroupItem key={`${doc.id}-${index}`}>
                    <RS.ListGroupItemHeading>
                        <Link to={`/documents/${doc.id}`}>
                            {doc.title}
                        </Link>
                    </RS.ListGroupItemHeading>
                    <RS.ListGroupItemText>
                        {doc.summary}
                    </RS.ListGroupItemText>
                </RS.ListGroupItem>);
            }} />
        </RS.ListGroup>
    </React.Fragment>;
};
