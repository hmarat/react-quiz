import axios from "../../axios/axios-quiz"
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, QUIZ_FINISHED, NEXT_QUESTION, RETRY_QUIZ} from "./actionTypes"

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

export function fetchQuiz(quizId){
    return async dispatch =>{
        dispatch(fetchQuizesStart());
        try{
            const response = await axios.get(`${quizId}.json`);
            
            dispatch(fetchQuizSuccess(response.data))
		} catch(e){
			dispatch(fetchQuizesError(e));
		}	
    }
}

export function quizSetState(answerState, results){
    return{
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function quizFinished(){
    return{
        type: QUIZ_FINISHED,
    }
}

export function nextQuestion(number){
    return{
        type: NEXT_QUESTION,
        number
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) =>{
        const state = getState().quiz;
             
		if(state.answerState)
			if(state.answerState[Object.keys(state.answerState)[0]] === "success"){
                return
            }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        
		if(question.rightAnswerId === answerId){
			if(!results[question.id]){
                results[question.id] = "success";
            }
            dispatch(quizSetState({[answerId]: "success"}, results))            
            
			if(!isQuizFinished(state)){
				const timeout = setTimeout(()=>{
                    dispatch(nextQuestion(state.activeQuestion + 1));
					clearTimeout(timeout);
				}, 1000)
			}
			else{
				dispatch(quizFinished())
			}
		}
		else{
            results[question.id] = "error";
            dispatch(quizSetState({[answerId]: "error"}, results))
		}
    }
}

export function fetchQuizSuccess(quiz){
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function retryQuiz(){
    return {
        type: RETRY_QUIZ
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

const isQuizFinished = state => {
    return state.activeQuestion + 1 === state.quiz.length;
}