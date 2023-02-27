import './App.css';
// data base
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Database from './components/Databases/GraphQl/Database';
import MapFunction from './components/Functions/MapFunction';
import UseEffectApp from './components/hooks/useEffect/UseEffect';
import BasicAddingStuff from './components/hooks/useState/BasicAddingStuff';
// todo app
import TodoApp from './components/Advanced/TodoApp/App';
// moving submenu
import MovingSubmenu from './components/Advanced/MovingSubmenu/MovingSubmenu';

const App = () => {
  // dummy graphql client to fetch data
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="apps">
        <MovingSubmenu />
      </div>
    </ApolloProvider>
  );
};
export default App;
