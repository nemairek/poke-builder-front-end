import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'


const Dashboard = ({myPokemon}) => {
  const user = useContext(AuthedUserContext);

  
const releasePokemon = (pokemon) => {
const pokeTeam = myPokemon.filter(pal => pal.name !== pokemon.name) ;

}

  return (
    <main>
      <h1>{user.username}'s Pokemon</h1>
      <h2>
        Here are your pokemon
      </h2>
    

       { myPokemon.map((pokemon, index) => (
        <>           
        <img src={pokemon.image} />
        <h2>NAME: {pokemon.name}</h2>
        <h3>POKE-ID: {pokemon.pokeId}</h3>
        <ul>
         <h3>Type:</h3>
         {pokemon.type.map((type) => <li key={type}>{type}</li>  )}
        </ul>
        <ul>
         <h3>Abilities:</h3>
         {pokemon.abilities.map((ability) => <li key={ability}>{ability}</li>  )}
        </ul>
        <ul><button onClick={releasePokemon}>Release</button></ul>
        
          </>
        ))}

    </main>
  );
};

export default Dashboard;
