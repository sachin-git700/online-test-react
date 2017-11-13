import React, { Component } from 'react';

class CountDownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: '02',
      sec: '00'
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    let second = this.state.sec;
    let minute = this.state.min
    second = parseInt(second,10);
    minute = parseInt(minute,10);
    if(second===0 && minute>0){
      minute -= 1;
      second = 59;
    }
    else if(second===0 && minute===0) {
      this.props.handleSubmit();
    }
    else {
      second -=1;
    }
    second = checkTime(second);  // add zero in front of numbers < 10
    minute = checkTime(minute);

    //console.log(minute +':'+second)
    this.setState({
      sec: second,
      min: minute
    });
  }

  render() {
    return (
      <div>
        <span className="time-left-text">Time Left:</span> {this.state.min + ':' + this.state.sec}
      </div>
    );
  }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

export default CountDownTimer;
