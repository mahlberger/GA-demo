import { ApolloClient, gql, InMemoryCache, makeVar } from "@apollo/client";

export const myReactiveVariable = makeVar<String>("tja");

const client = new ApolloClient({
  uri: "https://graphql-compose.herokuapp.com/northwind/",
  cache: new InMemoryCache({
    typePolicies: {
      // Type policy map
      Product: {
        fields: {
          // Field policy map for the Product type
          exampleVar: {
            // Field policy for the isInCart field
            read: (_, { variables }): String => {
              // The read function for the isInCart field
              return myReactiveVariable();
            },
          },
        },
      },
      Query: {
        fields: {
          myReactiveVariable: {
            read(): String {
              return myReactiveVariable();
            },
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});

client.writeQuery({
  query: gql`
        query WriteLocalState {
            localState {
                variable
            }
        }
    `,
  data: {
    // Contains the data to write
    localState: {
      variable: "default Local Store",
    },
  },
});

export { client };
