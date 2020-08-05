import React from 'react';
import {ProgressIndicatorComponent} from "../progressIndicator";
import withStyles from "@material-ui/core/styles/withStyles";
import {BasePath} from "../../contants";

import "./notebook.scss";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = () => ({
    root: {
        marginLeft: "20px",
        width: "calc(100% - 20px)"
    }
});

class NotebookComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usage: null,
            preprocess: null,
            config: null
        };

        this.classes = this.props.classes;
    }

    componentDidMount() {
        fetch(`${BasePath}/${this.props.modelDir}/result.json`)
            .then(res => res.json())
            .then(config => {
                console.log(`${BasePath}/${this.props.modelDir}/${config.Preprocessing}`);

                const prepPromise = fetch(`${BasePath}/${this.props.modelDir}/${config.Preprocessing}`).then(res => res.text());
                const usagePromise = fetch(`${BasePath}/${this.props.modelDir}/${config.Usage}`).then(res => res.text());

                Promise.all([prepPromise, usagePromise]).then(values => {
                    this.setState({
                        preprocess: values[0],
                        usage: values[1],
                        config: config
                    });
                });
            });
    }

    render() {
        if (this.state.config === null) {
            return (
                <ProgressIndicatorComponent/>
            );
        } else {
            const openLink = (url) => {
                const win = window.open(url, "__blank");
                if (win != null) {
                    win.focus();
                }
            }

            const preprocessingHtml = () => {
                if (this.state.preprocess === "404: Not Found") {
                    return <div/>
                } else {
                    return (
                        <div>
                            <span className="notebook-header">Preprocessing stage</span>
                            <div dangerouslySetInnerHTML={{__html: this.state.preprocess}}
                                 className={this.props.isDesktop ? "notebook-component-container" : "notebook-component-container-mb"}/>
                            <br/>
                        </div>
                    )
                }
            }

            const tags = () => {
                return (
                    <Grid container spacing={2} style={{width: "100%"}}>
                        {this.state.config.Tags.map((elem) => {
                            return (
                                <Grid item>
                                    <div className="notebook-tags">
                                        <span className="notebook-tag-text"> {elem} </span>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                )
            }

            const publishers = () => {


                return (
                    <div>
                        <span className="notebook-header" style={{position: "relative", top: "10px"}}>Publishers</span>
                        <br/>
                        <Grid container spacing={2}
                              style={{width: "100%", position: "relative", marginTop: "10px", marginBottom: "10px"}}>
                            {this.state.config.Publisher.map((elem) => {
                                return (
                                    <Grid item>
                                        <Button style={{color: "#40AED1", borderColor: "#40AED1"}}
                                                variant="outlined" onClick={() => openLink(elem[1])}>
                                            <span className="notebook-publisher-text"> {elem[0]} </span>
                                        </Button>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                )
            }

            const moreStuff = () => {
                return (
                    <div style={{width: "min(600px, 100%)"}}>
                        <span className="notebook-header" style={{position: "relative", top: "10px"}}>More Information</span>
                        <br/>
                        <Grid container spacing={2} style={{width: "100%", marginTop: "20px", marginLeft: "10px"}}>
                            <Grid item>
                                <div className="notebook-tags">
                                    <span
                                        className="notebook-tag-text"> {`Architecture: ${this.state.config.Architecture}`} </span>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="notebook-tags">
                                    <span
                                        className="notebook-tag-text"> {`Problem Domain: ${this.state.config["Problem Domain"]}`} </span>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="notebook-tags">
                                    <span
                                        className="notebook-tag-text"> {`Model Format: ${this.state.config["Model Format"]}`} </span>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="notebook-tags">
                                    <span
                                        className="notebook-tag-text"> {`Language: ${this.state.config["Language"]}`} </span>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )
            }

            return (
                <div className={this.classes.root}>
                    {tags()}
                    <br/>
                    {publishers()}
                    <br/>
                    {preprocessingHtml()}
                    <span className="notebook-header">Usage</span>
                    <div dangerouslySetInnerHTML={{__html: this.state.usage}}
                         className={this.props.isDesktop ? "notebook-component-container" : "notebook-component-container-mb"}/>
                    {moreStuff()}
                </div>
            );
        }
    }
}

export default withStyles(styles)(NotebookComponent);