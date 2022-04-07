import {useDispatch, useSelector} from "react-redux";
import {selectPeople} from "../store/reducers/people/selectors";
import Pagination from "./Pagination";
import {LOAD_PEOPLE} from "../store/reducers/people/actions";
import {useState} from "react";
import {Link} from "react-router-dom";

const Table = () => {
    const people = useSelector(selectPeople);
    const dispatch = useDispatch();

    const changePageHandler = (pageIndex) => {
        dispatch({
            type: LOAD_PEOPLE, payload: {
                page: pageIndex,
                search: people.search,
            }
        })
    };

    const searchHandler = (e) => {
        dispatch({
            type: LOAD_PEOPLE, payload: {
                page: 1,
                search: e.target.value,
            }
        })
    }

    return (
        <>
            <form action="#">
                <input type="text" placeholder={"Search people..."} value={people.search} onChange={searchHandler}/>
            </form>
            {
                people.loading ?
                    <div>Loading data...</div> :
                    <table border={1} width="100%">
                        <thead>
                        <tr>
                            <th>name</th>
                            <th>birth_year</th>
                            <th>eye_color</th>
                            <th>gender</th>
                            <th>hair_color</th>
                            <th>height</th>
                            <th>mass</th>
                            <th>skin_color</th>
                        </tr>
                        </thead>
                        <tbody>
                        {people?.data?.results.map(character => {
                            //because API does not provide separate ID of character
                            const id = character.url.replaceAll(/\D/g, '')
                            return <tr key={character.name}>
                                <td>{character.name}</td>
                                <td>{character.birth_year}</td>
                                <td>{character.eye_color}</td>
                                <td>{character.gender}</td>
                                <td>{character.hair_color}</td>
                                <td>{character.height}</td>
                                <td>{character.mass}</td>
                                <td>{character.skin_color}</td>
                                <td>
                                    <Link to={`/people/${id}`}>Details</Link>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
            }
            <Pagination page={people.page} total={people.data.total} onChange={changePageHandler}/>
        </>
    )
}

export default Table;
