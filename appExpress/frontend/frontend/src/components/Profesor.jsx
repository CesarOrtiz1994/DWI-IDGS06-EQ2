import React from 'react'

export default function 
(props) {


  return (
    <div>
        <h1>
            {props.titulo}
        </h1>
        <p>
        {props.children}

        </p>
    </div>
  )
}
