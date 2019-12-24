import { DateTime } from 'luxon'
import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable, autorun, toJS } from "mobx"
import { token } from '../lib/actions'
import * as Sync from '../api/data'

const sync = (object) => {
  const data = toJS(object)
  if (data.text === '' && data.type === '') {
    console.log('skipping empty EntryObject')
    // don't save empty data -- these are Entry stubs for the UI
    return
  }

  delete data.category
  const json = JSON.stringify(data)
  console.log('sync EntryObject', object.id, json)
  Storage.set(Sync.getKeyEntry(object.id), json)
}
const debouncedSync = debounce(sync, 1000)

const EntryObject = ({ id, iso_date, category_id, text = '', type = '' } = {}) => {
  const object = observable({
    o_type: 'EntryObject',
    id: id || token(),
    iso_date: iso_date || DateTime.local().toISODate(),
    category_id,
    text,
    type,
    category: {},
  })

  autorun(() => {
    const { id, iso_date, text, type } = object
    debouncedSync(object)
  })

  return object
}

export default EntryObject
