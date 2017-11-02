import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';

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
    <button type="button" value={props.value} className="btn btn-primary navigation-button" onClick={props.onClick} >
      {props.buttonName}
    </button>
  );
}
  
function DisplayQuestion(props) {
  return (
    <div>
      <h4>Question No {props.questions[props.current].id + 1 }</h4><hr />
      <h3><b>{props.questions[props.current].statement}</b></h3>
      <Options questions={props.questions} current={props.current} response={props.response} handleResponseChange={props.handleResponseChange} />
      
      <div className="buttons">
        <button type="button" className="btn btn-primary navigation-button" onClick={props.handleReset}>Reset</button>
        {props.current > 0 && 
          <NavigationButton buttonName="Prev" value={parseInt(props.current, 10) - 1} 
            onClick={props.handleNavigation} />}
        {props.current < (props.questions.length - 1) && <NavigationButton buttonName="Next" 
            value={parseInt(props.current, 10) + 1} 
            onClick={props.handleNavigation} />}
        </div>
    </div>
  );
}
  
function PaletteButton(props) { 
  let current = parseInt(props.current, 10);
  let value = parseInt(props.value, 10);
  return(
    <span>
      <button type="button" className={ current === value ? "btn-lg active" : "btn-lg"} style={props.btnStyled[props.value]} 
        onClick={props.handleNavigation} value={props.value}> {props.value + 1}</button>
      {(props.value+1)%3===0 && <br />}
    </span>
  );
}
  
class Palette extends React.Component {
  render() {
    var i, tableBody=[];
    for(i=0; i<this.props.questions.length; i++) {
      const btn = <PaletteButton key={this.props.questions[i].id} handleNavigation={this.props.handleNavigation} value={i} 
                    current={this.props.current} visited={this.props.visited} response={this.props.response} 
                    btnStyled={this.props.btnStyled} />
      tableBody.push(btn);
    }
    return (
      <div className="palette">
        <div className="palette-buttons">
          {tableBody}
        </div>
        <div className="palette-buttons-info">
          <div>
            <div className="answered box">A</div>
            <div className="box-color-info">Answered</div>
          </div>
          <div>
            <div className="not-visited box">B</div>
            <div className="box-color-info">Not Visited</div>
          </div>
          <div>
            <div className="visited-not-answered box">C</div> 
            <div className="box-color-info">Visited But Not Answered</div>
          </div>
          <div>
            <div className="current-question box">D</div> 
            <div className="box-color-info">Current Question</div>
          </div>
        </div>
      </div>
    );
  }
}
  

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      current: 0,
      response: Array(this.props.questions.length).fill(''),
      formSubmitted: false,
      correctResponsesCount: null,
      btnStyled: Array(this.props.questions.length).fill({background: "#9B59B6", color: "#fff"}),
    };
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  
  componentDidMount() {
    let btnStyledTemp = this.state.btnStyled;
    btnStyledTemp[0] = {background: "#A93226", color: "#fff" }
    this.setState({btnStyled: btnStyledTemp});
  }
    
  handleNavigation(e) {
    let nextQuestionNo = e.target.value;
    let btnStyledTemp = this.state.btnStyled;
    // colors for visited and not answered questions
    if(this.state.response[nextQuestionNo]==='') {
      btnStyledTemp[nextQuestionNo] = {background: "#A93226", color: "#fff" };
    }
    // colors for answered questions
    if(this.state.response[this.state.current]!=='') {
      btnStyledTemp[this.state.current] = {background: "#239B56", color: "#fff"}
    }
    this.setState({
      current: nextQuestionNo,
      btnStyled: btnStyledTemp
    });
  }
  
  handleSubmit() {
    var i,count=0;
    for(i=0;i<this.state.questions.length;i++) {
      if(this.state.questions[i].answer === this.state.response[i]) {
        count++;
      }
    }
    this.setState({correctResponsesCount: count,
                   formSubmitted: true
                  })
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
    let btnStyledTemp = this.state.btnStyled;
    btnStyledTemp[this.state.current] = {background: "#A93226", color: "#fff"};
    this.setState({
      response: responseTemp,
      btnStyled: btnStyledTemp
    })
  }
  
  render() {
    const correctResponseElement = (
      <div className="container">
        <br /><br />
        <div className="well">
          <h2 className="statement">Congratulations {this.props.userName}! You have successfully given the test</h2>
          <h3>You answered {this.state.correctResponsesCount} questions correctly</h3>
        </div>
      </div>
    );
    
    return (
      <div>{ 
          this.state.formSubmitted ? correctResponseElement :
      <div><br /><br />
        <form>
          <div className="container">
            <div className="row well">
              <div className="col-sm-8">
                <div className="displayQuestion">
                  <DisplayQuestion current={this.state.current} questions={this.state.questions} handleNavigation={this.handleNavigation} 
                    response={this.state.response} handleResponseChange={this.handleResponseChange}
                    handleReset={this.handleReset} />
                  <button type="button" className="submit-button btn btn-danger" onClick={this.handleSubmit}>Submit</button>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="palette">
                  <Palette questions={this.state.questions} handleNavigation={this.handleNavigation} 
                    btnStyled={this.state.btnStyled} current={this.state.current} visited={this.state.visited} response={this.state.response} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>}
      </div>  
    );
  }
}
   
class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      emailId: '',
      dateOfBirth: '',
      clicked: false,
      btnDisableValue: true
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.todayDate = this.todayDate.bind(this);
  }
   
  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    this.setState({[name]: target.value}, () => { 
      if(this.state.name && this.state.emailId && this.state.dateOfBirth) {
        this.setState({
          btnDisableValue: false
        })
      } 
      else {
        this.setState({
          btnDisableValue: true
        })
      }
    })
  }
  
  handleSubmit(e) {
    this.setState({clicked: true})
    e.preventDefault();
  }
  
  todayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;
  }
  
  render(){
    let userName = this.state.name;
    userName = userName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
    userName = userName.split(' ');
    let today = this.todayDate();
    return(
      <div>{ this.state.clicked ? <Quiz questions={this.props.questions} userName={userName[0]} />: 
        <div className="container">
          <br />
          <br />
          <div className="well">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={this.state.name} placeholder="Name" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" name="emailId" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label>Date Of Birth</label>
                <input type="date" className="form-control" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleInputChange} max={today} />
              </div>
              <button type="submit" className="btn btn-default" disabled={this.state.btnDisableValue === true}>Start Test</button>
            </form>
          </div>
        </div>}
      </div>
    );
  }
}  

const QUESTIONS = [
  {id: 0, statement: "Capital of Karnataka", options: ['Patna', 'Ranchi', 'Kolkata', 'Bangalore'], answer: 'Bangalore'},
  {id: 1, statement: "Capital of India", options: ['New Delhi','Mumbai','Kolkata','Chennai'], answer: 'New Delhi'},
  {id: 2, statement: "Capital of WB", options: ['Patna', 'Ranchi', 'Kolkata', 'Bangalore'], answer: 'Kolkata'},
  {id: 3, statement: "Capital of Bihar", options: ['Patna', 'Ranchi', 'Kolkata', 'Bangalore'], answer: 'Patna'},
  {id: 4, statement: "Capital of Jharkhand", options: ['Patna', 'Ranchi', 'Kolkata', 'Bangalore'], answer: 'Ranchi'},
];

ReactDOM.render(
  <User questions={QUESTIONS} />,
  document.getElementById('root')
);