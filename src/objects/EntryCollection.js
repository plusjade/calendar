import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable } from 'mobx'
import EntryObject from './EntryObject'
import * as Sync from '../api/data'

const sync = ({ object, programId }) => {
  const data = Object.keys(object.toJSON()).reduce((memo, id) => {
    memo = { ...memo, [id]: null }
    return memo
  }, {})
  const json = JSON.stringify(data)
  console.log('sync EntryCollection', json)

  Storage.set(Sync.getKeyEntryCollectionDB({ programId }), json)
}
const debouncedSync = debounce(sync, 1000)

const EntryCollection = ({ objects = {}, programId } = {}) => {
  const object = observable.map(
    Object.keys(objects).map(key => {
      return [key, EntryObject(objects[key])]
    })
  )
  object.observe(test => {
    console.log('observe EntryCollection', test)
    debouncedSync({ object, programId })
  })

  return object
}


export default EntryCollection
