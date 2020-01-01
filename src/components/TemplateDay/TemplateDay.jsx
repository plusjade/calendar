import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import Entry from 'components/Vertical/Entry'
import style from './style'

class TemplateDay extends Component {
  static propTypes = {}

  handleAddEntry = () => {
    const { addEntry, day } = this.props

    addEntry({ position: day })
  }

  render() {
    const { day, editor, entries = [] } = this.props
    return (
      <div key={day} style={style.dayCard}>
        <div style={style.listHeading}>
          <div style={style.listHeadingText}>
            {day}
          </div>
        </div>
        {entries.map(entry => (
          <Entry entry={entry} key={entry.id} editor={editor} />
        ))}
        <Hammer onTap={this.handleAddEntry}>
          <div style={style.addEntry}>
            <span role='img' aria-label={`add entry for ${day}`}>Add ➕</span>
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(observer(TemplateDay))
