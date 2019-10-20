import React, { Component } from "react"
import classes from "./Auth.module.css"
import Button from "../../Components/UI/Button/Button"
import Input from "../../Components/UI/Input/Input"
import is from "is_js"
import axios from "axios"
import { connect } from "react-redux"
import { auth } from "../../store/actions/auth"

class Auth extends Component {
	state = {
		isFormValid: false,
		formControls: {
			email: {
				type: "email",
				value: "",
				label: "Email",
				errorMessage: "Введите корректный Email",
				touched: false,
				valid: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				type: "password",
				value: "",
				label: "Пароль",
				errorMessage: "Введите корректный пароль",
				touched: false,
				valid: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	}

	validateControl = (value, validation) => {
		if (!validation)
			return true;

		let isValid = true;

		if (validation.required) {
			isValid = value.trim() !== "" && isValid
		}

		if (validation.email) {
			isValid = is.email(value) && isValid;
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}

		return isValid;
	}

	onChangeHandler = (evt, controlName) => {
		const formControls = { ...this.state.formControls };
		const control = { ...formControls[controlName] }

		control.value = evt.target.value;
		control.touched = true;
		control.valid = this.validateControl(control.value, control.validation);

		formControls[controlName] = control;

		let isFormValid = true;

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid;
		});

		this.setState({ isFormValid, formControls });
	}

	renderInputs = () => {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const input = this.state.formControls[controlName];

			return (
				<Input
					key={controlName + index}
					type={input.type}
					value={input.value}
					label={input.label}
					errorMessage={input.errorMessage}
					touched={input.touched}
					valid={input.valid}
					shouldValidate={!!input.validation}
					onChange={evt => this.onChangeHandler(evt, controlName)}
				/>
			)

		});

	}

	onLoginHandler = () => {
		this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
	}

	onRegisterHandler = () => {
		this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)
	}

	onSubmitHandler = evt => {
		evt.preventDefault();
	}

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Авторизация</h1>
					<form onSubmit={this.onSubmitHandler} className={classes.AuthForm}>
						{this.renderInputs()}
						<Button
							type="success"
							onClick={this.onLoginHandler}
							disabled={!this.state.isFormValid}
						>
							Авторизоватся
						</Button>
						<Button
							type="primary"
							onClick={this.onRegisterHandler}
							disabled={!this.state.isFormValid}
						>
							Зарегестрироватся
						</Button>
					</form>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
	}
}

export default connect(null, mapDispatchToProps)(Auth)