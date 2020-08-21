import React from "react";

import "./app.scss";
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
import {ModelPage, ContributionPage, IssuePage} from "../../components";
import {Redirect, withRouter} from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import {searchByTags} from "../../utils/search";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {BasePath} from "../../contants";
import ProgressIndicatorComponent from "../../components/progressIndicator/progressIndicator";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const styles = () => ({});

const disableRippleTheme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;

        this.mapToTabIndex = () => {
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
                    value: this.mapToTabIndex()
                },
                searchText: ""
            },
            mobile: {
                drawer: {
                    open: false
                }
            },
            isDesktop: !(isMobile || window.innerWidth < 1300),
            modelInfoMap: {},
            redirect: ""
        }

        this.setTabBar = (tabBar) => {
            this.setState({desktop: {...this.state.desktop, tabBar: tabBar}});
        }

        this.setSearchText = (event) => {
            this.setState({desktop: {...this.state.desktop, searchText: event.target.value}});
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

        const loadModelInfo = async () => {
            let modelInfoMap = {};

            await this.props.models.map(async (model) => {
                await fetch(encodeURI(`${BasePath}/${model.path}/result.json`))
                    .then(async res => await res.json()).then(async config => {
                        modelInfoMap[model.path] = config;
                        await this.setState({modelInfoMap: modelInfoMap});
                    })
            });
        }

        loadModelInfo().then();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.windowUpdater);
    }

    desktop() {
        const {setRedirect} = this;

        if (this.state.desktop.tabBar.value !== this.mapToTabIndex()) {
            this.setTabBar({value: this.mapToTabIndex()});
        }

        const appBar = () => {
            const searchBar = () => {
                return (
                    <Paper component="form" elevation={0} className="home-page-search-bar">
                        <InputBase
                            className="home-page-search-bar-input"
                            placeholder="SEARCH"
                            value={this.state.desktop.searchText}
                            onChange={(value) => {
                                this.setSearchText(value)
                            }}
                        />
                        <SearchButtonLogo/>
                    </Paper>
                )
            }

            const tabBar = () => {
                const handleChange = (event, value) => {
                    this.setTabBar({value: value});
                    if (value === 0) {
                        setRedirect("/forest/models");
                    } else if (value === 1) {
                        setRedirect("/forest/contributions");
                    } else if (value === 2) {
                        setRedirect("/forest/issues");
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
            const topStuff = () => {
                return (
                    <div style={{marginTop: "256px", textAlign: "center"}}>
                        <span className="home-page-desktop-top-text-ht1"> Introducing </span>
                        <br/>
                        <br/>
                        <span className="home-page-desktop-top-text-ht2">
                        A collection of pre-trained models built, curated and maintained by SmokeTrees.
                        </span>
                        <br/>
                        <br/>
                        <button className="home-page-body-button"
                                onClick={() => {
                                    this.setTabBar({value: 0});
                                    setRedirect("/forest/models");
                                }}
                                style={{marginLeft: "auto", marginRight: "auto"}}>

                            Explore Zoo
                        </button>
                    </div>
                )
            }

            const modelGrid = () => {
                if (Object.entries(this.state.modelInfoMap).length === this.props.models.length) {
                    let items = searchByTags(this.props.models, this.state.modelInfoMap, this.props.searchText)
                        .map(model => {
                            return (
                                <GridListTile style={{height: "fit-content", width: "fit-content", margin: "2px"}}>
                                    <Card elevation={4} style={{margin: "5px"}} className="home-page-desktop-grid-card">
                                        <CardContent>
                                            <span
                                                className="home-page-desktop-card-ht1"> {this.state.modelInfoMap[model.name]["Title"]} </span>
                                            <br/>
                                            <br/>
                                            <span className="home-page-desktop-card-ht2">
                                                {this.state.modelInfoMap[model.name]["Overview"]}
                                            </span>
                                            <br/>
                                            <br/>
                                            <CardActions style={{position: "absolute", bottom: "10px", left: "10px"}}>
                                                <Button className="home-page-desktop-card-btn"
                                                        onClick={() => setRedirect(encodeURI(`/forest/models/${model.path}`))}> View </Button>
                                            </CardActions>
                                        </CardContent>
                                    </Card>
                                </GridListTile>
                            )
                        });

                    items = items.slice(0, 6);

                    return (
                        <div style={{marginTop: "30px", marginBottom: "30px"}}>
                            <GridList cellHeight="360px" cellWidth="332px" className="home-page-desktop-grid-list">
                                {items}
                            </GridList>
                        </div>
                    )
                } else {
                    return <ProgressIndicatorComponent/>
                }
            }

            if (this.props.category === undefined) {
                return (
                    <div style={{overflowY: "auto", height: "calc(100vh - 64px)"}}>
                        {topStuff()}
                        {modelGrid()}
                    </div>
                )
            } else if (this.props.category === "models") {
                return <ModelPage isDesktop={this.state.isDesktop} models={this.props.models}
                                  modelDir={this.props.modelDir} searchText={this.state.desktop.searchText}
                                  setRedirect={this.setRedirect}/>
            } else if (this.props.category === "contributions") {
                return <ContributionPage isDesktop={this.state.isDesktop} setRedirect={this.setRedirect}/>
            } else if (this.props.category === "issues") {
                return <IssuePage isDesktop={this.state.isDesktop} setRedirect={this.setRedirect}/>
            }
        }

        return (
            <div>
                {appBar()}
                <div style={{marginTop: "64px"}}>
                    {body()}
                </div>
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
                <div className="app-page-app-bar-background-mobile">
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
                        <ListItem button className="home-page-mobile-drawer-item"
                                  onClick={() => {
                                      this.setRedirect("/forest/models");
                                      this.setMobileDrawer({...this.state.mobile.drawer, open: false});
                                  }}>
                            <ListItemText> <span
                                className="home-page-mobile-drawer-list-item-inner-text">Models</span>
                            </ListItemText>
                        </ListItem>
                        <ListItem button className="home-page-mobile-drawer-item" onClick={() => {
                            this.setRedirect("/forest/contributions");
                            this.setMobileDrawer({...this.state.mobile.drawer, open: false});
                        }}>
                            <ListItemText> <span
                                className="home-page-mobile-drawer-list-item-inner-text">contributions</span>
                            </ListItemText>
                        </ListItem>
                        <ListItem button className="home-page-mobile-drawer-item" onClick={() => {
                            this.setRedirect("/forest/issues");
                            this.setMobileDrawer({...this.state.mobile.drawer, open: false});
                        }}>
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

        const body = () => {
            const topStuff = () => {
                return (
                    <div style={{marginTop: "128px", textAlign: "center"}}>
                        <span className="home-page-mobile-top-text-ht1"> Introducing </span>
                        <br/>
                        <br/>
                        <span className="home-page-mobile-top-text-ht2">
                            A collection of pre-trained models built, curated and maintained by SmokeTrees.
                        </span>
                        <br/>
                        <br/>
                        <button className="home-page-body-button"
                                onClick={() => {
                                    this.setRedirect("/forest/models");
                                }}
                                style={{marginLeft: "auto", marginRight: "auto"}}>

                            Explore Zoo
                        </button>
                    </div>
                )
            }


            if (this.props.category === undefined) {
                return (
                    <div style={{overflowY: "auto", height: "calc(100vh - 64px)"}}>
                        {topStuff()}
                    </div>
                )
            } else if (this.props.category === "models") {
                return <ModelPage isDesktop={this.state.isDesktop} models={this.props.models}
                                  modelDir={this.props.modelDir} searchText={this.state.desktop.searchText}
                                  setRedirect={this.setRedirect} drawerIsOpen={this.state.mobile.drawer.open}/>
            } else if (this.props.category === "contributions") {
                return <ContributionPage isDesktop={this.state.isDesktop} setRedirect={this.setRedirect}/>
            } else if (this.props.category === "issues") {
                return <IssuePage isDesktop={this.state.isDesktop} setRedirect={this.setRedirect}/>
            }
        }

        return (
            <div>
                {appBar()}
                {drawer()}
                {body()}
            </div>
        )
    }

    render() {
        if (this.state.redirect && this.props.history.location.pathname !== this.state.redirect) {
            let redirect = this.state.redirect;
            this.setRedirect("");
            this.props.history.push(redirect);

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

export default withRouter(withStyles(styles)(App));
