import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR} from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loading: false,
    error: null
}

export default function quizReducer(state = initialState, action){
    switch(action.type){
        case FETCH_QUIZES_START: console.log("Start");return {
            ...state,
            loading: true
        }
        case FETCH_QUIZES_SUCCESS: console.log("success");return {
            ...state,
            loading: false,
            quizes: action.quizes
        }
        case FETCH_QUIZES_ERROR: return {
            ...state,
            error: action.error
        }
        default: return state;
    }
}