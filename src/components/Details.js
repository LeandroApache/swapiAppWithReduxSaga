import {useSelector} from "react-redux";
import {selectPeopleDetails} from "../store/reducers/peopleDetails/selectors";

const Details = () => {
    const peopleDetails = useSelector(selectPeopleDetails);
    if (peopleDetails.loading) {
        return <div>Loading...</div>
    }
    const {name, birth_year, skin_color, mass} = peopleDetails.data;
    return <div>
        <h2>NAME: {name}</h2>
        <div>{birth_year}</div>
        <div>SKIN COLOR: {skin_color}</div>
        <div>MASS: {mass}</div>
    </div>

};

export default Details;
