const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/pokemon`;


const getPokemon = async (pokename) => {
    console.log(pokename)
    try {
        const res = await fetch(`${BACKEND_URL}/search/${pokename}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          return res.json();
        } catch (error) {
          console.log(error);
        }
      };

      export{getPokemon}