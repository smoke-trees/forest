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
import {isMobile} from "react-device-detect";


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
            },
            isDesktop: !isMobile
        }

        this.setTabBar = (tabBar) => {
            this.setState({tabBar: tabBar});
        }

        this.setDesktop = (val) => {
            this.setState({isDesktop: val});
        }

        this.windowUpdater = () => {
            if (window.innerWidth < 1300 || isMobile) {
                this.setDesktop(false);
            } else {
                this.setDesktop(true);
            }
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.windowUpdater);
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

    body() {
        return (
            <div>
                <SmokeForestLogo className="home-page-logo-large"/>
                <span className="home-page-body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna dolor urna molestie quis magna. Sed purus.</span>
                <button className="home-page-body-button"> Forest </button>
            </div>
        )
    }

    desktop() {
        return (
            <div>
                {this.backgroundVectors()}
                {this.appBar()}
                {this.body()}
            </div>
        )
    }

    render() {
        if (this.state.isDesktop) {
            return this.desktop();
        } else {
            return (
                <div>
                    <h1> Mobile version under construction </h1>
                </div>
            )
        }
    }
}

export default withStyles(styles)(HomePage);
