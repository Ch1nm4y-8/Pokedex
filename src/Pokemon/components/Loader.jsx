import React from 'react'

const Loader = ({ url = "/loader.png" }) => {
  return (
    <div className='loadercontainer' >
      <img src={url} width="50px" alt="Loading..." className='loaderimage' />
    </div>
  )
}

export default Loader
