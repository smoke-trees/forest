import React from "react";

import {App, HomePage} from "./pages";
import {Route} from "react-router";
import {BrowserRouter, Switch} from "react-router-dom";

class AppRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            models: []
        }

        this.setModels = (models) => {
            this.setState({models: models});
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/repos/smoke-trees/model-zoo/contents/').then(res => res.json())
            .then(data => {
                this.setModels(data.filter(elem => elem.type === 'dir'));
            });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {this.state.models.map((elem, idx) => {
                        return (
                            <Route key={idx.toString()} path={`/${elem.path}`}>
                                <App modelDir={elem.name} path={elem.path}/>
                            </Route>
                        )
                    })}
                    <Route path="/" component={HomePage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default AppRouter;