import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Database from './components/Database/Database';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; 
import * as pokemonService from '../src/services/pokemonService'
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const [myPokemon, setMyPokemon] = useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };


  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemon = await pokemonService.pokeDex()
        if (pokemon.error) {
          throw new Error(pokemon.error)
        }
        setMyPokemon(pokemon)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPokemon()
  }, [user])
  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? ( 
            <>
            <Route path="/" element={<Dashboard user={user} 
            myPokemon={myPokemon} 
            />} />
           <Route path="/search" element={<Database user={user} 
           myPokemon={myPokemon} setMyPokemon={setMyPokemon}
           />} />
           </>
          ) : ( 
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
