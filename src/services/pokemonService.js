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

export { getPokemon, addNewPokemon, pokeDex }
