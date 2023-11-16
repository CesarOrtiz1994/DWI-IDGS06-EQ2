import React, {useState} from 'react'

export default function Alumno({ titulo, detalle = "cargando Alumno"}) {

    const[valor, setValor] = React.useState(0)

  return (
    <div>
        <h2>{titulo}</h2>
        <p>{detalle}</p>
        <input type="text" onChange={(e) => setValor(e.target.value)} /> 
        <p>El valor es: {valor}</p>
    </div>
  )
}
