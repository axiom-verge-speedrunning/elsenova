import ApolloClient from 'apollo-boost';
import fetch from 'cross-fetch';

const client = new ApolloClient({ fetch, uri: 'https://api.sudra-routes.com/api/v1/graphql/' });

export default client;
