import { useEffect, useState, useMemo } from 'react'
import { BASE_URL, LOCATION, ORIGIN_NAME } from "../consts/api-consts";
import axios from "axios";

export const useFetchUnpopularCharacter = () => {
    const [location, setLocation] = useState();
    const [originLocationCharacters, setOriginLocationCharacters] = useState([]);
    const sortedCharctersList = useMemo(() => originLocationCharacters.sort((a, b) => a.episode.length - b.episode.length), [originLocationCharacters]);
    const unpopularCharacter = sortedCharctersList[0];

    useEffect(() => {
        const fetchFunction = async () => {
            try {
                const { data: locationData } = await axios.get(`${BASE_URL}/${LOCATION}/?name=${ORIGIN_NAME}`);
                setLocation(locationData.results[0]);
                const charactersDataPromiseArray = Promise.allSettled(locationData.results[0].residents.map(async (residentDataUrlString) => {
                    const { data: residentData } = await axios.get(residentDataUrlString);
                    return residentData
                }));
                setOriginLocationCharacters((await charactersDataPromiseArray).map(fulfilledPromise => fulfilledPromise.value));
            } catch (error) {
                console.log(error);
            }
        };
        fetchFunction();
    }, []);
    return { unpopularCharacter, location }
}
