import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dropdown = ({ suggPokemons, dropdownRef }) => {
  const navigate = useNavigate();
  const clickHandler = (id, event) => {
    event.stopPropagation();
    navigate(`/details/${id}`)
  }

  return (
    <div className='suggestions' ref={dropdownRef}>
      <h6 >[Load more data below for more pokemons]</h6>
      {suggPokemons && suggPokemons.length > 0 && suggPokemons.map((item, index) => <div key={index} onClick={(event) => clickHandler(item.id, event)} className='suggestion'><img src={item.url} /><p>{item.name}</p></div>)}
    </div>
  )
}

export default Dropdown
