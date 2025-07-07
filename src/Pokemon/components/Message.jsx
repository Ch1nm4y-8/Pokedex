import React, { useRef } from 'react'

const Message = ({Message,color}) => {

  return (
    <div className='messagecontainer'>
      <p style={{backgroundColor:color}} className='message'>{Message}</p>
    </div>
  )
}

export default Message
