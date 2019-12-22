import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable } from 'mobx'
import EntryObject from './EntryObject'
import { getListKeyMonths } from '../api/data'

const sync = (object) => {
  const data = Object.keys(object.toJSON()).reduce((memo, id) => {
    memo = { ...memo, [id]: true }
    return memo
  }, {})
  const json = JSON.stringify(data)
  console.log('sync EntriesObjects', json)

  Storage.set(getListKeyMonths(), json)
}
const debouncedSync = debounce(sync, 1000)

const EntriesObjects = (objects = {}) => {
  const object = observable.map(
    Object.keys(objects).map(key => {
      return [key, EntryObject(objects[key])]
    })
  )
  object.observe(test => {
    console.log('observe EntriesObjects', test)
    debouncedSync(object)
  })

  return object
}


export default EntriesObjects
