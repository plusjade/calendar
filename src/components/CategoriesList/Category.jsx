import { observer } from "mobx-react"
import React from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './style'

const Category = observer(props => {
  const { category, editor } = props
  const onTap = () => {
    editor.activeObject = category
  }

  console.log('render Category')
  return (
    <Hammer onTap={onTap}>
      <div style={{ ...style.entryCard, padding: 10 }}>
        {category.name}
      </div>
    </Hammer>
  )
})
Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  editor: PropTypes.object.isRequired,
}

export default Category
