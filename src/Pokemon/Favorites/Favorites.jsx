import React, { useEffect, useState } from 'react'
import Pokecard from '../components/Pokecard'
import Loader from '../components/Loader'
import { ToastContainer, toast } from 'react-toastify';
import { getIdsFromLocalStorageAsArray, removeIdFromLocalStorage } from '../../util/LocalStorageHelper'

const Favorites = () => {
    const [favPokemons, setfavPokemons] = useState([])
    const [loading, setloading] = useState(false)

    const fetchData = async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const jsondata = await response.json()
        return jsondata
    }

    useEffect(() => {
        const loadfavPokemons = async () => {
            setloading(true)
            let favoritesdata = getIdsFromLocalStorageAsArray();

            if (favoritesdata.length > 0) {
                const tempfavPokemons = await Promise.all(favoritesdata.map(id => fetchData(id)));
                setfavPokemons(tempfavPokemons)
            }
            setloading(false)
        }
        loadfavPokemons()
    }, [])

    const removePokemonFromFavorites = (isFav, id) => {
        const updatedFavPokemons = favPokemons.filter(pokemon => pokemon.id !== id);
        setfavPokemons(updatedFavPokemons);
        removeIdFromLocalStorage(id);
        toast('❤️Removed From Favorites')

    }


    return (<>
        {loading ? <Loader /> :
            <div className='pokemonscard'>
                {favPokemons.map((item, index) => (
                    <div key={index}>
                        <Pokecard item={item} favoriteclickHandler={removePokemonFromFavorites} isFavorite={true} />
                    </div>
                ))}
            </div>}

        {favPokemons.length == 0 && <h1 style={{ color: "white" }}>NOTHING TO DISPLAY</h1>}
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
        />
    </>
    )
}

export default Favorites
