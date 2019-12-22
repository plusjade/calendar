import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import style from './style'

class EntriesList extends Component {
  static propTypes = {
    program: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
  }

  render() {
    const { program, editor } = this.props

    return (
      <div>
        {program.days().map(({ date, entries }) => {
          const name = date.toLocaleString()
          const weekday = date.weekdayShort.toUpperCase()

          return (
            <div key={name} style={style.dayCard}>
              <div style={style.listHeading}>
                <div style={style.listHeadingText}>
                  {name} {weekday}
                </div>
              </div>
              {entries.map(entry => (
                <Entry entry={entry} key={entry.id} editor={editor} />
              ))}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Radium(observer(EntriesList))
