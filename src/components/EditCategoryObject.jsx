import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import EnterText from './EnterText/EnterText'

class EditCategoryObject extends Component {
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

  render() {
    const { category } = this.props

    return (
      <div>
        <div>id: {category.id || ''}</div>
        <div>
          <EnterText
            value={category.name}
            onSubmit={this.onEnterText}
            onChange={this.onChangeText}
            placeholder={'name'}
            isActive
          />
        </div>
      </div>
    )
  }
}

export default Radium(observer(EditCategoryObject))
