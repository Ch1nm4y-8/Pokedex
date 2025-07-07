import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className='landingPage'>
            <div>
                <h1 className='landingpagetitle'>POKEDEX</h1>

                <button className='explorepokemonsbutton' onClick={() => { navigate('/pokemons') }}>Explore Pokemons</button>
            </div>
        </div>
    )
}

export default Landing
