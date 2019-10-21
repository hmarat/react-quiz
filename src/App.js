import React from 'react';
import Layout from "./hoc/Layout"
import Quiz from "./Containers/Quiz/Quiz"
import QuizList from "./Containers/QuizList/QuizList"
import Auth from "./Containers/Auth/Auth"
import QuizCreator from "./Containers/QuizCreator/QuizCreator"
import {Switch, Route, withRouter} from "react-router-dom"
import {connect} from "react-redux"

function App() {
  let routes = (
    <Switch>
       	<Route path="/auth" component={Auth}/>
       	<Route path="/quiz-creator" component={QuizCreator}/>
       	<Route path="/quiz/:id" component={Quiz}/>
       	<Route path="/" component={QuizList}/>
    </Switch>
  )

  if(this.props.isAutorizated){
    routes = (
      <Switch>
           <Route path="/quiz-creator" component={QuizCreator}/>
           <Route path="/quiz/:id" component={Quiz}/>
           <Route path="/" component={QuizList}/>
      </Switch>
    )
  }
  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

function mapStateToProps(state){
  isAutorizated: !!state.auth.token
}

export default withRouter(connect(mapStateToProps)(App))