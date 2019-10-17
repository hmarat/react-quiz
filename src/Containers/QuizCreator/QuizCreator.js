import React, { Component } from "react"
import classes from "./QuizCreator.module.css"
import Button from "../../Components/UI/Button/Button"
import Input from "../../Components/UI/Input/Input"
import Select from "../../Components/UI/Select/Select"
import { createControl, validateControl, validateForm } from "../../form/formFramework"
import { connect } from "react-redux"
import { createQuizQuestion, finishCreateQuiz } from "../../store/actions/create"

function createOptionControl(number) {
	return createControl({
		label: `Ответ ${number}`,
		errorMessage: "Вопрос не может быть пустым",
		id: number
	},
		{ required: true });
}

function createFormControls() {
	return (
		{
			question: createControl({
				label: "Введите вопрос",
				errorMessage: "Вопрос не может быть пустым"
			},
				{ required: true }),
			option1: createOptionControl(1),
			option2: createOptionControl(2),
			option3: createOptionControl(3),
			option4: createOptionControl(4)
		}
	)
}

class QuizCreator extends Component {
	state = {
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	onSubmitHandler = evt => {
		evt.preventDefault();
	}

	addQuestionHandler = evt => {
		const { question, option1, option2, option3, option4 } = this.state.formControls;

		const questionItem = {
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id }
			]
		}

		this.props.createQuizQuestion(questionItem);

		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		});
	}

	createQuizHandler = async evt => {
		evt.preventDefault();

		this.props.finishCreateQuiz();

		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})
	}

	changeHandler(value, controlName) {
		const formControls = { ...this.state.formControls };
		const control = { ...formControls[controlName] };

		control.value = value;
		control.touched = true;
		control.valid = validateControl(value, control.validation);

		formControls[controlName] = control;

		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		})
	}

	renderControls() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];

			return (
				<React.Fragment key={index}>
					<Input
						label={control.label}
						errorMessage={control.errorMessage}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						shouldValidate={!!control.validation}
						onChange={evt => this.changeHandler(evt.target.value, controlName)}
					/>
					{index === 0 ? <hr /> : null}
				</React.Fragment>
			)
		});
	}

	selectChangeHandler = evt => {
		this.setState({ rightAnswerId: parseInt(evt.target.value) })
	}

	render() {
		const select = <Select
			label="Выберите правильный ответ"
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={[
				{ value: 1, text: 1 },
				{ value: 2, text: 2 },
				{ value: 3, text: 3 },
				{ value: 4, text: 4 }
			]}
		/>

		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание Тестов</h1>
					<form onSubmit={this.onSubmitHandler}>
						{this.renderControls()}
						{select}
						<Button
							type="primary"
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}
						>
							Добавить вопрос
						</Button>
						<Button
							type="success"
							onClick={this.createQuizHandler}
							disabled={this.props.quiz.length === 0}
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		quiz: state.create.quiz
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)