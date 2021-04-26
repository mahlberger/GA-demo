import {gql, useQuery} from '@apollo/client';
import {client} from "../state/apolloClient";

export default function GQLLocalState() {

    const update = (value) => {
        client.writeQuery({
            query: gql`
                query WriteLocalState {
                    localState {
                        variable
                    }
                }`,
            data: { // Contains the data to write
                localState: {
                    variable: value,
                },
            }
        });
    }


    const { data } = useQuery(gql`
        query ReadLocalState {
            localState @client {
                variable
            }
        }
    `);

    const value = data?.localState.variable ? data.localState.variable : ""


    return <input onChange={(e) => { update(e.target.value)} } value={value} />
}