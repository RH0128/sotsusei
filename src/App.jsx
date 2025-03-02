ルーティング設定

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search-result" component={SearchResult} />
      </Switch>
    </Router>
  );
};

export default App;