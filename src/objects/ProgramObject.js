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
    console.log('asdfasd')
    console.log(this.weekChunks())
  }

  weeks = () => {
    const dict = this.entriesByWeek()
    return (
      this.getInterval().splitBy(Duration.fromObject({ weeks: 1 })).map(duration => {
        const date = duration.start
        const entries = dict[date.weekNumber]

        return entries
      })
    )
  }

  getInterval = () => {
    const start = DateTime.local().minus({ day: 1 })
    const end = DateTime.local().plus({ weeks: 1 })

    return Interval.fromDateTimes(start, end)
  }

  weekChunks = () => {
    const dict = this._weekChunks()
    return (
      this.getInterval().splitBy(Duration.fromObject({ weeks: 1 })).map(duration => {
        const date = duration.start
        return ({
          date,
          chunk: dict[date.weekNumber],
          isCurrent: date.weekNumber === this.datePointer.weekNumber,
        })
      })
    )
  }

  _weekChunks = () => {
    const days = this.days()
    return (
      days.reduce((memo, day) => {
        const { date } = day

        if (memo[date.weekNumber]) {
          memo = { ...memo, [date.weekNumber]: [...memo[date.weekNumber], day] }
        } else {
          memo = { ...memo, [date.weekNumber]: [day] }
        }

        return memo
      }, {})
    )
  }

  days = () => {
    const daysDict = this.entriesByIsoDate()
    return (
      this.getInterval().splitBy(ONE_DAY_DURATION).map(duration => {
        const date = duration.start
        const iso_date = date.toISODate()
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

        return ({
          date,
          entries,
          isCurrent: iso_date === this.datePointer.toISODate(),
        })
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

  entriesByWeek = () => {
    const dict = this.entriesByIsoDate()
    return (
      Object.keys(dict).reduce((memo, iso_date) => {
        const date = DateTime.fromISO(iso_date)
        console.log(date, date.weekNumber)
        const entries = dict[iso_date]
        if (memo[date.weekNumber]) {
          memo = { ...memo, [date.weekNumber]: [...memo[date.weekNumber], entries] }
        } else {
          memo = { ...memo, [date.weekNumber]: [entries] }
        }

        return memo
      }, {})
    )
  }

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
