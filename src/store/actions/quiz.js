import axios from "../../axios/axios-quiz"
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_RETRY} from "./actionTypes"

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
			console.log(e)
		}	
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) =>{
        const state = getState().quiz;
        const question = state.quiz[state.activeQuestion];
		const results = state.results;
		
		if(state.answerState)
			if(state.answerState[Object.keys(state.answerState)[0]] === "success")
				return
		
		if(question.rightAnswerId === answerId){
			if(!results[question.id])
				results[question.id] = "success";
			this.setState({
				answerState: {[answerId]: "success"},
				results
			});

			if(!this.isQuizFinished()){
				const timeout = setTimeout(()=>{
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					});

					clearTimeout(timeout);
				}, 1000)
			}
			else{
				this.setState({isFinished: true});
			}
		}
		else{
			results[question.id] = "error";
			this.setState({
				answerState: {[answerId]: "error"},
				results
			})
		}
    }
}

export function fetchQuizSuccess(quiz){console.log(quiz)
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizRetry(){
    return {
        type: FETCH_QUIZ_RETRY
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