import React, {Component} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz"
import Loader from "../../Components/UI/Loader/Loader"
import {connect} from "react-redux"
import {fetchQuiz, fetchQuizRetry} from "../../store/actions/quiz"


class Quiz extends Component{

	componentDidMount(){
		this.props.fetchQuiz(this.props.match.params.id);
	}
	
	onRetry = () => {
		this.props.fetchQuizRetry()
	}

	onAnswerClickHandler = answerId =>{
		const question = this.props.quiz[this.props.activeQuestion];
		const results = this.props.results;
		
		if(this.props.answerState)
			if(this.props.answerState[Object.keys(this.props.answerState)[0]] === "success")
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
		return this.props.activeQuestion + 1 === this.props.quiz.length;
	}

	render(){
		return(
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>

					{
					this.props.loading || this.props.quiz.length === 0
						?
					<Loader />
						:
					this.props.isFinished ?
						<FinishedQuiz 
							quiz={this.props.quiz} 
							results={this.props.results}
							onRetry={this.onRetry}
						/>
					:
						<ActiveQuiz 
							answers={this.props.quiz[this.props.activeQuestion].answers}
							question={this.props.quiz[this.props.activeQuestion].question}
							rightAnswerId={this.props.quiz[this.props.activeQuestion].rightAnswerId}
							onAnswerClickHandler={this.onAnswerClickHandler}
							activeQuestion={this.props.activeQuestion}
							quizLength={this.props.quiz.length}
							state={this.props.answerState}
						/>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state =>{
	return{
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		answerState: state.quiz.answerState,
		activeQuestion: state.quiz.activeQuestion,
		quiz: state.quiz.quiz,
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		fetchQuiz: id => dispatch(fetchQuiz(id)),
		fetchQuizRetry: () => dispatch(fetchQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)