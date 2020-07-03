import React from 'react';
import {ProgressIndicatorComponent} from "../progressIndicator";
import withStyles from "@material-ui/core/styles/withStyles";
import {BasePath} from "../../contants";

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
                    console.log(values[0], values[1])
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
                    <h1>Preprocessing stage</h1>
                    <div dangerouslySetInnerHTML={{__html: this.state.preprocess}}/>
                    <h1>Usage</h1>
                    <div dangerouslySetInnerHTML={{__html: this.state.usage}}/>
                </div>
            );
        }
    }
}

export default withStyles(styles)(NotebookComponent);