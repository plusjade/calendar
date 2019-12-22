import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable, autorun, toJS } from "mobx"
import { token } from '../lib/actions'
import { getKeyEntry } from '../api/data'

const sync = (object) => {
  const data = toJS(object)
  delete data.category
  const json = JSON.stringify(data)
  console.log('sync EntryObject', object.id, json)

  Storage.set(getKeyEntry(object.id), json)
}
const debouncedSync = debounce(sync, 1000)

const EntryObject = ({ id, day_id, category_id, text = '', type = '' } = {}) => {
  const object = observable({
    o_type: 'EntryObject',
    id: id || token(),
    day_id,
    category_id,
    text,
    type,
    category: {},
  })

  autorun(() => {
    const { id, text, type, day_id } = object
    debouncedSync(object)
  })

  return object
}

export default EntryObject
