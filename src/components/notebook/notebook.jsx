import React from 'react';
import {ProgressIndicatorComponent} from "../progressIndicator";
import withStyles from "@material-ui/core/styles/withStyles";
import {BasePath} from "../../contants";

import "./notebook.scss";

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
            return (
                <div className={this.classes.root}>
                    <span className="notebook-header">Preprocessing stage</span>
                    <div dangerouslySetInnerHTML={{__html: this.state.preprocess}} className="notebook-component-container"/>
                    <br/>
                    <span className="notebook-header">Usage</span>
                    <div dangerouslySetInnerHTML={{__html: this.state.usage}} className="notebook-component-container"/>
                </div>
            );
        }
    }
}

export default withStyles(styles)(NotebookComponent);