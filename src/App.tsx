import { useState } from "react";
import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { ApolloProvider } from "@apollo/client/react";

import Context from "components/Context";
import GQLLocalState from "components/GQLLocalState";

import Products from "views/Products";

import "App.css";
import { ThemeContext } from "contexts";
import { client } from "state/apolloClient";

function App(): JSX.Element {
  const [context, setContext] = useState("default Context");

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <div>
            <nav>
              <Link to="/">Home</Link>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/">
                <ThemeContext.Provider value={{ context, setContext }}>
                  <h2>GQL LocalState:</h2>
                  <GQLLocalState />
                  <h2>Context:</h2>
                  <Context />
                  <hr />
                  <h2>Products (graphQL remote)</h2>
                  <Products />
                </ThemeContext.Provider>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
