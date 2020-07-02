import React from "react";

import "./models.scss";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

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
        }
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
                        aria-label="Vertical tabs example"
                        className="model-tabs"
                        TabIndicatorProps={{
                            style: {
                                background:'#40AFD1',
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

        return (
            <div>
                {header()}
                {tabs()}
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