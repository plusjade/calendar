import { token } from '../lib/actions'

const EntryObject = ({ id, day_id, category_id, text = '', tags = [] } = {}) => ({
  type: 'EntryObject',
  id: id || token(),
  day_id,
  category_id,
  text,
  tags,
  category: {},
})

export default EntryObject
