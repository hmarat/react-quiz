import React, {Component} from "react"
import Menu from "../Components/Navigation/MenuToggle/MenuToggle"
import Drawer from "../Components/Navigation/Drawer/Drawer"
import classes from "./Layout.module.css"

class Layout extends Component{
	state = {
		isMenuOpen: false
	}

	onMenuToggleClick = () => {
		this.setState({isMenuOpen: !this.state.isMenuOpen})
	}

	onMenuCloseHandler = () =>{
		this.setState({isMenuOpen: false})
	}

	render(){
		return(
			<div className={classes.Layout}>
				<Drawer isOpen={this.state.isMenuOpen} onCloseHandler={this.onMenuCloseHandler}/>
				<Menu isOpen={this.state.isMenuOpen} onToggleClick={this.onMenuToggleClick}/>
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}

export default Layout