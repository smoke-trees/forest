import React from "react";

import "./homePage.scss";
import {ReactComponent as SmokeForestLogo} from "../../res/vectors/logo.svg";
import {ReactComponent as SmokeForestWhiteLogo} from "../../res/vectors/logo-white.svg";
import {ReactComponent as SearchButtonLogo} from "../../res/vectors/magnify.svg";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {isMobile} from "react-device-detect";
import IconButton from "@material-ui/core/IconButton";
import {ReactComponent as HamLogo} from "../../res/vectors/ham.svg";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ModelPage} from "../../components";
import {Redirect, withRouter} from "react-router-dom";

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

        const mapToTabIndex = () => {
            const cat = this.props.category;
            if (cat === "models") {
                return 0;
            } else if (cat === "contributions") {
                return 1;
            } else if (cat === "issues") {
                return 2;
            } else {
                return -1;
            }
        }

        this.state = {
            desktop: {
                tabBar: {
                    value: mapToTabIndex()
                },
            },
            mobile: {
                drawer: {
                    open: false
                }
            },
            isDesktop: !isMobile,
            redirect: ""
        }

        this.setTabBar = (tabBar) => {
            this.setState({desktop: {...this.state.desktop, tabBar: tabBar}});
        }

        this.setMobileDrawer = (drawer) => {
            this.setState({mobile: {...this.state.mobile, drawer: drawer}});
        }

        this.setDesktopView = (val) => {
            this.setState({isDesktop: val});
        }

        this.windowUpdater = () => {
            if (window.innerWidth < 1300 || isMobile) {
                this.setDesktopView(false);
            } else {
                this.setDesktopView(true);
            }
        }

        this.setRedirect = (redirect) => {
            this.setState({redirect: redirect});
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.windowUpdater);
    }

    desktop() {
        const {setRedirect} = this;

        const backgroundVectors = () => {
            return (
                <div>
                    <div className="home-page-right-img-upper-rect"/>
                    <div className="home-page-right-img-lower-rect"/>
                </div>
            )
        }

        const appBar = () => {
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
                    if (value === 0) {
                        setRedirect("/models");
                    } else if (value === 1) {
                        setRedirect("/contribute");
                    } else if (value === 2) {
                        setRedirect("/issues");
                    }
                }

                return (
                    <Paper square>
                        <Tabs value={this.state.desktop.tabBar.value} onChange={handleChange} indicatorColor="primary"
                              textColor="primary" className="home-page-tab-bar"
                              TabIndicatorProps={{
                                  style: {
                                      background: '#40AFD1',
                                  }
                              }}>
                            <Tab label="Models"/>
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

        const body = () => {
            if (this.props.category === undefined) {
                return (
                    <div>
                        <SmokeForestLogo className="home-page-logo-large"/>
                        <span className="home-page-body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna dolor urna molestie quis magna. Sed purus.</span>
                        <button className="home-page-body-button"> Forest</button>
                        {backgroundVectors()}
                    </div>
                )
            } else if (this.props.category === "models") {
                return <ModelPage isDesktop={this.state.isDesktop} models={this.props.models} modelDir={this.props.modelDir}/>
            }
        }

        return (
            <div>
                {appBar()}
                {body()}
            </div>
        )
    }

    mobile() {
        const appBar = () => {

            const hamburger = () => {
                return (
                    <MuiThemeProvider theme={disableRippleTheme}>
                        <IconButton className="home-page-mobile-hamburger" onClick={
                            () => this.setMobileDrawer({...this.state.mobile.drawer, open: true})
                        }>
                            <HamLogo/>
                        </IconButton>
                    </MuiThemeProvider>
                )
            }

            const banner = () => {
                return (
                    <div>
                        <SmokeForestLogo className="home-page-mobile-banner"/>
                    </div>
                )
            }


            return (
                <div className={
                    this.state.mobile.drawer.open ? "home-page-app-bar-background-mobile send-to-back" :
                        "home-page-app-bar-background-mobile"}>
                    {hamburger()}
                    {banner()}
                </div>
            )


        }

        const drawer = () => {
            const drawerBar = () => {
                return (
                    <div>
                        <MuiThemeProvider theme={disableRippleTheme}>
                            <IconButton className="home-page-mobile-drawer-close-btn" onClick={
                                () => this.setMobileDrawer({...this.state.mobile.drawer, open: false})
                            }>
                                <CloseIcon className="home-page-mobile-drawer-close-btn-back"/>
                            </IconButton>
                        </MuiThemeProvider>
                        <SmokeForestWhiteLogo className="home-page-mobile-drawer-logo"/>
                    </div>
                )
            }

            const drawerList = () => {
                return (
                    <List className="home-page-mobile-drawer-item-container">
                        <ListItem button className="home-page-mobile-drawer-item">
                            <ListItemText> <span
                                className="home-page-mobile-drawer-list-item-inner-text">Models</span>
                            </ListItemText>
                        </ListItem>
                        <ListItem button className="home-page-mobile-drawer-item">
                            <ListItemText> <span
                                className="home-page-mobile-drawer-list-item-inner-text">Contribute</span>
                            </ListItemText>
                        </ListItem>
                        <ListItem button className="home-page-mobile-drawer-item">
                            <ListItemText> <span
                                className="home-page-mobile-drawer-list-item-inner-text">Issues</span>
                            </ListItemText>
                        </ListItem>
                    </List>
                )
            }

            if (this.state.mobile.drawer.open) {
                return (

                    <div className="home-page-mobile-drawer">
                        {drawerBar()}
                        {drawerList()}
                    </div>
                )
            } else {
                return <div/>
            }
        }

        return (
            <div>
                {appBar()}
                {drawer()}
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            const redirect = this.state.redirect;
            this.setRedirect("");
            this.props.history.push("/" + this.props.category);

            return <Redirect to={{pathname: redirect}}/>
        } else {
            if (this.state.isDesktop) {
                return this.desktop();
            } else {
                return this.mobile();
            }
        }
    }
}

export default withRouter(withStyles(styles)(HomePage));
