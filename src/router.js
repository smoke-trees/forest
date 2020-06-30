import React from "react";

import {App} from "./pages";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";

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
                <Route path="/" component={App}/>
                {
                    this.state.models.map((elem, idx) => {
                    return (
                        <Route key={idx.toString()} path={`/${elem.path}`}>
                            <App modelDir={elem.name}/>
                        </Route>
                    )
                })}
            </BrowserRouter>
        )
    }
}

export default AppRouter;