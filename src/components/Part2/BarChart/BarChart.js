import React from 'react'
import './BarChart.css'

export const BarChart = ({ characters }) => {
    return (
        <div className='bars-container' style={{ gap: `calc(35%/${characters.length})` }} >
            {characters.map(character => {
                return (<>
                    <div
                        className='bar'
                        title={character.name}
                        style={{
                            height: `${character.popularityPrecent}%`,
                            background: character.color
                        }}>
                        <span className='character-name'>{character.name}</span>
                    </div>

                </>)
            })}
        </div>
    )
}
