export const popularityComputation = (characters, maxValue) => {
    return characters.map(character => {
        const popularity = character.episode?.length 
        const popularityPrecent = (popularity / maxValue) * 100
        const color = rollAColor()
        return { name: character.name, popularity,popularityPrecent,color }
    });
}

export const rollAColor=()=>{
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
}