const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/pokemon`;


const getPokemon = async (pokename) => {
    try {
        const res = await fetch(`${BACKEND_URL}/search/${pokename}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const pokeDex = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const addNewPokemon = async (pokemon) => {
    try {
        const res = await fetch(`${BACKEND_URL}`, {
            method:'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(pokemon)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};





const releasePokemon = async (pokemon) => {
  console.log(pokemon)
    try {
      const res = await fetch(`${BACKEND_URL}/${pokemon}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  

  const createComment = async (formData, pokeId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/${pokeId}/comments`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
  };

  const deleteComment = async (pokeId, commentId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/${pokeId}/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          },
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
  }

  const editComment = async (formData, pokeId, commentId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/${pokeId}/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
  }

export { getPokemon, addNewPokemon, pokeDex, releasePokemon, createComment, deleteComment, editComment }
