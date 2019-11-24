import React from 'react'
import Radium from 'radium'
import style from './style'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const HASHTAG_REGEX = /#(\w+)/g

const Vertical = ({ week, template: { columns } }) => (
  <div>
    <div style={style.app}>
      <div style={style.entriesPanel}>
        {DAYS.map((day) => (
          <div key={day} style={style.entryWrap}>
            <div style={style.dayHeading}>{day}</div>
            <table style={style.entryTable}>
              <tbody>
                {columns.map(({ name }, i) => (
                  <tr style={style.tr} key={name}>
                    <td style={style.td}>{name}</td>
                    <td style={style.td}>
                      <textarea
                        defaultValue={(week[day] || [])[i]}
                        style={style.input}
                      />
                    </td>
                    <td style={style.td}>
                      <div style={style.tagsWrap}>
                        {(((week[day] || [])[i] || '').match(HASHTAG_REGEX) || []).map((tag) => (
                          <span style={style.hashtag} key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Radium(Vertical)
