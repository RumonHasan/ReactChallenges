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
import UseStateApp from './components/hooks/useState/UseStateApp';
import DragAndDrop from './components/Advanced/DragAndDrop/DragAndDrop';
import MultiStepForm from './components/Intermediate/MultiStepForm/MultiStepForm';

const App = () => {
  // dummy graphql client to fetch data
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="apps">
        <MultiStepForm />
      </div>
    </ApolloProvider>
  );
};
export default App;
