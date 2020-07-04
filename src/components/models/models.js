import React from "react";

import "./models.scss";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {BasePath} from "../../contants";
import {NotebookComponent, ProgressIndicatorComponent} from "..";
import {ReactComponent as GithubDesktopLogo} from "../../res/vectors/github.svg"
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {Redirect} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const disableRippleTheme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

class ModelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0,
            selectedModel: "ALL",
            modelInfoMap: {},
            redirect: false
        }


        if (this.props.modelDir !== undefined) {
            this.state.tabValue = this.props.models.findIndex(model => model.name === this.props.modelDir) + 1;
        }

        this.setRedirect = (redirect) => {
            this.setState({redirect: redirect});
        }
    }

    componentDidMount() {
        const loadModelInfo = async () => {
            let modelInfoMap = {};

            await this.props.models.map(async (model) => {
                await fetch(`${BasePath}/${model.name}/result.json`)
                    .then(async res => await res.json()).then(async config => {
                        modelInfoMap[model.name] = config;
                        await this.setState({modelInfoMap: modelInfoMap});
                    })
            });
        }

        loadModelInfo().then();
    }

    desktop() {
        const header = () => {
            return (
                <span className="model-title-head"> Models </span>
            )
        }

        const tabs = () => {
            const handleChange = (event, value) => {
                this.setState({tabValue: value});
                if (value > 0) {
                    this.setRedirect(`/models/${this.props.models[value - 1].path}`)
                }
            }


            return (
                <MuiThemeProvider theme={disableRippleTheme}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={this.state.tabValue}
                        onChange={handleChange}
                        className="model-tabs"
                        TabIndicatorProps={{
                            style: {
                                background: '#40AFD1',
                                left: 0
                            }
                        }}
                    >
                        <Tab label="ALL"/>

                        {this.props.models.map((model) => {
                            return <Tab label={model.name}/>
                        })}
                    </Tabs>
                </MuiThemeProvider>
            )
        }

        const git = () => {

            const openLink = () => {
                const win = window.open(this.props.models[this.state.tabValue - 1]["html_url"], "__blank");
                if (win != null) {
                    win.focus();
                }
            }

            if (this.state.tabValue !== 0) {
                return (
                    <button className="model-git-desktop-button" onClick={openLink}>
                        <GithubDesktopLogo className="model-github-desktop-logo"/>
                        <span style={{top: "11px", left: "89px", position: "absolute", fontSize: "14px"}}> GITHUB</span>
                    </button>
                )
            } else {
                return <div/>
            }
        }

        const body = () => {
            if (Object.entries(this.state.modelInfoMap).length === this.props.models.length) {
                if (this.state.tabValue === 0) {
                    let items = this.props.models.map(model => {
                        return (
                            <GridListTile style={{height: "360px"}}>
                                <Card elevation={4} style={{margin: "10px"}}>
                                    <CardContent>
                                       <span
                                           className="model-grid-list-item-header"> {this.state.modelInfoMap[model.name]["Title"]}
                                           <br/><br/> </span>
                                        <span
                                            className="model-grid-list-item-text"> {this.state.modelInfoMap[model.name]["Overview"]}
                                            <br/><br/> </span>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="standard" className="model-grid-list-item-btn"
                                        onClick={() => this.setRedirect(`/models/${model.path}`)}> View </Button>
                                    </CardActions>
                                </Card>
                            </GridListTile>
                        )
                    });

                    return (
                        <GridList cellHeight={360} className="model-grid-list">
                            {items}
                        </GridList>
                    )
                } else {
                    if (this.props.modelDir !== undefined) {
                        return (
                            <Grid container spacing={3} style={{marginLeft: "500px", marginTop: "100px", overflowY: "auto", height: "40vw"}}>
                                <Grid item>
                                    <span className="model-body-title-header">{this.state.modelInfoMap[this.props.modelDir]["Title"]}</span>
                                    <br/><br/>
                                    <Box>
                                        <NotebookComponent modelDir={this.props.modelDir}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        )
                    } else {
                        return <div/>
                    }
                }

            } else {
                return <ProgressIndicatorComponent/>
            }
        }

        return (
            <div>
                {header()}
                {tabs()}
                {git()}
                {body()}
            </div>
        )
    }

    mobile() {

    }

    render() {
        if (this.state.redirect) {
            const redirect = this.state.redirect;
            this.setRedirect("");
            return <Redirect to={{pathname: redirect}}/>
        } else {

            if (this.props.isDesktop) {
                return this.desktop()
            } else {
                return this.mobile()
            }
        }
    }
}

export default ModelPage;