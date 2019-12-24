import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable, autorun, toJS } from "mobx"
import { token } from '../lib/actions'
import randomEmoji from '../db/randomEmoji'
import * as Sync from '../api/data'

const sync = (object) => {
  const data = toJS(object)
  delete data.category
  const json = JSON.stringify(data)
  console.log('sync CategoryObject', object.id, json)

  Storage.set(Sync.getKeyCategoryDB(object.id), json)
}
const debouncedSync = debounce(sync, 1000)

const CategoryObject = ({ id, name, data_type, data_source } = {}) => {
  const object = observable({
    o_type: 'CategoryObject',
    id: id || token(),
    name: name || randomEmoji(3),
    data_type,
    data_source,
  })

  autorun(() => {
    const { id, name, data_type, data_source } = object
    debouncedSync(object)
    return
  })

  return object
}


export default CategoryObject
