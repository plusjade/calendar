import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const week = {
  timeStart: Date.now(),
  template_ref: "workout",
  sun: ["bench #push", "weighted carries #posterior", "ropes"],
  mon: ["squat #legs"],
  tue: ["overhead pin press #push", "weighted pull-ups #pull"],
  wed: ["bench #push", "weighted carries #posterior"],
  thu: ["squat #legs", "pendley row #pull"],
  fri: [],
  sat: ["overhead pin press #push", "weighted pull-ups #pull"],
}
const template = {
  name: "workout",
  columns: [
    {
      name: "main",
      type: "list",
      data_source: "lifts",
    },
    {
      name: "sub",
      type: "list",
      data_source: "lifts",
    },
    {
      name: "cardio",
      type: "list",
      data_source: "cardio",
    },
  ]
}

const dataSource = {
  name: "lifts",
  values: {
    pull: ["farmers carry", "pull ups", "pull-ups weighted"],
    push: ["bench", "overhead pin-press"],
    posterior: ["deadlift"],
  }
}

ReactDOM.render(
  <App week={week} template={template} dataSource={dataSource} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
