import { DateTime, Interval, Duration } from 'luxon'
import * as Storage from './storage'
import { token } from '../lib/actions'

const CURRENT_DATE = DateTime.local()

// ======== PROGRAMS ===========================================================
export const getListKeyPrograms = () => {
  const version = 'v0'
  return `programsList.${version}`
}
export const createProgramId = () => {
  const key = getListKeyPrograms()
  const programId = token()
  const data = JSON.stringify({ [programId] : true })
  Storage.set(key, data)
  return programId
}
// Allow for multiple programs, but assume only one for now
export const getProgramId = () => {
  const key = getListKeyPrograms()
  let data = Storage.get(key)
  if (data) {
    return Object.keys(JSON.parse(data))[0]
  }

  return null
}

// ======== CATEGORIES =========================================================
export const getListKeyCategories = () => {
  const version = 'v0'
  const programId = getProgramId()
  return `categoriesList.${version}.${programId}`
}
export const getKeyCategory = (id) => {
  const version = 'v0'
  return `category.${version}.${id}`
}

export const getListCategories = () => {
  const key = getListKeyCategories()
  const json = Storage.get(key)
  if (json) {
    return Object.keys(JSON.parse(json))
  }
  return []
}
export const getCategories = () =>
  getListCategories().reduce((memo, id) => {
    const version = 'v0'
    const data = Storage.get(`category.${version}.${id}`)
    if (data) {
      memo = { ...memo, [id]: JSON.parse(data) }
    }
    return memo
  }, {})

// ======== MONTHS =============================================================
export const getListKeyMonths = () => {
  const version = 'v0'
  const programId = getProgramId()
  const ordinal = CURRENT_DATE.set({ day: 1 }).toISODate()
  return `monthsList.${version}.${programId}.${ordinal}`
}
export const getListMonthCurrent = () => {
  const key = getListKeyMonths()
  const json = Storage.get(key)
  if (json) {
    return Object.keys(JSON.parse(json))
  }
  return []
}

// ======== ENTRIES =============================================================
// Get saved entries for Month
export const getEntriesForMonth = () =>
  getListMonthCurrent().reduce((memo, id) => {
    const data = Storage.get(getKeyEntry(id))
    if (data) {
      memo = { ...memo, [id]: JSON.parse(data) }
    }
    return memo
  }, {})
export const getKeyEntry = (id) => {
  const version = 'v0'
  return `entry.${version}.${id}`
}
