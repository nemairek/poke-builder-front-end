import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'





const Database = ({ myPokemon, setMyPokemon }) => {
  const user = useContext(AuthedUserContext);
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null)
  const handleChange = (event) => {
    setSearch(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const newPokemon = await pokemonService.getPokemon(search)
    setPokemon(newPokemon)
  }

  const catchPokemon = async (pokemon) => {
    const newPokemon = {
      pokeId: pokemon.id,
      name: pokemon.name,
      type: pokemon.types.map((type) => type.type.name),
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      image: pokemon.sprites.front_default,
    }
    const addPokemon = await pokemonService.addNewPokemon(newPokemon)
    setMyPokemon([...myPokemon, addPokemon])
  };

  return (
    <main id='database'>
      
      <img src='pokeball.sprites.front_default' />
      <h1>Welcome, Trainer {user.username}</h1>

      <p>
        This is the poke-builder data-bank, where you can view all existing pokemon, make note of ones you own, and make comments to hopefully advise other trainers on if a pokemon is suitible for them.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name='search' onChange={handleChange} value={search} />
        <button type='submit'>Search</button>
      </form>
      {pokemon && <div id='data'>
        <img src={pokemon.sprites.front_default} />
        <h2>NAME: {pokemon.name}</h2>
        <h3>POKE-ID: {pokemon.id}</h3>
        <ul>
          <h3>Type:</h3>
          {pokemon.types.map((type) => <li key={type.type.name}>{type.type.name}</li>)}
        </ul>
        <ul>
          <h3>Abilities:</h3>
          {pokemon.abilities.map((ability) => <li key={ability.ability.name}>{ability.ability.name}</li>)}
        </ul>

        <img src="../../assets/poke-ball.png" />
        <button onClick={() => catchPokemon(pokemon)}>Catch</button>
      </div>}
     
    </main>
  );
};



export default Database;
