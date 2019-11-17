import React from 'react'
import Radium from 'radium'

const style = {
  app: {
    display: 'flex',
    height: '95vh',
  },
  headerWrap: {
    height: '5vh',
  },
  headerTable: {
    borderSpacing: 12,
  },
  dayPanel: {
    height: '95vh',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  entriesPanel: {
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  entryWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  entryTable: {
    borderSpacing: 12,
  },
  dayWrap: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  dayText: {
    paddingLeft: 10,
    fontWeight: 'bold',
    // textTransform: 'uppercase',
  },
  th: {
    padding: 10,
    textAlign: 'center',
    minWidth: 200,
  },
  td: {
    border: '1px solid #CCC',
    borderRadius: 5,
    padding: 10,
    minWidth: 200,
  },
}

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const App = ({ week, template: { columns } }) => (
  <div>
    <div style={style.headerWrap}>
      <table>
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
                    <td style={style.td} key={name}>{(week[day] || [])[i]}</td>
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


export default Radium(App)
