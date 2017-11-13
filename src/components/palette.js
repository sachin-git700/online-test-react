import React, { Component } from 'react';

function Button(props) {
  let current = parseInt(props.current, 10);
  let value = parseInt(props.value, 10);
  let class1;


  if(current===value)
    class1 = "btn btn-sm palette-button active"
  else
    class1 = "btn btn-sm palette-button"

  let styleArr = [
    {
      "background-color": "#989898",
      color: "white"
    },
    {
      "background-color": "#D98880",
      color: "white"
    },
    {
      "background-color": "#239B56",
      color: "white"
    }
  ]

  return (
    <span className="">
      <button type="button" className={class1} style={styleArr[props.btnStyled[props.value]]} onClick={props.handleNavigation} value={props.value}>
        {props.value + 1}
      </button>
      {(props.value+1)%3===0 && <br />}
    </span>
  );
}

function PaletteButtons(props) {
  let i, tableBody=[];
  for(i=0; i<props.questions.length; i++) {
    const btn = <Button key={props.questions[i].id} handleNavigation={props.handleNavigation} value={i}
                  current={props.current} response={props.response}
                  btnStyled={props.btnStyled} />
    tableBody.push(btn);
  }
  return (
    <div className="palette well">
      <div className="palette-buttons">
        <h4>Question palette</h4>
          {tableBody}
      </div>
    </div>
  );
}

function LegendsInfo() {
  return (
    <div className="legends well">
      <div className="legends-buttons-info">
        <h4 className="legends-heading">Palette Information</h4>
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

class Palette extends Component {
  render() {
    return (
      <div className="palette">
        <PaletteButtons questions={this.props.questions} handleNavigation={this.props.handleNavigation}
          current={this.props.current} response={this.props.response} btnStyled={this.props.btnStyled}
        />
        <LegendsInfo />
      </div>
    );
  }
}

export default Palette;
