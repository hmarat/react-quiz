import React, {Component} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz"
import Loader from "../../Components/UI/Loader/Loader"
import {connect} from "react-redux"
import {fetchQuiz, quizAnswerClick, retryQuiz} from "../../store/actions/quiz"


class Quiz extends Component{

	componentDidMount(){
		this.props.fetchQuiz(this.props.match.params.id);
	}
	
	componentWillUnmount(){
		this.props.retryQuiz();
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
							onRetry={this.props.retryQuiz}
						/>
					:
						<ActiveQuiz 
							answers={this.props.quiz[this.props.activeQuestion].answers}
							question={this.props.quiz[this.props.activeQuestion].question}
							rightAnswerId={this.props.quiz[this.props.activeQuestion].rightAnswerId}
							onAnswerClickHandler={this.props.quizAnswerClick}
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
		loading: state.quiz.loading
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		fetchQuiz: id => dispatch(fetchQuiz(id)),
		fetchQuizRetry: () => dispatch(fetchQuiz()),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)