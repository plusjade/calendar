import { token } from '../lib/actions'

const EntryObject = ({ id, day_id, category_id, text = '', tags = [] }) => ({
  id: id || token(),
  day_id,
  category_id,
  text,
  tags,
  category_name: '',
})

export default EntryObject
