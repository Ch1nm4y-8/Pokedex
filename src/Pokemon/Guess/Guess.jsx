import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';



const Guess = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null)
  const [originalSVG, setoriginalSVG] = useState(null)
  const [showPokemon, setshowPokemon] = useState(false)
  const [pokemonGuess, setpokemonGuess] = useState("")


  const randomGen = () => {
    let num = Math.floor(Math.random() * (650 - 1 + 1)) + 1;
    return num;
  }

  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      const id = randomGen();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const jdata = await response.json();
      setData(jdata);


      return jdata.sprites.other.dream_world.front_default;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching Pokémon data:", error);
    }
  }

  const fetchAndModifySVG = async () => {
    const url = await fetchRandomPokemon();
    if (url) {
      try {
        const response = await fetch(url);
        const svgText = await response.text();

        setoriginalSVG(svgText)
        const modifiedSVG = svgText.replace(/<path /g, '<path fill="black" ');
        document.getElementById("svg-container").innerHTML = modifiedSVG;
        setLoading(false);


      } catch (error) {
        console.error("Error fetching SVG:", error);
      }
    }
  };

  const onGuessHandler = () => {

    if (pokemonGuess == data.name) {
      toast.success("Yes! It's Correct")
    }
    else {
      toast.error('Wrong Answer!!!')
    }
    setshowPokemon(true)
    document.getElementById("svg-container").innerHTML = originalSVG;
  }

  const nextPokemonHandler = () => {
    setshowPokemon(false)
    setpokemonGuess("")
    fetchAndModifySVG();

  }

  useEffect(() => {
    fetchAndModifySVG();
  }, []);


  return (
    <div style={{ overflow: 'hidden' }}>

      <style>
        @import url('https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&display=swap');
      </style>
      {loading && <Loader />}

      <div className={`guess ${loading ? 'hidden' : 'visible'}`}>
        <div className="guessimagecontainer">
          <span className={showPokemon ? 'visible displayName' : 'invisible displayName'}>{data ? data.name : ""}</span>
          <img className='guesspokemonbg' src={showPokemon ? "/2.png" : "/1.png"} alt="" />
          <div id="svg-container" className='guesspokemonsvg'></div>
        </div>

        <div className='guesspokemoninputdiv'>
          <div className='guessbuttondiv'>
            <input onChange={(e) => { setpokemonGuess(e.target.value) }} type="text" value={[pokemonGuess]} placeholder='Pokemon name' className='guesspokemoninput' />
            <button className='guessbutton' onClick={onGuessHandler}>Guess</button>
          </div>
          <button className='NextPokemon' onClick={nextPokemonHandler}>Next Pokemon</button>
        </div>

      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Guess;
