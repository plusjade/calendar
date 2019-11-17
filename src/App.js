import React from 'react'
import Radium from 'radium'

const style = {
  th: {
    padding: 10,
    textAlign: 'center',
  },
  td: {
    border: '1px solid #CCC',
    padding: 10,
    minWidth: 250,
  },
}

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const App = ({ week, template: { columns } }) => (
  <div>
    <table style={style.table}>
      <thead>
        <tr>
          <th style={style.th} />
          {columns.map(({ name }) => (
            <th style={style.th} key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {DAYS.map((day) => (
          <tr style={style.tr}>
            <th style={style.th}>{day}</th>
            {columns.map(({ name }, i) => (
              <td style={style.td} key={name}>{(week[day] || [])[i]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)


export default Radium(App)
