import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import CategoryObject from '../../objects/CategoryObject'

import style from './style'

const Category = observer(props => {
  const { category, editor } = props
  const onTap = () => {
    editor.activeObject = category
  }

  return (
    <Hammer onTap={onTap}>
      <div style={{ ...style.entryCard, padding: 10 }}>
        {category.name}
      </div>
    </Hammer>
  )
})


class CategoriesList extends Component {
  static propTypes = {
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  onEnterText = (value) => {
    if (value) {
      this.onChangeText(value)
    }

    this.handleClose()
  }

  onChangeText = (value) => {
    this.props.category.name = value || ''
  }

  handleAddCategory = () => {
    console.log('handleAddCategory')
    this.props.week.addCategory(CategoryObject())
  }

  render() {

    return (
      <div>
        {this.props.week.getCategories().map(category =>
          <Category
            key={category.id}
            category={category}
            editor={this.props.editor}
          />
        )}

        <Hammer onTap={this.handleAddCategory}>
          <div style={{ ...style.entryCard, padding: 10 }}>
            <span>➕</span>
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(observer(CategoriesList))
