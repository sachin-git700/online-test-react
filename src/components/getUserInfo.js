import React, { Component } from 'react';
import todayDate from './todayDate';

class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      emailId: '',
      dateOfBirth: '',
      btnDisableValue: true
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    // condition in if statement checks if all values are filled
    this.setState({[e.target.name]: e.target.value}, () => {
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
    });
  }

  handleSubmit(e) {
    this.props.userName(this.state.name);
    e.preventDefault();
  }

  render(){
    let userForm = (
        <div className="col-sm-8 col-sm-offset-2 well">
          <form onSubmit={this.handleSubmit}>
            <h3><strong>Please fill this form to start the test</strong></h3><br />
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
              <input type="date" className="form-control" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleInputChange} max={todayDate()} />
            </div>
            <button type="submit" className="btn btn-default" disabled={this.state.btnDisableValue === true}> Start Test</button>
          </form>
        </div>
      );
    return(
      <div className="App">
        {userForm}
      </div>
    );
  }
}

export default UserForm;
