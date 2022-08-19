import React from 'react'
// import 'Part2.css'
import { useFetchCharctersByNames } from '../../hooks/useFetchCharctersByNames'

export const Part2 = () => {
    const { characters } = useFetchCharctersByNames()

    return (
        <div>{characters.map(character => {
            return <div key={character.id}>{character.name}</div>
        })}</div>
    )
}
