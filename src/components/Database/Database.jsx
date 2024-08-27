import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'





const Database = ({myPokemon, setMyPokemon}) => {
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

const catchPokemon = () => {
if (pokemon) {
setMyPokemon((previous) => [...previous, pokemon])
}
};

  return (
    <main>
      <h1>Welcome, Trainer {user.username}</h1>
      <p>
        This is the poke-builder data-bank, where you can view all existing pokemon, make note of ones you own, and make comments to hopefully advise other trainers on if a pokemon is suitible for them.
      </p>
      <form onSubmit = {handleSubmit}>
        <input type="text" name = 'search' onChange = {handleChange} value = {search}/>
        <button type='submit'>Search</button>
      </form>
      {pokemon && <div> 
        <p>{pokemon.name}</p>
        <img src={pokemon.sprites.front_default} />
        <ul>
         <h3>Type</h3>
         {pokemon.types.map((type) => <li>{type.type.name}</li>  )}
        </ul>
        <ul>
         <h3>Abilities</h3>
         {pokemon.abilities.map((ability) => <li>{ability.ability.name}</li>  )}
        </ul>
        <img src="ball/beast.png"/>
        <button onClick={catchPokemon}>Catch</button>
        </div>}
    </main>
  );
};

export default Database;
