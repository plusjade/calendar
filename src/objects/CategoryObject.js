import { token } from '../lib/actions'

const CategoryObject = ({ id, name, data_type, data_source } = {}) => ({
  type: 'CategoryObject',
  id: id || token(),
  name,
  data_type,
  data_source,
})

export default CategoryObject
