ルーティング設定

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-result" element={<SearchResult />} />
    </Routes>
  );
};

export default App;