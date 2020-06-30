import React from 'react';
import {ProgressIndicatorComponent} from "./progressIndicator";

const BASE_PATH = 'https://raw.githubusercontent.com/smoke-trees/model-zoo/master/models';

class NotebookComp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      usage: null,
      preprocess: null,
      config: null
    };
  }

  componentDidMount () {
    fetch(`${BASE_PATH}/${this.props.modelDir}/result.json`)
      .then(res => res.json())
      .then(config => {
        const prepPromise = fetch(`${BASE_PATH}/${this.props.modelDir}/${config.Preprocessing}`).then(res => res.text());
        const usagePromise = fetch(`${BASE_PATH}/${this.props.modelDir}/${config.Usage}`).then(res => res.text());

        Promise.all([prepPromise, usagePromise]).then(values => {
          console.log(values[0],values[1])
          this.setState({
            preprocess: values[0],
            usage: values[1],
            config: config
          });
        });
      });
  }

  render () {
    if (this.state.config === null) {
      return (
        <ProgressIndicatorComponent/>
      );
    } else {
      return (
        <>
          <h1>Preprocessing stage</h1>
          <div dangerouslySetInnerHTML={{ __html: this.state.preprocess }}/>
          <h1>Usage</h1>
          <div dangerouslySetInnerHTML={{ __html: this.state.usage }}/>
        </>
      );
    }
  }
}
export default NotebookComp;