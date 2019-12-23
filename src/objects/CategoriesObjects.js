import debounce from 'lodash.debounce'
import * as Storage from '../api/storage'
import { observable } from "mobx"
import CategoryObject from './CategoryObject'
import { getListKeyCategoriesDB } from '../api/data'

const sync = ({ object, programId }) => {
  const data = Object.keys(object.toJSON()).reduce((memo, id) => {
    memo = { ...memo, [id]: true }
    return memo
  }, {})
  const json = JSON.stringify(data)
  console.log('sync CategoriesObjects', json)

  Storage.set(getListKeyCategoriesDB({ programId }), json)
}
const debouncedSync = debounce(sync, 1000)

const CategoriesObjects = ({ objects = {} , programId } = {}) => {
  const object = observable.map(
    Object.keys(objects).map(key => {
      return [key, CategoryObject(objects[key])]
    })
  )

  object.observe(test => {
    console.log('observe categoriesObjects', test)
    debouncedSync({ object, programId })
  })

  return object
}


export default CategoriesObjects
