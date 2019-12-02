import { observable, reaction, action } from "mobx"
import { observer } from "mobx-react"
import React from 'react'
import Radium from 'radium'
import EditorRoot from '../EditorRoot'
import Entry from './Entry'
import style from './style'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const Spreadsheet = ({ week }) => {
  const editor = observable({ entry: null })

  return (
    <div>
      <EditorRoot editor={editor} week={week} />
      <div style={style.headerWrap}>
        <table style={style.headerTable}>
          <thead>
            <tr>
              {week.getCategories().map(({ name }) => (
                <th style={style.th} key={name}>{name}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <div style={style.app}>

        <div style={style.dayPanel}>
          {DAYS.map((day) => (
            <div style={style.dayWrap} key={day}>
              <div style={style.dayText}>{day}</div>
            </div>
          ))}
        </div>

        <div style={style.entriesPanel}>
          {week.days().map(({ day_name, entries }) => (
            <div key={day_name} style={style.entriesWrap}>
              <div style={style.entryRow}>
                {entries.map(entry => (
                  <Entry
                    entry={entry}
                    key={entry.id}
                    editor={editor}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default observer(Spreadsheet)
