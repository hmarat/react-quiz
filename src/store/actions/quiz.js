import axios from "../../axios/axios-quiz"
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR} from "./actionTypes"

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try{
            const response = await axios.get("https://react-quiz-9637e.firebaseio.com/quizes.json");
            const quizes = [];
    
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes));
        } catch(e){
            dispatch(fetchQuizesError(e));
        }
    }
    
}

export function fetchQuizesStart(){
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return{
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizesError(error){
    return{
        type: FETCH_QUIZES_ERROR,
        error: error
    }
}