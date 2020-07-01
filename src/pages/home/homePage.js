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
            desktop: {
                tabBar: {
                    value: -1
                },
            },
            mobile: {
                drawer: {
                    open: false
                }
            },
            isDesktop: !isMobile
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
    }

    componentDidMount() {
        window.addEventListener("resize", this.windowUpdater);
    }

    desktop() {
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
                }

                return (
                    <Paper square>
                        <Tabs value={this.state.desktop.tabBar.value} onChange={handleChange} indicatorColor="primary"
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

        const body = () => {
            return (
                <div>
                    <SmokeForestLogo className="home-page-logo-large"/>
                    <span className="home-page-body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna dolor urna molestie quis magna. Sed purus.</span>
                    <button className="home-page-body-button"> Forest</button>
                </div>
            )
        }

        return (
            <div>
                {backgroundVectors()}
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

            if (this.state.mobile.drawer.open) {
                return (

                    <div className="home-page-mobile-drawer">
                        {drawerBar()}
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
        if (this.state.isDesktop) {
            return this.desktop();
        } else {
            return this.mobile();
        }
    }
}

export default withStyles(styles)(HomePage);
