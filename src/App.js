import './App.css';
// data base
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// components
import NestedFolder from './components/Intermediate/NestedFolder/NestedFolder';
import Example from './components/FramerMotion/VerticalScrollCard/VerticalScrollCard';
import Memory from './components/Advanced/MemoryBoard/Memory';
import Game from './components/Advanced/RockPaperScissors/Game';
import CoolSubmenu from './components/Intermediate/CoolSubmenu/CoolSubmenu';
import Sidepopup from './components/Advanced/SidePopup/Sidepopup';

const App = () => {
  // dummy graphql client to fetch data
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
  });
  return (
    <>
      <Sidepopup />
    </>
  );
};
export default App;
