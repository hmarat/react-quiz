import React, {Component} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz"
import Loader from "../../Components/UI/Loader/Loader"
import axios from "../../axios/axios-quiz"

class Quiz extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			results: [],
			isFinished: false,
			answerState: null,
			activeQuestion: 0,
			quiz: []
		}
	}

	async componentDidMount(){
		try{
			const quizId = this.props.match.params.id;
			const response = await axios.get(`${quizId}.json`);

			this.setState({
				quiz: response.data,
				loading: false
			})
		} catch(e){
			console.log(e)
		}	
	}
	
	onRetry = () => {
		this.setState({
			results: [],
			isFinished: false,
			answerState: null,
			activeQuestion: 0
		});
	}

	onAnswerClickHandler = answerId =>{
		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;
		
		if(this.state.answerState)
			if(this.state.answerState[Object.keys(this.state.answerState)[0]] === "success")
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

	isQuizFinished = () => {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	}

	render(){
		return(
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>

					{
					this.state.loading 
						?
					<Loader />
						:
					this.state.isFinished ?
						<FinishedQuiz 
							quiz={this.state.quiz} 
							results={this.state.results}
							onRetry={this.onRetry}
						/>
					:
						<ActiveQuiz 
							answers={this.state.quiz[this.state.activeQuestion].answers}
							question={this.state.quiz[this.state.activeQuestion].question}
							rightAnswerId={this.state.quiz[this.state.activeQuestion].rightAnswerId}
							onAnswerClickHandler={this.onAnswerClickHandler}
							activeQuestion={this.state.activeQuestion}
							quizLength={this.state.quiz.length}
							state={this.state.answerState}
						/>
					}
				</div>
			</div>
		)
	}
}

export default Quiz