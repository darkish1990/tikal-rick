import React from 'react'
import './Legend.css'

export const Legend = ({ characters }) => {
  return (
    <div className='legend-container'>
      {characters.map(character => {
        return <div key={`legend ${character.id}`} className='single-name'><div className='sqaure' style={{ background: character.color }}></div><div>{character.name} {Math.round(character.popularityPrecent)}%</div></div>
      })}
    </div>
  )
}
