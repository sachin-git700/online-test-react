import React, { Component } from 'react';
import Palette from './palette';
import DisplayQuestion from './displayQuestion';
import CountDownTimer from './countDownTimer';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      response: Array(this.props.questions.length).fill(''),
      formSubmitted: false,
      correctResponsesCount: null,
    };
    this.btnStyled = Array(this.props.questions.length).fill(0);
    // btnStyled -
    // 0 fo not visited
    // 1 for visited but not answered
    // 2 for answered
    // these value are being used in the Button function inside palette component
    // to style the button to display proper legends information
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    // marking first question as visited but not answered
    this.btnStyled[0] = 1;
  }

  handleNavigation(e) {
    let nextQuestionNo = e.target.value;
    // colors for visited but not answered questions
    if(this.state.response[nextQuestionNo]==='') {
      this.btnStyled[nextQuestionNo] = 1;
    }
    // colors for answered questions
    if(this.state.response[this.state.current]!=='') {
      this.btnStyled[this.state.current] = 2;
    }
    this.setState({
      current: nextQuestionNo,
    });
  }

  handleSubmit() {
    let i,count=0;
    for(i=0;i<this.props.questions.length;i++) {
      if(this.props.questions[i].answer === this.state.response[i]) {
        count++;
      }
    }
    this.setState({
      correctResponsesCount: count,
      formSubmitted: true},
      function() {
        this.props.quizFormSubmitStatus(this.state.correctResponsesCount);
      }
    );
  }

  handleResponseChange(e) {
    let responseTemp = this.state.response;
    responseTemp[this.state.current] = e.target.value;
    this.setState({
      response: responseTemp
    });
  }

  handleReset() {
    let responseTemp = this.state.response;
    responseTemp[this.state.current] = '';
    // marking question as visited but not answered
    this.btnStyled[this.state.current] = 1;
    this.setState({
      response: responseTemp,
    })
  }

  render() {
    return (
        <form>
          <div className="row">
            <div className="col-sm-8">
              <div className="clock-box">
                <CountDownTimer handleSubmit={this.handleSubmit} />
              </div>
              <DisplayQuestion current={this.state.current} questions={this.props.questions} handleNavigation={this.handleNavigation}
                response={this.state.response} handleResponseChange={this.handleResponseChange} handleSubmit={this.handleSubmit}
                handleReset={this.handleReset} />
            </div>
            <div className="col-sm-3">
              <Palette questions={this.props.questions} handleNavigation={this.handleNavigation}
                btnStyled={this.btnStyled} current={this.state.current} response={this.state.response} />
            </div>
          </div>
        </form>
      );
  }
}

export default Quiz;


// Legends colors
// #239B56 - answered
// #989898 - Not visited
// #D98880 - Visited but not answered
// #0000ff - current question
