import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EnterText from './EnterText/EnterText'

class EditCategoryObject extends Component {
  static propTypes = {
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    name: ''
  }

  componentDidMount() {
    this.setState({ name: this.props.category.name })
  }

  onEnterText = value => {
    const { category } = this.props
    if (value) {
      category.name = value || ''
    }
  }

  onChangeText = value => {
    this.setState({ name: value })
  }

  render() {
    const { category } = this.props

    return (
      <div>
        <div>id: {category.id || ''}</div>
        <EnterText
          value={this.state.name}
          onSubmit={this.onEnterText}
          onChange={this.onChangeText}
          placeholder={'name'}
          isActive
        />
      </div>
    )
  }
}

export default Radium(observer(EditCategoryObject))
