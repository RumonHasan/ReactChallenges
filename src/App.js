import './App.css';
// data base
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Database from './components/Databases/GraphQl/Database';

const App = () => {
  // dummy graphql client to fetch data
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="apps">
        <Database />
      </div>
    </ApolloProvider>
  );
};
export default App;
