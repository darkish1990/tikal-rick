import React from "react";
import { useFetchUnpopularCharacter } from "../../hooks/useFetchUnpopularCharacter";
import "./Part1.css";
export const Part1 = () => {
    const { unpopularCharacter, location } = useFetchUnpopularCharacter()
    return (
        <div className="container">
            <table>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
};
