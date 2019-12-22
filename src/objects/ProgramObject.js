import EntryObject from './EntryObject'
import CategoryObject from './CategoryObject'
import CategoriesObjects from './CategoriesObjects'
import EntriesObjects from './EntriesObjects'
import { getCategories, getEntriesForMonth } from '../api/data'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

class ProgramObject {
  entriesObjects = {}
  categoriesObjects = {}
  programId = null

  constructor({ programId } = {}) {
    if (!programId) { throw new Error() }
    console.log('programId', programId)
    this.programId = programId
    this.categoriesObjects = CategoriesObjects(getCategories())
    this.entriesObjects = EntriesObjects(getEntriesForMonth())
    this.days()
  }

  addCategory = () => {
    const category = CategoryObject()
    if (category.o_type === 'CategoryObject') {
      this.categoriesObjects.set(category.id, category)
    } else {
      throw new Error()
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
            this.entriesObjects.set(entry.id, entry)
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

export default ProgramObject
