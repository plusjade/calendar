import { DateTime, Interval, Duration } from 'luxon'
import EntryObject from './EntryObject'
import CategoryObject from './CategoryObject'
import CategoryCollection from './CategoryCollection'
import EntryCollection from './EntryCollection'
import * as Sync from '../api/data'

const ONE_DAY_DURATION = Duration.fromObject({ days: 1 })

class ProgramObject {
  programId = null
  entryCollection = {}
  categoryCollection = {}

  constructor({ programId } = {}) {
    if (!programId) { throw new Error() }
    this.programId = programId
    this.datePointer = DateTime.local()
    this.categoryCollection = CategoryCollection({
      programId,
      objects: Sync.getCategoryCollectionDB({ programId }),
    })
    this.entryCollection = EntryCollection({
      programId,
      objects: Sync.getEntryCollectionDB({ programId }),
    })
    this.days()
  }

  getInterval = () =>
    Interval.fromDateTimes(this.datePointer, this.datePointer.plus({ weeks: 4 }))

  days = () => {
    const daysDict = this.entriesByIsoDate()
    return (
      this.getInterval().splitBy(ONE_DAY_DURATION).map(duration => {
        const date = duration.start
        const iso_date = duration.start.toISODate()
        const entriesForDay = daysDict[iso_date] || []
        const entries = this.getCategories().map(category => {
          const { id } = category
          const entryId = entriesForDay.find(entryId => this.getEntry(entryId).category_id === id)
          let entry = null
          if (entryId) {
            entry = this.entryCollection.get(entryId)
          } else {
            // build stub
            entry = EntryObject({ category_id: id, iso_date })
            this.entryCollection.set(entry.id, entry)
          }
          entry.category = category

          return entry
        })

        return ({ date, entries })
      })
    )
  }

  entriesByIsoDate = () => (
    Array.from(this.entryCollection.keys()).reduce((memo, key) => {
      const { iso_date } = this.getEntry(key)

      if (memo[iso_date]) {
        memo = { ...memo, [iso_date]: [...memo[iso_date], key] }
      } else {
        memo = { ...memo, [iso_date]: [key] }
      }

      return memo
    }, {})
  )

  addCategory = () => {
    const category = CategoryObject()
    if (category.o_type === 'CategoryObject') {
      this.categoryCollection.set(category.id, category)
    } else {
      throw new Error()
    }
  }

  getCategory = id => this.categoryCollection.get(id)

  getCategories = () => (
    Array.from(this.categoryCollection.keys()).map(id => this.getCategory(id))
  )

  getEntry = id => this.entryCollection.get(id)
}

export default ProgramObject
