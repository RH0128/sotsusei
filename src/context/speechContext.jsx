//useStateを指定
import React, { createContext, useState } from "react";

const SpeechContext = createContext();

const SpeechProvider = ({ children }) => {
  const [speechData, setSpeechData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SpeechContext.Provider
      value={{ speechData, setSpeechData, selectedIndex, setSelectedIndex }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export { SpeechContext, SpeechProvider };
