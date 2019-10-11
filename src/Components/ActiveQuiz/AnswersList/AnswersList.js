import React from "react"
import AnswerItem from "./AnswerItem/AnswerItem"
import classes from "./AnswersList.module.css"

const AnswersList = props =>{
	return(
		<ul className={classes.AnswersList}>
			{props.answers.map((answer, i) =>
				<AnswerItem 
					answer={answer}
					key={i}
					onAnswerClickHandler={props.onAnswerClickHandler}
					state={props.state ? props.state[answer.id] : null}
				/>
			)}	
		</ul>
	)
}

export default AnswersList