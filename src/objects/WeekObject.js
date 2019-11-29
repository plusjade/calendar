import { observable, autorun, toJS } from "mobx"
import { token } from '../lib/actions'
import EntryObject from './EntryObject'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
// const HASHTAG_REGEX = /#(\w+)/g

class WeekObject {
  entriesObjects = {}
  categoriesObjects = {}
  id = null

  constructor({ categoriesObjects = {}, entriesObjects = {} } = {}) {
    this.categoriesObjects = categoriesObjects
    this.entriesObjects = observable.map(
      Object.keys(entriesObjects).map(key => {
        return [key, observable(entriesObjects[key])]
      })
    )
    console.log({ entriesObjects: this.entriesObjects, categoriesObjects })

    autorun(() => {
      console.log('autorun!', entriesObjects)
    })
  }

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
        const entries = Object.values(this.categoriesObjects).map(({ name, id }) => {
          const entryId = entriesListForDay.find(entryId => this.entriesObjects.get(entryId).category_id === id)
          const entry = entryId
            ? this.entriesObjects.get(entryId)
            : observable({ tags: [], text: '' , id: token(), category_id: id })
          entry.category_name = name

          return entry
        })

        return ({ day_name, entries })
      })
    )
  }

  entriesListByDay = () => (
    Array.from(this.entriesObjects.keys()).reduce((memo, key) => {
      const { day_id } = this.entriesObjects.get(key)

      if (memo[day_id]) {
        memo[day_id] = [...memo[day_id], key]
      } else {
        memo[day_id] = [key]
      }

      return memo
    }, {})
  )
}

export default WeekObject
