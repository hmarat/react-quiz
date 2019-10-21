import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {logout} from "../../store/actions/auth"
import {connect} from "react-redux"

class Logout extends Component{
    componentDidMount(){
        this.props.logout();
    }

    render(){
        <Redirect to="/"/>
    }
}

mapDispatchToProps(dispatch){
    return{
        logout: dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)