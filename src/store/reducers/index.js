import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import peopleReducer from "./people";
import peopleDetailsReducer from "./peopleDetails";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    peopleDetails: peopleDetailsReducer,
    people: peopleReducer
});

export default rootReducer;
