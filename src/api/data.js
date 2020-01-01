import Crypto from 'crypto'
import { DateTime, Interval, Duration } from 'luxon'
import * as Storage from './storage'

export const token = (bytes = 4) => Crypto.randomBytes(bytes).toString('hex')


// ======== TEMPLATES ===========================================================
export const getCollectionKeyTemplate = () => {
  const version = 'v0'
  return `templateCollection.${version}`
}
export const createTemplateId = () => {
  const key = getCollectionKeyTemplate()
  const templateId = token()
  const data = JSON.stringify({ [templateId] : null })
  Storage.set(key, data)
  return templateId
}
// Allow for multiple programs, but assume only one for now
export const getTemplateId = () => {
  const key = getCollectionKeyTemplate()
  let data = Storage.get(key)
  if (data) {
    return Object.keys(JSON.parse(data))[0]
  }

  return null
}

// ======== PROGRAMS ===========================================================
export const getCollectionKeyPrograms = () => {
  const version = 'v0'
  return `programCollection.${version}`
}
export const createProgramId = () => {
  const key = getCollectionKeyPrograms()
  const programId = token()
  const data = JSON.stringify({ [programId] : null })
  Storage.set(key, data)
  return programId
}
// Allow for multiple programs, but assume only one for now
export const getProgramId = () => {
  const key = getCollectionKeyPrograms()
  let data = Storage.get(key)
  if (data) {
    return Object.keys(JSON.parse(data))[0]
  }

  return null
}

// ======== CATEGORIES =========================================================
export const getKeyCategoryDB = (id) => {
  const version = 'v0'
  return `category.${version}.${id}`
}
export const getKeyCategoryCollectionDB = ({ programId }) => {
  const version = 'v0'
  return `categoryCollection.${version}.programId-${programId}`
}
const getCategoryCollectionJSON = ({ programId }) => {
  const key = getKeyCategoryCollectionDB({ programId })
  const json = Storage.get(key)
  if (json) {
    return Object.keys(JSON.parse(json))
  }
  return []
}
export const getCategoryCollectionDB = ({ programId }) =>
  getCategoryCollectionJSON({ programId }).reduce((memo, id) => {
    const version = 'v0'
    const data = Storage.get(`category.${version}.${id}`)
    if (data) {
      memo = { ...memo, [id]: JSON.parse(data) }
    }
    return memo
  }, {})

// ======== ENTRIES =============================================================
export const getEntryCollectionDB = ({ programId }) =>
  getCollectionJSON(getKeyEntryCollectionDB({ programId })).reduce((memo, id) => {
    const data = Storage.get(getKeyEntry(id))
    if (data) {
      memo = { ...memo, [id]: JSON.parse(data) }
    }
    return memo
  }, {})
export const getKeyEntryCollectionDB = ({ programId }) => {
  const version = 'v0'
  return `entryCollection.${version}.programId-${programId}`
}

export const getTemplateCollectionDB = ({ programId }) =>
  getCollectionJSON(getKeyTemplateCollectionDB({ programId })).reduce((memo, id) => {
    const data = Storage.get(getKeyEntry(id))
    if (data) {
      memo = { ...memo, [id]: JSON.parse(data) }
    }
    return memo
  }, {})
export const getKeyTemplateCollectionDB = ({ programId }) => {
  const version = 'v0'
  return `entryTemplateCollection.${version}.programId-${programId}`
}

export const getKeyEntry = (id) => {
  const version = 'v0'
  return `entry.${version}.${id}`
}
const getCollectionJSON = (key) => {
  const json = Storage.get(key)
  if (json) {
    return Object.keys(JSON.parse(json))
  }
  return []
}
