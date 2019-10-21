import React, { Component } from "react"
import Menu from "../Components/Navigation/MenuToggle/MenuToggle"
import Drawer from "../Components/Navigation/Drawer/Drawer"
import classes from "./Layout.module.css"
import { connect } from "react-redux"

class Layout extends Component {
	state = {
		isMenuOpen: false
	}

	onMenuToggleClick = () => {
		this.setState({ isMenuOpen: !this.state.isMenuOpen })
	}

	onMenuCloseHandler = () => {
		this.setState({ isMenuOpen: false })
	}

	render() {
		return (
			<div className={classes.Layout}>
				<Drawer isOpen={this.state.isMenuOpen} onCloseHandler={this.onMenuCloseHandler} isAutorizated={this.props.isAutorizated} />
				<Menu isOpen={this.state.isMenuOpen} onToggleClick={this.onMenuToggleClick} />
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isAutorizated: !!state.auth.token
	}
}

export default connect(mapStateToProps)(Layout)