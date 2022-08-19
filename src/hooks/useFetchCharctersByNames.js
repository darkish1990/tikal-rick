import { useEffect, useState } from 'react'
import { BASE_URL, CHARACTERS_NAMES, CHARACTER } from "../consts/api-consts";
import axios from "axios";

export const useFetchCharctersByNames = () => {
    const [characters, setCharacters] = useState([])
    useEffect(() => {
        const fetchFunction = async () => {
            try {
                const promisesArray = CHARACTERS_NAMES.map(async (character) => {
                    return await axios.get(`${BASE_URL}/${CHARACTER}/?name=${character}`);
                })
                setCharacters((await Promise.allSettled(promisesArray)).filter(promise => promise.status === "fulfilled").map(promiseRespone => promiseRespone.value.data.results[0]))
            } catch (error) {
                console.log(error);
            }
        };
        fetchFunction();
    }, []);

    return { characters }
}
