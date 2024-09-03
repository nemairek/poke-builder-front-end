import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import * as pokemonService from '../../services/pokemonService'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Dashboard = ({ myPokemon, setMyPokemon }) => {
  const [pokemon, setPokemon] = useState(null);
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ text: '' })


  const [edit, setEdit] = useState(false)

  const freePokemon = async (evt, pokemon) => {
    const releasedPokemon = await pokemonService.releasePokemon(pokemon._id);
    setMyPokemon(myPokemon.filter((myPokemon) => myPokemon._id !== releasedPokemon._id));
    navigate('/');

  }


  const handleChangeComment = (evt) => {

    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };


  const handleChangeEdit = (evt) => {

    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };



  const handleSubmitComment = async (evt, pokemon) => {
    evt.preventDefault();
    const addNewComment = await pokemonService.createComment(formData, pokemon._id)
    setMyPokemon(myPokemon.map(pokemon => pokemon._id === addNewComment._id ? addNewComment : pokemon ))
  };

  const handleDeleteComment = async (pokemon, comment) => {
    const deleteComment = await pokemonService.deleteComment(pokemon._id, comment._id)
   setMyPokemon(myPokemon.map(pokemon => pokemon._id === deleteComment._id ? deleteComment : pokemon ))
  };

  const handleEditComment = async (pokemon, comment) => {
    const editComment = await pokemonService.editComment(formData, pokemon._id, comment._id)
    setMyPokemon(myPokemon.map(pokemon => pokemon._id === editComment._id ? editComment : pokemon ))
    setEdit(false)
  }


  return (
    
    <main id='dashboard'>

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
          <button onClick={(evt) => freePokemon(evt, pokemon)}>RELEASE</button>
          <>
           {!edit && <form onSubmit={(evt) => handleSubmitComment(evt, pokemon)}>
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
            </form>}
            {pokemon.comments.map(comment => <div key={comment._id}>
              {edit === comment._id ?
              <>
              <textarea
              required      
              type="text"
              name="text"
              id="text-input"
              value={formData.text}
              onChange={handleChangeEdit}
            />
            <button onClick={() => setEdit(false)}>CANCEL</button>   <button onClick={(evt) => handleEditComment(pokemon, comment)}>UPDATE</button>
            </>
              :<p onClick={() =>setEdit(comment._id)}>{comment.text}</p>}




                <ul>
              <button onClick={(evt) => handleDeleteComment(pokemon, comment)}>DELETE</button>
              </ul>
            </div>)}
          </>
        </div>
      ))}

    </main>
  );
};

export default Dashboard;


