import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { pokeId } from '../Database/Database'


const Dashboard = ({ myPokemon, setMyPokemon }) => {
  const [pokemon, setPokemon] = useState(null);
  const user = useContext(AuthedUserContext);
const navigate = useNavigate()

  const [formData, setFormData] = useState({ text: '' })

  const freePokemon = async (evt, pokemon) => {
    console.log(pokemon)
    const releasedPokemon = await pokemonService.releasePokemon(pokemon._id);
    setMyPokemon(myPokemon.map((myPokemon) => myPokemon._id !== releasedPokemon._id));
    navigate('/');

  }

  const handleChangeComment = (evt) => {
   
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmitComment = async (evt, pokemon) => {
    evt.preventDefault();
    const addNewComment = await pokemonService.createComment(formData, pokemon._id)
    console.log(addNewComment)
    setFormData({ text: '' });
  };




  return (
    <main>
      <h1>{user.username}'s Pokemon</h1>
      <h2>
        Here are your pokemon
      </h2>


      {myPokemon.map((pokemon, index) => (
        <div key={pokemon._id}>
          <img src={pokemon.image} />
          <h2>NAME: {pokemon.name}</h2>
          <h3>POKE-ID: {pokemon.pokeId}</h3>
          <ul>
            <h3>Type:</h3>
            {pokemon.type.map((type) => <li key={type}>{type}</li>)}
          </ul>
          <ul>
            <h3>Abilities:</h3>
            {pokemon.abilities.map((ability) => <li key={ability}>{ability}</li>)}
          </ul>

          <>
            <ul>
              <button onClick={(evt) => freePokemon(evt, pokemon)}>Release</button>
            </ul>
          </>
          <>
            <form onSubmit={(evt) => handleSubmitComment(evt, pokemon)}>
              <label htmlFor="text-input">Your comment:</label>
              <textarea
                required
                type="text"
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChangeComment}
              />
              <button type="submit">SUBMIT COMMENT</button>
            </form>
            {pokemon.comments.map(comment => <div key={comment._id}>
              <p>{comment.text}</p>
              {/* <p>{comment.author._id}</p> */}
              <button>UPDATE</button>
              
            </div>) }
          </>
        </div>
      ))}

    </main>
  );
};

export default Dashboard;


