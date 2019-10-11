import React from "react"
import AnswersList from "./AnswersList/AnswersList"
import classes from "./ActiveQuiz.module.css"

const ActiveQuiz = props =>{
	return(
		<div className={classes.ActiveQuize}>
			<p className={classes.Question}>	
				<span>
					<strong>{props.activeQuestion + 1}.</strong>&nbsp;
					{props.question}
				</span>
				<small>{props.activeQuestion + 1} из {props.quizLength}</small>
			</p>
			<AnswersList 
				answers={props.answers}
				onAnswerClickHandler={props.onAnswerClickHandler}
				state={props.state}
			/>
		</div>
	)
}

export default ActiveQuiz