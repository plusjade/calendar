import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable } from 'mobx'
import EntryObject from './EntryObject'

const sync = ({ object, key }) => {
  const data = Object.keys(object.toJSON()).reduce((memo, id) => {
    memo = { ...memo, [id]: null }
    return memo
  }, {})
  const json = JSON.stringify(data)
  console.log('sync EntryCollection', json)
  Storage.set(key, json)
}
const debouncedSync = debounce(sync, 1000)

const EntryCollection = ({ objects = {}, key } = {}) => {
  const object = observable.map(
    Object.keys(objects).map(key => [ key, EntryObject(objects[key]) ])
  )
  object.observe(test => {
    console.log('observe EntryCollection', test)
    debouncedSync({ object, key })
  })

  return object
}


export default EntryCollection
