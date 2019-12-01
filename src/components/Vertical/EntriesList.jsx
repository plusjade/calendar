import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import style from './style'

class EntriesList extends Component {
  static propTypes = {
    week: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
  }

  render() {
    const { week, editor } = this.props

    return (
      <div>
        {week.days().map(({ day_name, entries }) => (
          <div key={day_name} style={style.dayCard}>
            <div style={style.listHeading}>{day_name}</div>
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
