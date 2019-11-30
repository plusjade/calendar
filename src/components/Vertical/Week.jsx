import { observer } from "mobx-react"
import { observable, reaction, action } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditorRoot from '../EditorRoot'
import Entry from './Entry'
import style from './style'

class Week extends Component {
  static propTypes = {
    week: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    const { week } = props

    this.editor = observable({ entry: null })

    reaction(
      () => week.days(),
      (days) => {
        console.log('reaction', days)
      }
    )
  }

  render() {
    const { week } = this.props

    return (
      <div style={style.app}>
        <EditorRoot editor={this.editor} />

        <div style={style.entriesPanel}>
          <div>
            {week.getCategories().map(({ name, id }) => (
              <div>{name}</div>
            ))}
          </div>
          {week.days().map(({ day_name, entries }) => (
            <div key={day_name} style={style.entryWrap}>
              <div style={style.dayHeading}>{day_name}</div>
              <table style={style.entryTable}>
                <tbody>
                  {entries.map(entry => (
                    <Entry entry={entry} key={entry.id} editor={this.editor} />
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Radium(observer(Week))
