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
        {program.weekChunks().map(({ date, chunk }) => (
          <div key={date.toLocaleString()} style={{}}>
            <div style={{textAlign: 'center', padding: 10 }}>
              Week { date.weekNumber } {date.toLocaleString()}
            </div>
            {chunk.map(({ date, entries, isCurrent }) => {
              const name = date.toLocaleString()
              const weekday = date.weekdayShort.toUpperCase()
              const activeStyle = isCurrent ? {color: '#757575', fontWeight: 600, borderColor: '#757575'} : {}
              const activeStyleCard = isCurrent ? { backgroundColor: '#BDBDBD', paddingBottom: 20, marginTop: 10, borderRadius: 10 } : {}
              return (
                <div key={name} style={{...style.dayCard, ...activeStyleCard }}>
                  <div style={style.listHeading}>
                    <div style={{ ...style.listHeadingText, ...activeStyle }}>
                      {date.month}.{date.day} {weekday}
                    </div>
                  </div>
                  {entries.map(entry => (
                    <Entry entry={entry} key={entry.id} editor={editor} />
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
}

export default Radium(observer(EntriesList))
