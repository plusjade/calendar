import debounce from 'lodash.debounce'
import { observable } from 'mobx'
import * as Storage from 'api/storage'
import * as Sync from 'api/data'
import CategoryObject from './CategoryObject'

const syncCategoryCollection = ({ object, programId }) => {
  const data = Object.keys(object.toJSON()).reduce((memo, id) => {
    memo = { ...memo, [id]: null }
    return memo
  }, {})
  const json = JSON.stringify(data)
  console.log('sync syncCategoryCollection', json)

  Storage.set(Sync.getKeyCategoryCollectionDB({ programId }), json)
}
const syncCategoryCollectionDebounced = debounce(syncCategoryCollection, 1000)

const CategoryCollection = ({ objects = {} , programId } = {}) => {
  const object = observable.map(
    Object.keys(objects).map(key => {
      return [key, CategoryObject(objects[key])]
    })
  )

  object.observe(test => {
    console.log('observe syncCategoryCollection', test)
    syncCategoryCollectionDebounced({ object, programId })
  })

  return object
}


export default CategoryCollection
