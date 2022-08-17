import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BASE_URL, LOCATION, ORIGIN_NAME } from "../../consts/api-consts";
import "./Part1.css";
export const Part1 = () => {
    const [location, setLocation] = useState();
    const [originLocationChars, setOriginLocationChars] = useState([]);

    useEffect(() => {
        const fetchFunction = async () => {
            try {
                const { data: locationData } = await axios.get(`${BASE_URL}/${LOCATION}/?name=${ORIGIN_NAME}`);
                setLocation(locationData.results[0]);
                await locationData.results[0].residents.forEach(async (residentDataUrlString) => {
                    const { data: residentData } = await axios.get(residentDataUrlString);
                    setOriginLocationChars((prev) => [...prev, residentData]);
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchFunction();
    }, []);
    const sortedList = useMemo(() => originLocationChars.sort((a, b) => a.episode.length - b.episode.length), [originLocationChars]);

    const unpopularCharacter = sortedList[0];
    return (
        <div className="container">
            <table>
                <tr>
                    <td>Character name</td>
                    <td>{unpopularCharacter?.name}</td>
                </tr>
                <tr>
                    <td>Origin name</td>
                    <td>{unpopularCharacter?.origin?.name}</td>
                </tr>
                <tr>
                    <td>Origin dimension</td>
                    <td>{location?.dimension}</td>
                </tr>
                <tr>
                    <td>Poplurity</td>
                    <td>{unpopularCharacter?.episode.length}</td>
                </tr>
            </table>
        </div>
    );
};
