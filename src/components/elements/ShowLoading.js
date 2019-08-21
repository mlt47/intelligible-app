import React from "react";
import * as RS from "reactstrap";
import {NotFound} from "../pages/NotFound";
import {NOT_FOUND} from "../../services/constants";

const defaultPlaceholder = <div className="w-100 text-center">
    <h2 className="pt-5 pb-2">Loading...</h2>
    <RS.Spinner color="primary" />
</div>;

export const ShowLoading = ({until, children, thenRender, placeholder = defaultPlaceholder}) => {
    switch(until) {
        case null:
        case undefined:
            return placeholder;
        case NOT_FOUND:
            return <NotFound />;
        default:
            return children || (thenRender && thenRender(until));
    }
};
