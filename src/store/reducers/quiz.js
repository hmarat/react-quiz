import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_RETRY} from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loading: false,
    error: null,//
	results: [],
	isFinished: false,
	answerState: null,
	activeQuestion: 0,
	quiz: []
}

export default function quizReducer(state = initialState, action){
    switch(action.type){
        case FETCH_QUIZES_START: return {
            ...state,
            loading: true
        }
        case FETCH_QUIZES_SUCCESS: return {
            ...state,
            loading: false,
            quizes: action.quizes
        }
        case FETCH_QUIZES_ERROR: return {
            ...state,
            error: action.error
        }
        case FETCH_QUIZ_SUCCESS: return{
            ...state,
            loading: false,
            quiz: action.quiz
        }
        case FETCH_QUIZ_RETRY: return{
            ...state,
            results: [],
			isFinished: false,
			answerState: null,
			activeQuestion: 0
        }
        default: return state;
    }
}