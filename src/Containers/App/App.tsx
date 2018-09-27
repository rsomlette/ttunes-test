import { Provider } from "mobx-react";
import * as React from "react";

import { stores } from "../../Stores";
import Home from "../Home/Home";

class App extends React.Component {
    public render() {
        return (
            <Provider {...stores}>
                <Home />
            </Provider>
        );
    }
}

export default App;
