import React, {useState, useEffect} from "react";
import * as RS from "reactstrap";
import {LOG_RENDER} from "../../services/constants";
import {api} from "../../services/api";
import {Link} from "react-router-dom";
import {ShowLoading} from "../elements/ShowLoading";

export const Home = () => {
    const [docs, setDocs] = useState(null);
    useEffect(() => {setDocs(api.docs.get())}, []);

    LOG_RENDER && console.log("Render Home");
    return <React.Fragment>
        <RS.ListGroup>
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
