import debounce from 'lodash.debounce'
import { observable, autorun, toJS } from "mobx"
import * as Storage from '../api/storage'
import { token } from '../lib/actions'
import EntryObject from './EntryObject'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const subscribe = ({ entriesObjects, categoriesObjects }) => {
  console.log('subscribe')
  console.log({
    entriesObjects: toJS(entriesObjects),
    categoriesObjects: toJS(categoriesObjects),
  })

  Storage.set('categoriesObjects', JSON.stringify(toJS(categoriesObjects)))
  Storage.set('entriesObjects', JSON.stringify(toJS(entriesObjects)))
}
const debouncedSubscribe = subscribe ? debounce(subscribe, 500) : () => {}


class WeekObject {
  entriesObjects = {}
  categoriesObjects = {}
  id = null

  constructor({ categoriesObjects = {}, entriesObjects = {} } = {}) {
    this.categoriesObjects = observable.map(
      Object.keys(categoriesObjects).map(key => {
        return [key, observable(categoriesObjects[key])]
      })
    )
    this.entriesObjects = observable.map(
      Object.keys(entriesObjects).map(key => {
        return [key, observable(entriesObjects[key])]
      })
    )

    this.days()

    autorun(() => {
      this.getCategories().map(({ name }) => name)
      this.getEntries().map(({ text, tags }) => [text, tags])

      debouncedSubscribe({
        entriesObjects: this.entriesObjects,
        categoriesObjects: this.categoriesObjects,
      })
    })
  }

  addCategory = category => {
    if (category.type === 'CategoryObject') {
      this.categoriesObjects.set(category.id, category)
    } else {
      throw new Error
    }
  }

  getCategory = id => this.categoriesObjects.get(id)

  getCategories = () => (
    Array.from(this.categoriesObjects.keys()).map(id => this.getCategory(id))
  )

  getEntry = id => this.entriesObjects.get(id)

  getEntries = () => (
    Array.from(this.entriesObjects.keys()).map(id => this.getEntry(id))
  )

  addEntry = () => {
    console.log('addEntry')
    const category_id = Object.keys(this.categoriesObjects)[0]
    const entry = EntryObject({
      day_id: 'thu',
      category_id,
      text: 'bench',
      tags: ['Jade'],
    })
    this.entriesObjects.set(entry.id, observable(entry))
  }

  updateEntry = () => {
    console.log('updateEntry')
    const id = Array.from(this.entriesObjects.keys())[0]
    const entry = this.getEntry(id)
    entry.text = entry.text + ' UPDATED!'
    entry.tags = [...entry.tags, 'hai']
  }

  days = () => {
    const daysDict = this.entriesListByDay()
    return (
      DAYS.map(day_name => {
        const entriesListForDay = daysDict[day_name] || []
        const entries = this.getCategories().map(category => {
          const { id } = category
          const entryId = entriesListForDay.find(entryId => this.getEntry(entryId).category_id === id)
          let entry = null
          if (entryId) {
            entry = this.entriesObjects.get(entryId)
          } else {
            entry = EntryObject({ category_id: id, day_id: day_name })
            this.entriesObjects.set(entry.id, observable(entry))
          }
          entry.category = category

          return entry
        })

        return ({ day_name, entries })
      })
    )
  }

  entriesListByDay = () => (
    Array.from(this.entriesObjects.keys()).reduce((memo, key) => {
      const { day_id } = this.getEntry(key)

      if (memo[day_id]) {
        memo = { ...memo, [day_id]: [...memo[day_id], key] }
      } else {
        memo = { ...memo, [day_id]: [key] }
      }

      return memo
    }, {})
  )
}

export default WeekObject
