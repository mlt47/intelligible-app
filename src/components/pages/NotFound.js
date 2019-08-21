import React from "react";
import {withRouter} from "react-router";
import {LOG_RENDER} from "../../services/constants";

export const NotFound = withRouter(({location: {pathname}}) => {
    LOG_RENDER && console.log("Render NotFound");
    return <React.Fragment>
        <h1>Page Not Found</h1>
        <h3 className="my-4">
            <small>We're sorry, page not found: <code>{pathname}</code></small>
        </h3>
    </React.Fragment>;
});
