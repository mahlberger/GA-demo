import * as React from "react";

// Theme context, default to light theme
const ThemeContext = React.createContext<{
  context: string;
  setContext: (s: string) => void;
    }>({
      context: "",
      setContext: () => {},
    });

export { ThemeContext };
