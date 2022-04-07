import {LOAD_PEOPLE, LOAD_PEOPLE_FAILURE, LOAD_PEOPLE_SUCCESS} from "./actions";

const initialPeopleState = {
    page: 1,
    search: "",
    error: null,
    loading: false,
    data: {
        results: [],
        total: 0,
    }
}

const peopleReducer = (state = initialPeopleState, action) => {
    switch (action.type) {
        case LOAD_PEOPLE:
            const {page, search} = action.payload;

            return {
                ...state,
                loading: true,
                page,
                search,
            }
        case LOAD_PEOPLE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    results: action.payload.results,
                    total: action.payload.count,
                }
            }
        case LOAD_PEOPLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default peopleReducer;
