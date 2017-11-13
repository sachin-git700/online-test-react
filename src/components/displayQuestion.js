import React from 'react';

function Options(props) {
  const options = (
    props.questions[props.current].options.map( option =>
      <Radio key={option} value={option} option={option} current={props.current} response={props.response}
        handleResponseChange={props.handleResponseChange} />
   ));
   return <div>{options}</div>
}

function Radio(props) {
  return (
    <div className="radio">
      <label>
        <input type="radio" value={props.value} checked={props.response[props.current]===props.value} onChange={props.handleResponseChange} />
          {' ' + props.option}
      </label>
    </div>
  );
}

function NavigationButton(props) {
  return (
    <button type="button" value={props.value} className="btn btn-primary navigation-button" onClick={props.onClick} disabled={props.btnDisableStatus}>
      {props.buttonName}
    </button>
  );
}

function DisplayQuestion(props) {
  return (
    <div className="">
      <div>
        <div className="question-box">
          <h4>Question No {props.questions[props.current].id + 1 }</h4><hr />
          <h3><b>{props.questions[props.current].statement}</b></h3>
          <Options questions={props.questions} current={props.current} response={props.response} handleResponseChange={props.handleResponseChange} />
        </div>
        <div className="nav-box">
          <button type="button" className="btn btn-primary navigation-button" onClick={props.handleReset}>Reset</button>
            <NavigationButton buttonName="<< Prev" value={parseInt(props.current, 10) - 1}
              onClick={props.handleNavigation} btnDisableStatus={props.current>0 ? false:true} />
            <NavigationButton buttonName="Next >>"
              value={parseInt(props.current, 10) + 1}
              onClick={props.handleNavigation} btnDisableStatus= {props.current<(props.questions.length - 1) ? false : true} />
          <button type="button" className="submit-button btn btn-danger pull-right" onClick={props.handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default DisplayQuestion;
