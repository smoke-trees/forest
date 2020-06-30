import React from "react";

import {App} from "./pages";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        )
    }
}

export default AppRouter;