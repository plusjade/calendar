import { token } from '../lib/actions'
import randomEmoji from '../db/randomEmoji'

const CategoryObject = ({ id, name, data_type, data_source } = {}) => ({
  type: 'CategoryObject',
  id: id || token(),
  name: name || randomEmoji(3),
  data_type,
  data_source,
})

export default CategoryObject
