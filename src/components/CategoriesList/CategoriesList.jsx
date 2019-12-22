import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import Category from './Category'
import EnterText from '../EnterText/EnterText'
import style from './style'

class CategoriesList extends Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
  }

  handleAddCategory = () => {
    this.props.addCategory()
  }

  render() {
    console.log('render CategoriesList')
    const { editor, categories } = this.props

    return (
      <div>
        <div>
          <h3 style={style.heading}>Template name</h3>
          <EnterText
            value={''}
            onSubmit={this.onEnterTags}
            onChange={this.onChangeTags}
            placeholder={'template name'}
            isActive
          />
        </div>
        <h3 style={style.heading}>Categories</h3>
        {categories.map(category =>
          <Category
            key={category.id}
            category={category}
            editor={editor}
          />
        )}

        <Hammer onTap={this.handleAddCategory}>
          <div style={{ ...style.entryCard, padding: 10 }}>
            <span role='img' aria-label='add category'>➕</span>
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(observer(CategoriesList))
