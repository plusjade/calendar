import { DateTime, Interval, Duration, Info } from 'luxon'
import { observer } from 'mobx-react'
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EnterText from 'components/EnterText/EnterText'
import TemplateDay from 'components/TemplateDay/TemplateDay'
import style from './style'

class TemplateView extends Component {
  static propTypes = {
    addEntry: PropTypes.func.isRequired,
    editor: PropTypes.object.isRequired,
  }

  render() {
    const { editor, addEntry, program } = this.props
    const start = DateTime.fromObject({ ordinal: DateTime.local().ordinal, weekday: 1 })
    const end = DateTime.local().plus({ weeks: 1 })
    const interval = Interval.fromDateTimes(start, end)

    return (
      <div>
        {Info.weekdays('long').map(day => (
          <TemplateDay
            day={day}
            editor={editor}
            addEntry={addEntry}
            entries={program.templateEntriesByDay(day)}
          />
        ))}
        <div>
          <EnterText
            value={''}
            onSubmit={this.onEnterTags}
            onChange={this.onChangeTags}
            placeholder={'template name'}
            isActive
          />
        </div>
      </div>
    )
  }
}

export default Radium(observer(TemplateView))
