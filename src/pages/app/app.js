import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import {Redirect} from "react-router-dom";
import {NotebookComponent, ProgressIndicatorComponent} from "../../components";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "./app.scss";

const styles = () => ({
    leftGrid: {
        width: "250px",
        height: "100vh",
        backgroundColor: "#2a2a2a"
    },
    rightGrid: {
        width: "calc(100vw - 265px)",
        height: "calc(100vh - 20px)",
        overflowY: "auto"
    },
    parentGrid: {

    },
    listItem: {
        "&:hover": {
            backgroundColor: "#3699c7"
        }
    }
});

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            models: [],
            redirect: "",
            switches: null
        }

        this.classes = this.props.classes;

        this.setRedirect = (redirect) => {
            this.setState({redirect: redirect});
        }

        this.setSwitches = (switches) => {
            this.setState({switches: switches});
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/repos/smoke-trees/model-zoo/contents/').then(res => res.json())
            .then(data => {
                this.setState({
                    models: data.filter(elem => elem.type === 'dir')
                })
            })
    }

    layout() {

        const {models} = this.state;
        const {classes, setRedirect} = this;

        const injectComponent = () => {
            if (this.props.modelDir !== undefined) {
                return <NotebookComponent modelDir={this.props.modelDir}/>
            } else {
                return <div/>
            }
        }

        return (
            <div>
                <Grid container className={classes.parentGrid}>
                    <Grid item>
                        <Grid container direction="column" className={classes.leftGrid}>
                            <List>
                                {models.map((elem) => {
                                    const onItemClick = (elem) => {
                                        setRedirect(elem.path);
                                    }

                                    return (
                                        <ListItem button className={classes.listItem} onClick={() => onItemClick(elem)}>
                                            <ListItemText>
                                            <span className="app-list-item-text">
                                                {elem.name}
                                            </span>
                                            </ListItemText>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Grid>

                    <Grid item className={classes.rightGrid}>
                        {injectComponent()}
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        if (this.state.models.length === 0) {
            return (
                <ProgressIndicatorComponent/>
            )
        } else {
            if (this.state.redirect && this.state.redirect !== this.props.path) {
                return <Redirect to={this.state.redirect}/>
            } else {
                return (
                    <div>
                        {this.layout()}
                    </div>
                )
            }


        }
    }

}

export default withStyles(styles)(App);
