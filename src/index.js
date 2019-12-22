import React from 'react'
import ReactDOM from 'react-dom'
import ProgramObject from './objects/ProgramObject'
import ProgramView from './components/Vertical/ProgramView'
import './index.css'
import * as serviceWorker from './serviceWorker'
import {
  createProgramId,
  getCategories,
  getEntriesForMonth,
  getProgramId,
} from './api/data'

// legacy
// Storage.get('categoriesObjects')
// Storage.get('entriesObjects')

let categoriesObjects = {}
let entriesObjects = {}
const programId = getProgramId()
if (programId) {
  console.log('programId', programId)
  categoriesObjects = getCategories()
  entriesObjects = getEntriesForMonth()
} else {
  // no data
  createProgramId()
}

const program = new ProgramObject({ entriesObjects, categoriesObjects })
ReactDOM.render(
  <ProgramView program={program} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
