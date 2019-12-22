import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable } from "mobx"
import CategoryObject from './CategoryObject'
import { getListKeyCategories } from '../api/data'

const sync = (object) => {
  const data = Object.keys(object.toJSON()).reduce((memo, id) => {
    memo = { ...memo, [id]: true }
    return memo
  }, {})
  const json = JSON.stringify(data)
  console.log('sync CategoriesObjects', json)

  Storage.set(getListKeyCategories(), json)
}
const debouncedSync = debounce(sync, 1000)

const CategoriesObjects = (objects = {}) => {
  const object = observable.map(
    Object.keys(objects).map(key => {
      return [key, CategoryObject(objects[key])]
    })
  )

  object.observe(test => {
    console.log('observe categoriesObjects', test)
    debouncedSync(object)
  })

  return object
}


export default CategoriesObjects
