import React, {useState} from 'react';
import * as RS from "reactstrap";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {Home} from '../pages/Home';
import {Document} from '../pages/Document';
import {NotFound} from "../pages/NotFound";
import {DifficultyIndicator} from "../elements/DifficultyIndicator";

export const App = () => {
    const [difficultyThreshold, setDifficultyThreshold] = useState(1);
    const [eyeTracking, setEyeTracking] = useState(false);

    console.log("Render App");
    return <div className="d-flex flex-column vh-100">
        <Router>
            <header className="bg-dark text-light">
                <RS.Navbar className="px-5 py-3">
                    <RS.NavbarBrand tag={Link} to="/" className="text-light">
                        <span role="img" aria-label="logo">🔰</span> Intelligible.AI
                    </RS.NavbarBrand>
                    <div className="d-flex align-items-center">
                        <DifficultyIndicator difficultyThreshold={difficultyThreshold} setDifficultyThreshold={setDifficultyThreshold} />
                        <span className="ml-2" onClick={() => setEyeTracking(!eyeTracking)}>{eyeTracking ? "🙄" : "😆"}</span>
                    </div>
                </RS.Navbar>
            </header>
            <main className="bg-light flex-fill">
                <RS.Container className="my-4">
                    <Switch>
                        <Route exact path="/(index)?" component={Home} />
                        <Route path="/documents/:documentId" render={() => Document({difficultyThreshold, eyeTracking})} />
                        <Route component={NotFound} />
                    </Switch>
                </RS.Container>
            </main>
            <footer className="mt-auto bg-dark text-light">
                <RS.Container className="my-3 d-flex justify-content-between">
                    <span></span>
                    <span><span role="img" aria-label="logo">🔰</span> Intelligible.AI</span>
                </RS.Container>
            </footer>
        </Router>
    </div>;
};
