import React from 'react';
import {ThemeContext} from "../contexts";

export default function Context() {

  return (<ThemeContext.Consumer>
    {(data) => {
      const {context, setContext} = data;

      return <div><input value={context} onChange={(e) => {
        setContext(e.target.value)
      }}/>, value: {context}</div>
    }}
  </ThemeContext.Consumer>)

}