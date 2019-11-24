import React from 'react'
import Radium from 'radium'
import style from './style'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const HASHTAG_REGEX = /#(\w+)/g

const Spreadsheet = ({ week, template: { columns } }) => (
  <div>
    <div style={style.headerWrap}>
      <table style={style.headerTable}>
        <thead>
          <tr>
            {columns.map(({ name }) => (
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
        {DAYS.map((day) => (
          <div key={day} style={style.entryWrap}>
            <table style={style.entryTable}>
              <tbody>
                <tr style={style.tr}>
                  {columns.map(({ name }, i) => (
                    <td style={style.td} key={name}>
                      <div style={style.tagsWrap}>
                        {(((week[day] || [])[i] || '').match(HASHTAG_REGEX) || []).map((tag) => (
                          <span style={style.hashtag} key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <textarea
                        defaultValue={(week[day] || [])[i]}
                        style={style.input}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Radium(Spreadsheet)
