import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const QUESTIONS = [
  {id: 0, statement: "Capital of India", options: ['New Delhi','Mumbai','Kolkata','Chennai'], answer: 'New Delhi'},
  {id: 1, statement: "Capital of Chad", options: ['Bangui', "N'Djamena", 'Bogoto', 'San Jose'], answer: "N'Djamena"},
  {id: 2, statement: "Capital of Central African Republic", options: ["N'Djamena", 'Bangui', 'Bogoto', 'San Jose'], answer: "Bangui"},
  {id: 3, statement: "Capital of Somalia", options: ["Paramaribo", 'Madrid', 'Mongadishu', 'Juba'], answer: "Mongadishu"},
  {id: 4, statement: "Capital of Ethiopia", options: ['Helsinki', 'Mongadishu', "Addis Ababa", 'Paris'], answer: "Addis Ababa"}
];

ReactDOM.render(<App questions={QUESTIONS} />, document.getElementById('root'));
registerServiceWorker();
