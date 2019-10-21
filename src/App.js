import React, { Component } from 'react';
import Layout from "./hoc/Layout"
import Quiz from "./Containers/Quiz/Quiz"
import QuizList from "./Containers/QuizList/QuizList"
import Auth from "./Containers/Auth/Auth"
import QuizCreator from "./Containers/QuizCreator/QuizCreator"
import { Switch, Route, withRouter, Redirect } from "react-router-dom"
import Logout from "./Components/Logout/Logout"
import { connect } from "react-redux"
import { autoLogin } from "./store/actions/auth"

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
        <Redirect to="/" exact />
      </Switch>
    )

    if (this.props.isAutorizated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App" >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }


}

function mapStateToProps(state) {
  return {
    isAutorizated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))