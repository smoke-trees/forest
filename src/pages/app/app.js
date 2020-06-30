import React from 'react';

import NotebookComp from '../../components/notebookComp';
import withStyles from "@material-ui/core/styles/withStyles";
import {Route, Switch, Link} from "react-router-dom";

const styles = (theme) => ({});

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: []
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/repos/smoke-trees/model-zoo/contents/').then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    models: data.filter(elem => elem.type === 'dir')
                })
            })
    }

    render() {
        if (this.state.models.length === 0) {
            return (
                <>
                    <h1>Loading</h1>
                </>
            )
        } else {

            return (
                <div>
                    <ul>
                        {this.state.models.map((elem, idx) => {
                            return (<li key={idx.toString()}>
                                <Link to={`/${elem.path}`}>{elem.name}</Link>
                            </li>)
                        })}
                    </ul>

                    <Switch>
                        {this.state.models.map((elem, idx) => {
                            console.log(elem)
                            return (
                                <Route key={idx.toString()} path={`/${elem.path}`}>
                                    <NotebookComp modelDir={elem.name}/>
                                </Route>
                            )
                        })}
                    </Switch>
                </div>
            )
        }
    }

}

export default withStyles(styles)(App);
