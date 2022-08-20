import React from 'react'
import './Part2.css'
import { useFetchCharctersByNames } from '../../hooks/useFetchCharctersByNames'
import { BarChart } from './BarChart/BarChart'
import { Legend } from './Legend/Legend'
import { popularityComputation } from '../../utils/utils'

export const Part2 = () => {
    const { characters } = useFetchCharctersByNames()
    const containerMaxValue = Math.max(...characters.map(character => character.episode?.length))
    const computedCharacters = popularityComputation(characters,containerMaxValue)
    return (
        <div className='bar-chart-container' style={{ height: `${containerMaxValue + 150}px` }}>
            <BarChart characters={computedCharacters} />
            <Legend characters={computedCharacters}  containerMaxValue={containerMaxValue}/>
        </div>
    )
}
