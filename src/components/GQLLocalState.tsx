import { gql, useQuery } from "@apollo/client";

import { client } from "state/apolloClient";

export default function GQLLocalState(): JSX.Element {
  const update = (value: any): void => {
    client.writeQuery({
      query: gql`
        query WriteLocalState2 {
          localState {
            variable
          }
        }
      `,
      data: {
        // Contains the data to write
        localState: {
          variable: value,
        },
      },
    });
  };

  const { data } = useQuery(gql`
    query ReadLocalState {
      localState @client {
        variable
      }
    }
  `);

  const value = data?.localState.variable ? data.localState.variable : "";

  return (
    <div>
      <input
        onChange={(e): void => {
          update(e.target.value);
        }}
        value={value}
      />
      , value: {value}
    </div>
  );
}
