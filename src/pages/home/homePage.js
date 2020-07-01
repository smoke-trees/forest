import React from "react";

import "./homePage.scss";
import {ReactComponent as SmokeForestLogo} from "../../res/vectors/logo.svg";
import {ReactComponent as SearchButtonLogo} from "../../res/vectors/magnify.svg";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";


const styles = () => ({});


const disableRippleTheme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.classes = this.props.classes;
        this.state = {
            tabBar: {
                value: -1
            }
        }

        this.setTabBar = (tabBar) => {
            this.setState({tabBar: tabBar});
        }
    }

    backgroundVectors() {
        return (
            <div>
                <div className="home-page-right-img-upper-rect"/>
                <div className="home-page-right-img-lower-rect"/>
            </div>
        )
    }

    appBar() {
        const searchBar = () => {
            return (
                <Paper component="form" elevation={0} className="home-page-search-bar">
                    <InputBase
                        className="home-page-search-bar-input"
                        placeholder="SEARCH"
                    />
                    <SearchButtonLogo/>
                </Paper>
            )
        }

        const tabBar = () => {
            const handleChange = (event, value) => {
                this.setTabBar({value: value});
            }

            return (
                <Paper square>
                    <Tabs value={this.state.tabBar.value} onChange={handleChange} indicatorColor="primary"
                          textColor="primary" className="home-page-tab-bar">
                        <Tab label="Documentation"/>
                        <Tab label="Contributions"/>
                        <Tab label="Issues"/>
                    </Tabs>
                </Paper>
            )
        }

        return (
            <div className="home-page-app-bar-background">
                <SmokeForestLogo className="home-page-logo"/>
                {searchBar()}
                <MuiThemeProvider theme={disableRippleTheme}>
                    {tabBar()}
                </MuiThemeProvider>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.backgroundVectors()}
                {this.appBar()}
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);
