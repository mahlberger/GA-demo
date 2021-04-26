import './App.css';
import {client} from './state/apolloClient'
import { ApolloProvider } from '@apollo/client/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Products from "./views/Products";
import {ThemeContext} from "./contexts";
import Context from "./components/Context";
import {useState} from "react";
import GQLLocalState from "./components/GQLLocalState";


function App() {
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
                <ThemeContext.Provider value={{context, setContext}}>
                  <h2>GQL LocalState:</h2>
                  <GQLLocalState/>
                  <h2>Context:</h2>
                  <Context />
                  <hr/>
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

