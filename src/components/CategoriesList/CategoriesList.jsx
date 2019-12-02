import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import CategoryObject from '../../objects/CategoryObject'
import Category from './Category'

import style from './style'

class CategoriesList extends Component {
  static propTypes = {
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  handleAddCategory = () => {
    this.props.week.addCategory(CategoryObject())
  }

  render() {
    console.log('render CategoriesList')
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
