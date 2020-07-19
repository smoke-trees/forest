import React from "react";

import "./issues.scss";

class IssuePage extends React.Component {
    desktop() {
        return (
            <div style={{ width: 'fit-content', margin: '0 auto', marginTop: "64px", overflowY: "auto", height: "calc(100vh - 64px)"}}>
                <br/>
                <span className="issues-body-title-header">
                    Issues
                </span>
                <br/>
                <br/>
                <br/>
                <div style={{marginLeft: "40px"}}>
                    <span className="issues-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "600px", wordWrap: "break-word"}}>
                        If you run into any issues in using the model or the utility package please create the appropriate issue on our repo and label them.
                        </li>
                        <br/>
                    </span>

                    <span className="issues-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "600px", wordWrap: "break-word"}}>
                        Please note that any kind of models that have weights loaded from elsewhere will not be accepted into the model-zoo.
                        </li>
                        <br/>
                    </span>

                </div>

            </div>
        )
    }

    mobile() {
        return (
            <div style={{marginTop: "64px", marginLeft: "30px", overflowY: "auto", height: "calc(100vh - 64px)"}}>
                <br/>
                <span className="issues-body-title-header">
                    Issues
                </span>
                <br/>
                <br/>
                <br/>
                <div style={{marginLeft: "10px"}}>
                    <span className="issues-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "calc(100vw - 60px)", wordWrap: "break-word"}}>
                        If you run into any issues in using the model or the utility package please create the appropriate issue on our repo and label them.
                        </li>
                        <br/>
                    </span>

                    <span className="issues-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "calc(100vw - 60px)", wordWrap: "break-word"}}>
                        Please note that any kind of models that have weights loaded from elsewhere will not be accepted into the model-zoo.
                        </li>
                        <br/>
                    </span>

                </div>

            </div>
        )
    }

    render() {
        if (this.props.isDesktop) {
            return this.desktop()
        } else {
            return this.mobile()
        }
    }
}

export default IssuePage;