import { useEffect, useState, useMemo } from 'react'
import { BASE_URL, LOCATION, ORIGIN_NAME } from "../consts/api-consts";
import axios from "axios";

export const useFetchUnpopularCharacter = () => {
    const [location, setLocation] = useState();
    const [originLocationCharacters, setOriginLocationCharacters] = useState([]);

    useEffect(() => {
        const fetchFunction = async () => {
            try {
                const { data: locationData } = await axios.get(`${BASE_URL}/${LOCATION}/?name=${ORIGIN_NAME}`);
                setLocation(locationData.results[0]);
                const charactersDataPromiseArray = Promise.allSettled(locationData.results[0].residents.map(async (residentDataUrlString) => {
                    const { data: residentData } = await axios.get(residentDataUrlString);
                    return residentData
                }));
                setOriginLocationCharacters((await charactersDataPromiseArray).filter(promise => promise.status === "fulfilled").map(promiseRespone => promiseRespone.value));
            } catch (error) {
                console.log(error);
            }
        };
        fetchFunction();
    }, []);

    const sortedCharctersList = useMemo(() => originLocationCharacters.sort((a, b) => a.episode.length - b.episode.length), [originLocationCharacters]);
    const unpopularCharacter = sortedCharctersList[0];

    return { unpopularCharacter, location }
}
