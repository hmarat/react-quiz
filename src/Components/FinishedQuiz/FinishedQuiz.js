import React from "react"
import Button from "../UI/Button/Button"
import classes from "./FinishedQuiz.module.css"
import {Link} from "react-router-dom"

const FinishedQuiz = props =>{
	const rightsAnswersCount = props.results.filter(e => e === "success").length;

	return(
		<div className={classes.FinishedQuiz}>
			<ul>
			{
			props.quiz.map((quizItem, index) =>{
				const cls = ["fa"];

				if(props.results[quizItem.id] === "success")
					cls.push("fa-check", classes.success);
				else
					cls.push("fa-times", classes.error);

				return(
					<li key={index}>
						<strong>{index + 1}.</strong>&nbsp;
						{quizItem.question}
						<i className={cls.join(" ")}/>
					</li>
				)
			})
			}
			</ul>
			<p>Правильно {rightsAnswersCount} из {props.quiz.length}</p>
			<div>
				<Button onClick={props.onRetry} type="primary">Повторить</Button>
				<Link to="/">
					<Button type="success">Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	)
}

export default FinishedQuiz