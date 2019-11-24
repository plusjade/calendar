import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import Spreadsheet from './components/Spreadsheet/Spreadsheet'
import Vertical from './components/Vertical/Vertical'
import * as serviceWorker from './serviceWorker'

const week = {
  timeStart: Date.now(),
  template_ref: "workout",
  mon: ["squat #legs"],
  tue: [],
  wed: ["farmers walk #posterior"],
  thu: [],
  fri: ["overhead pin press #push", "pull-ups #pull", "ropes"],
  sat: ["squat #legs", "bench #push"],
  sun: ["farmers walk #posterior", "Y pulls #pull", "ropes"],
}
const template = {
  name: "workout",
  columns: [
    {
      name: "Primary",
      type: "list",
      data_source: "lifts",
    },
    {
      name: "Secondary",
      type: "list",
      data_source: "lifts",
    },
    {
      name: "Cardio",
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
  <Vertical week={week} template={template} dataSource={dataSource} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
