import React from "react";

import {HomePage} from "./pages";
import {Route} from "react-router";
import {BrowserRouter, Switch} from "react-router-dom";
import ProgressIndicatorComponent from "./components/progressIndicator/progressIndicator";

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
        if (this.state.models.length === 0) {
            return <ProgressIndicatorComponent/>
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        {this.state.models.map((elem, idx) => {
                            return (
                                <Route exact key={idx.toString()} path={`/models/${elem.path}`}>
                                    <HomePage category="models" models={this.state.models}
                                              modelDir={elem.name} path={elem.path}/>
                                </Route>
                            )
                        })}

                        <Route exact path="/models" render={() => <HomePage category="models" models={this.state.models}/>}/>
                        <Route exact path="/contributions" render={() => <HomePage category="contribute"/>}/>
                        <Route exact path="/issues" render={() => <HomePage category="issues"/>}/>
                        <Route exact path="/" render={() => <HomePage/>}/>
                    </Switch>
                </BrowserRouter>
            )
        }
    }
}

export default AppRouter;