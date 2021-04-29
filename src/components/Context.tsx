import * as React from "react";

import { ThemeContext } from "contexts";

const Context = (): JSX.Element => {
  return (
    <ThemeContext.Consumer>
      {(data): JSX.Element => {
        const { context, setContext } = data;

        return (
          <div>
            <input
              value={context}
              onChange={(e): void => {
                setContext(e.target.value);
              }}
            />
            , context: {context}
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Context;
