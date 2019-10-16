import React from "react"
import classes from "./AnswerItem.module.css"

const AnswerItem = props =>{
	const cls = [classes.AnswerItem];

	if(props.state){console.log(props)
		cls.push(classes[props.state]);
	}

	return(
		<li 
			className={cls.join(" ")} 
			onClick={() => props.onAnswerClickHandler(props.answer.id)}
		>
			{props.answer.text}
		</li>
	)
}

export default AnswerItem