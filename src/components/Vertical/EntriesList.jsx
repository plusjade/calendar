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
        {program.days().map(({ day_name, entries }) => (
          <div key={day_name} style={style.dayCard}>
            <div style={style.listHeading}>
              <div style={style.listHeadingText}>
                {day_name}
              </div>
            </div>
            {entries.map(entry => (
              <Entry entry={entry} key={entry.id} editor={editor} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Radium(observer(EntriesList))
