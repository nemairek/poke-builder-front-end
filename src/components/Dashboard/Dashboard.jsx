import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'


const Dashboard = ({myPokemon}) => {
  const user = useContext(AuthedUserContext);
  // const [search, setSearch] = useState('');
  
  return (
    <main>
      <h1>{user.username}'s Pokemon</h1>
      <h2>
        Here are your pokemon
      </h2>
    

       { myPokemon.map((pokemon, index) => (
        <>
          <p> {pokemon.name} </p>
          <img src={pokemon.sprites.front_default} />
          <ul>
           <h3>Type</h3>
           {pokemon.types.map((type) => <li>{type.type.name}</li>  )}
          </ul>
          <ul>
           <h3>Abilities</h3>
           {pokemon.abilities.map((ability) => <li>{ability.ability.name}</li>  )}
          </ul>
          </>
        ))}

    </main>
  );
};

export default Dashboard;
