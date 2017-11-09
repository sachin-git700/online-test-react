import React from 'react';

function capitalization(name) {
  name = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
  name = name.split(' ');
  return name[0]
}

function TestCompleteMessage(props) {
  let name = capitalization(props.userName)
  return (
    <div className="col-sm-8 col-sm-offset-2 well">
      <h3 className="statement">Congratulations {name}, You have successfully given the test</h3>
      <h4>You answered { props.correctResponsesCount } questions correctly</h4>
    </div>
  );
}

export default TestCompleteMessage;
