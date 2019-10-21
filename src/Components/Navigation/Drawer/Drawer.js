import React, { Component } from "react"
import classes from "./Drawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop"
import { NavLink } from "react-router-dom"

class Drawer extends Component {
	renderLinks(links) {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						exact={link.exact}
						activeClassName={classes.active}
						onClick={this.props.onCloseHandler}
					>
						{link.label}
					</NavLink>
				</li>
			)
		});
	}

	render() {
		const cls = [classes.Drawer];

		if (!this.props.isOpen)
			cls.push(classes.close);

		const links = [
			{ to: "/", label: "Список тестов", exact: true }
		];

		if (this.props.isAutorizated)
			links.push(
				{ to: "/quiz-creator", label: "Создать тест", exact: false },
				{ to: "/logout", label: "Выйти", exact: false }
			)
		else
			links.push({ to: "/auth", label: "Авторизация", exact: false })


		return (
			<React.Fragment>
				<nav className={cls.join(" ")}>
					<ul>
						{this.renderLinks(links)}
					</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onCloseHandler} /> : null}
			</React.Fragment>
		)
	}
}

export default Drawer