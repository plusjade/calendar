import { DateTime, Interval, Duration, Info } from 'luxon'
import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import TemplateDay from 'components/TemplateDay/TemplateDay'
import Entry from 'components/Vertical/Entry'
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
    const start = DateTime.fromObject({ ordinal: DateTime.local().ordinal, weekday: 1 })
    const end = DateTime.local().plus({ weeks: 1 })
    const interval = Interval.fromDateTimes(start, end)

    return (
      <div>
        <div>
          <EnterText
            value={''}
            onSubmit={this.onEnterTags}
            onChange={this.onChangeTags}
            placeholder={'template name'}
            isActive
          />
        </div>
        <h3 style={style.heading}>
          Week Template
        </h3>
        {Info.weekdays('short').map(day => (
          <TemplateDay day={day} editor={editor} />
        ))}

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
