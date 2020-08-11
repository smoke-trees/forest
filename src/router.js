import React from "react";

import { App } from "./pages";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import ProgressIndicatorComponent from "./components/progressIndicator/progressIndicator";
import "./global.css";


class AppRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            models: []
        }

        this.setModels = (models) => {
            this.setState({ models: models });
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/repos/smoke-trees/model-zoo/contents/').then(res => res.json())
            .then(data => {
                this.setModels(data.filter(elem => (elem.type === 'dir' && elem.name !== ".github" && elem.name !== "tests")));
            });
    }

    render() {
        if (this.state.models.length === 0) {
            return <ProgressIndicatorComponent />
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        {this.state.models.map((elem, idx) => {
                            return (
                                <Route exact key={idx.toString()} path={encodeURI(`/forest/models/${elem.path}`)}>
                                    <App category="models" models={this.state.models}
                                        modelDir={elem.path.replace(" ", "%20")} path={elem.path} />
                                </Route>
                            )
                        })}

                        <Route exact path="/forest/models" render={() => <App category="models" models={this.state.models} />} />
                        <Route exact path="/forest/contributions" render={() => <App category="contributions" models={this.state.models} />} />
                        <Route exact path="/forest/issues" render={() => <App category="issues" models={this.state.models} />} />
                        <Route exact path="/forest" render={() => <App models={this.state.models} />} />
                    </Switch>
                </BrowserRouter>
            )
        }
    }
}

export default AppRouter;
