import React from 'react';
import {ProgressIndicatorComponent} from "../progressIndicator";
import withStyles from "@material-ui/core/styles/withStyles";
import {BasePath} from "../../contants";

import "./notebook.scss";
import Grid from "@material-ui/core/Grid";

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
                    <Grid container spacing={2}>
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

            return (
                <div className={this.classes.root}>
                    {tags()}
                    <br/>
                    {preprocessingHtml()}
                    <span className="notebook-header">Usage</span>
                    <div dangerouslySetInnerHTML={{__html: this.state.usage}}
                         className={this.props.isDesktop ? "notebook-component-container" : "notebook-component-container-mb"}/>
                </div>
            );
        }
    }
}

export default withStyles(styles)(NotebookComponent);