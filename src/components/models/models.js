import React from "react";

import "./models.scss";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {BasePath} from "../../contants";
import {ProgressIndicatorComponent} from "..";
import {ReactComponent as GithubDesktopLogo} from "../../res/vectors/github.svg"
import Button from "@material-ui/core/Button";

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
            modelInfoMap: {}
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
            if (this.state.tabValue !== 0) {
                return (
                    <button className="model-git-desktop-button">
                        <GithubDesktopLogo className="model-github-desktop-logo"/>
                        <span style={{top: "11px", left: "89px", position: "absolute", fontSize: "14px"}}> GITHUB</span>
                    </button>
                )
            } else {
                return <div/>
            }

        }

        const gridList = () => {

            let items = <div/>;

            if (Object.entries(this.state.modelInfoMap).length === this.props.models.length) {
                if (this.state.tabValue === 0) {
                    items = this.props.models.map(model => {
                        return (
                            <GridListTile>
                                <span className="model-grid-list-item-header"> {this.state.modelInfoMap[model.name]["Title"]} <br/><br/> </span>
                                <span
                                    className="model-grid-list-item-text"> {this.state.modelInfoMap[model.name]["Overview"]} <br/><br/> </span>
                                <Button variant="outlined" className="model-grid-list-item-btn"> View </Button>
                            </GridListTile>
                        )
                    });
                }
            } else {
                return <ProgressIndicatorComponent/>
            }

            return (
                <GridList cellHeight={240} className="model-grid-list">
                    {items}
                </GridList>
            )
        }

        return (
            <div>
                {header()}
                {tabs()}
                {git()}
                {gridList()}
            </div>
        )
    }

    mobile() {

    }

    render() {
        if (this.props.isDesktop) {
            return this.desktop()
        } else {
            return this.mobile()
        }
    }
}

export default ModelPage;