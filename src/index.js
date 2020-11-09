import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EventList from "./components/event/eventList";
import QuestionsList from "./components/event/questionsList";
import AnswersList from "./components/event/answer/answersList";
import EventReport from "./components/event/eventReport";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/eventList" render={(props) => <EventList {...props}/>} />
      <Route path="/event/questionsList" render={(props) => <QuestionsList {...props}/>} />
      <Route path="/event/answer/answersList" render={(props) => <AnswersList {...props}/>} />
      <Route path="/event/report" render={(props) => <EventReport {...props}/>} />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
