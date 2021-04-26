import React from 'react';
import {ThemeContext} from "../contexts";

export default function Update() {

  return (<ThemeContext.Consumer>
    {({value, setContext}) => (
      <div><input value={value} onChange={(e) => {setContext(e.target.value) }}/></div>
    )}
  </ThemeContext.Consumer>)

}