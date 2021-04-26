import React from 'react';


// Theme context, default to light theme
const ThemeContext = React.createContext({
  value: "test",
  setContext: () => {}
});

export { ThemeContext }