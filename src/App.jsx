import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Chat from "./pages/Chat";
import { SpeechProvider } from "./context/speechContext";

const App = () => {
  return (
    <SpeechProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </SpeechProvider>
  );
};

export default App;
