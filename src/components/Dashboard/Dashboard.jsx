import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'


const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null)
  const handleChange = (event) => {
    setSearch(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(search)
    const newPokemon = await pokemonService.getPokemon(search)
    setPokemon(newPokemon)
    console.log(newPokemon)
  }
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
        </div>}
    </main>
  );
};

export default Dashboard;
