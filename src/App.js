import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotebookComp from './components/notebookComp';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      models: []
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/smoke-trees/model-zoo/contents').then(res => res.json())
      .then(data => {
        this.setState({
          models: data.filter(elem => elem.type === 'dir')
        })
      })
  }

  render() {
    if (this.state.models.length === 0) {
      return (
        <>
          <h1>Loading</h1>
        </>
      )
    } else {

      return (
        <Router>
          <div>
            <ul>
              {this.state.models.map((elem, idx) => {
                return (<li key={idx.toString()}>
                  <Link to={`/${elem.name}`}>{elem.name}</Link>
                </li>)
              })}
            </ul>

            <Switch>
              {this.state.models.map((elem, idx) => {
                console.log(elem)
                return (
                  <Route key={idx.toString()} path={`/${elem.path}`}>
                    <NotebookComp modelDir={elem.name} />
                  </Route>
                )
              })}
            </Switch>
          </div>
        </Router>
      )
    }
  }

}

export default App;
