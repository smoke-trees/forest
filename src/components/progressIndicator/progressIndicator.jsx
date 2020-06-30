import React from "react";
import "./progressIndicator.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    content: {
        marginBottom: 12
    }
});


class ProgressIndicatorComponent extends React.Component {
    constructor(props) {
        super(props)

        this.classes = this.props.classes;
    }

    dialog() {
        const {classes} = this;

        return (
            <Dialog open={true}>
                <DialogContent className={classes.content}>
                    {this.indicator()}
                </DialogContent>

            </Dialog>
        )
    }

    indicator() {
        return (
            <div className="dank-ass-loader-main">
                <div className="dank-ass-loader">
                    <div className="row">
                        <div className="arrow up outer outer-18"/>
                        <div className="arrow down outer outer-17"/>
                        <div className="arrow up outer outer-16"/>
                        <div className="arrow down outer outer-15"/>
                        <div className="arrow up outer outer-14"/>
                    </div>
                    <div className="row">
                        <div className="arrow up outer outer-1"/>
                        <div className="arrow down outer outer-2"/>
                        <div className="arrow up inner inner-6"/>
                        <div className="arrow down inner inner-5"/>
                        <div className="arrow up inner inner-4"/>
                        <div className="arrow down outer outer-13"/>
                        <div className="arrow up outer outer-12"/>
                    </div>
                    <div className="row">
                        <div className="arrow down outer outer-3"/>
                        <div className="arrow up outer outer-4"/>
                        <div className="arrow down inner inner-1"/>
                        <div className="arrow up inner inner-2"/>
                        <div className="arrow down inner inner-3"/>
                        <div className="arrow up outer outer-11"/>
                        <div className="arrow down outer outer-10"/>
                    </div>
                    <div className="row">
                        <div className="arrow down outer outer-5"/>
                        <div className="arrow up outer outer-6"/>
                        <div className="arrow down outer outer-7"/>
                        <div className="arrow up outer outer-8"/>
                        <div className="arrow down outer outer-9"/>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.dialog()
    }
}

export default withStyles(styles)(ProgressIndicatorComponent);