import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import Spreadsheet from './components/Spreadsheet/Spreadsheet'
import Week from './components/Vertical/Week'
import * as serviceWorker from './serviceWorker'

import { token } from './lib/actions'

import CategoryObject from './objects/CategoryObject'
import EntryObject from './objects/EntryObject'
import WeekObject from './objects/WeekObject'

const categoriesDB = [
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
const categoriesObjects = (
  categoriesDB.reduce((memo, data) => {
    const category = CategoryObject(data)
    memo = { ...memo, [category.id]: category }
    return memo
  }, {})
)
const primary = Object.values(categoriesObjects).find(({ name }) => name === 'Primary')
const secondary = Object.values(categoriesObjects).find(({ name }) => name === 'Secondary')
const cardio = Object.values(categoriesObjects).find(({ name }) => name === 'Cardio')

const entriesDB = [
  {
    day_id: 'mon',
    category_id: primary.id,
    text: 'squat',
    tags: ['legs'],
  },

  {
    day_id: 'wed',
    category_id: primary.id,
    text: 'farmers walk',
    tags: ['posterior'],
  },
  {
    day_id: 'fri',
    category_id: primary.id,
    text: 'overhead pin press',
    tags: ['push'],
  },
  {
    day_id: 'fri',
    category_id: secondary.id,
    text: 'pull-ups',
    tags: ['pull'],
  },
  {
    day_id: 'fri',
    category_id: cardio.id,
    text: 'ropes',
    tags: [],
  },
  {
    day_id: 'sat',
    category_id: primary.id,
    text: 'squat',
    tags: ['legs'],
  },
  {
    day_id: 'sat',
    category_id: secondary.id,
    text: 'bench',
    tags: ['push'],
  },

  {
    day_id: 'sun',
    category_id: primary.id,
    text: 'farmers walk',
    tags: ['posterior'],
  },
  {
    day_id: 'sun',
    category_id: secondary.id,
    text: 'Y pulls',
    tags: ['pull'],
  },
  {
    day_id: 'sun',
    category_id: cardio.id,
    text: 'ropes',
    tags: [],
  },
]
const entriesObjects = (
  entriesDB.reduce((memo, data) => {
    const entry = EntryObject(data)
    memo = { ...memo, [entry.id]: entry }
    return memo
  }, {})
)
const week = new WeekObject({
  entriesObjects,
  categoriesObjects,
  // timeStart: Date.now(),
  // template_ref: "workout",
})


ReactDOM.render(
  <Week week={week} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
