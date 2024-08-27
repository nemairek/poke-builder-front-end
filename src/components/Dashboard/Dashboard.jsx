import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'


const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  // const [search, setSearch] = useState('');
  
  return (
    <main>
      <h1>{user.username}'s Pokemon</h1>
      <h2>
        Here are your pokemon
      </h2>
      
    </main>
  );
};

export default Dashboard;
