import React, { Component } from 'react';
import Palette from './palette';
import DisplayQuestion from './DisplayQuestion';
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
    this.btnStyled = Array(this.props.questions.length).fill({background: "#989898", color: "#fff"});
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.btnStyled[0] = {background: "#D98880", color: "#fff" };
  }

  handleNavigation(e) {
    let nextQuestionNo = e.target.value;
    // colors for visited but not answered questions
    if(this.state.response[nextQuestionNo]==='') {
      this.btnStyled[nextQuestionNo] = {background: "#D98880", color: "#fff" };
    }
    // colors for answered questions
    if(this.state.response[this.state.current]!=='') {
      this.btnStyled[this.state.current] = {background: "#239B56", color: "#fff"}
    }
    this.setState({
      current: nextQuestionNo,
    });
  }

  handleSubmit() {
    var i,count=0;
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
    this.btnStyled[this.state.current] = {background: "#D98880", color: "#fff"};
    this.setState({
      response: responseTemp,
    })
  }

  render() {
    var element = (
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
    return element;
  }
}

export default Quiz;


// Legends colors
// #239B56 - answered
// #989898 - Not visited
// #D98880 - Visited but not answered
// #0000ff - current question
