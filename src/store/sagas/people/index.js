import {call, apply, take, fork, put, select, takeEvery} from "redux-saga/effects";
import {LOCATION_CHANGE} from "connected-react-router";
import {LOAD_PEOPLE, LOAD_PEOPLE_FAILURE, LOAD_PEOPLE_SUCCESS} from "../../reducers/people/actions";
import {selectPeople} from "../../reducers/people/selectors";
import {matchPath} from "react-router-dom";
import {getRouterConfig, MAIN_ROUTE, PEOPLE_DETAILS_ROUTE} from "../../../routes";
import {
    LOAD_USER_DETAILS,
    LOAD_USER_DETAILS_FAILURE,
    LOAD_USER_DETAILS_SUCCESS
} from "../../reducers/peopleDetails/actions";

function* loadPeopleDetails({payload}) {
    const {id} = payload;
    try{
        const request = yield call(fetch, `https://swapi.dev/api/people/${id}`);
        const data = yield apply(request, request.json);
        yield put({type: LOAD_USER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        yield put({type: LOAD_USER_DETAILS_FAILURE, payload: error});
    }



}

function* loadPeopleList({payload}) {
    const {page, search} = payload;

    try {
        const request = yield call(fetch, `https://swapi.dev/api/people?page=${page}&search=${search}`);
        const data = yield apply(request, request.json);
        yield put({type: LOAD_PEOPLE_SUCCESS, payload: data});
    } catch (error) {
        yield put({type: LOAD_PEOPLE_FAILURE, payload: error});
    }


}

//for loading people during first visit on the page
function* routeChangeSaga() {
    while (true) {
        const action = yield take(LOCATION_CHANGE);

        //matchPath сравнивает пути
        if ( matchPath(action.payload.location.pathname, getRouterConfig(MAIN_ROUTE))) {
            const people = yield select(selectPeople);
            const {page, search} = people;
            //we provide payload for our loadPeopleList
            yield put({type: LOAD_PEOPLE, payload: {page, search}});
        }

        const detailsPage = matchPath(action.payload.location.pathname, getRouterConfig(PEOPLE_DETAILS_ROUTE));

        if (detailsPage) {
            const {id} = detailsPage.params;
            if (id) {
                yield put({type: LOAD_USER_DETAILS, payload: {id}});
            }
        }

    }
}

function* peopleSaga() {
    //we watch at first enter on the page
    yield fork(routeChangeSaga);
    // we will dispatch this action manually in the components
    yield takeEvery(LOAD_PEOPLE, loadPeopleList);
    yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetails);
    //takeEvery provides type and payload for child sagas
}

export default peopleSaga;
