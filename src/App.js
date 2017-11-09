import React, { Component } from 'react';
import Quiz from './components/quiz';
import UserForm from './components/getUserInfo'
import TestCompleteMessage from './components/testCompleteMessage'
import './App.css';

// App is being used to show the form initially
// Upon submission 'Quiz' component is being rendered by the App

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFormSubmitStatus: false,
      quizFormSubmitStatus: false,
      correctResponsesCount: 0,
      userName: ''
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleQuizFormSubmit = this.handleQuizFormSubmit.bind(this);
  }

  handleUserFormSubmit(userName) {
    this.setState({
      userFormSubmitStatus: true,
      userName: userName
    })
  }

  handleQuizFormSubmit(responseCount) {
    this.setState({
      quizFormSubmitStatus: true,
      correctResponsesCount: responseCount
    })
  }

  render() {
    let element;
    if(this.state.userFormSubmitStatus === false) {
      element = <UserForm userName={this.handleUserFormSubmit} />
    }
    else if(this.state.quizFormSubmitStatus === false) {
      element = <Quiz questions={this.props.questions} quizFormSubmitStatus={this.handleQuizFormSubmit} />
    }
    else {
      element = <TestCompleteMessage userName={this.state.userName} correctResponsesCount={this.state.correctResponsesCount}/>
    }
    return (
      <div className="container main-container">
        {element}
      </div>
    );
  }
}

export default App;
