import { token } from '../lib/actions'

const CategoryObject = ({ id, name, type, data_source }) => ({
  id: id || token(),
  name,
  type,
  data_source,
})

export default CategoryObject
