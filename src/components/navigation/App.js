import React from 'react';
import * as RS from "reactstrap";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {Home} from '../pages/Home';
import {Document} from '../pages/Document';
import {NotFound} from "../pages/NotFound";

export const App = () => {

    console.log("Render App");
    return <div className="d-flex flex-column vh-100">
        <Router>
            <header className="bg-dark text-light">
                <RS.Navbar className="px-5 py-3">
                    <RS.NavbarBrand tag={Link} to="/" className="text-light">
                        Intelligible.ai
                    </RS.NavbarBrand>
                </RS.Navbar>
            </header>
            <main className="bg-light flex-fill">
                <RS.Container className="my-5">
                    <Switch>
                        <Route exact path="/(index)?" component={Home} />
                        <Route path="/documents/:documentId" component={Document} />
                        <Route component={NotFound} />
                    </Switch>
                </RS.Container>
            </main>
            <footer className="mt-auto bg-dark text-light">
                <RS.Container className="my-3 d-flex justify-content-between">
                    <div>Left-hand text</div>
                    <div>Right-hand text</div>
                </RS.Container>
            </footer>
        </Router>
    </div>;
};
