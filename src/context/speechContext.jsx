//useStateを指定

import React, { createContext, useState } from "react";

const SpeechContext = createContext();

const SpeechProvider = ({ children }) => {
  const [speechData, setSpeechData] = useState([]);

  return (
    <SpeechContext.Provider value={{ speechData, setSpeechData }}>
      {children}
    </SpeechContext.Provider>
  );
};

export { SpeechContext, SpeechProvider };
