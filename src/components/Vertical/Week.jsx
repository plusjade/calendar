import { observer } from "mobx-react"
import { observable, reaction, action } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import CategoryObject from '../../objects/CategoryObject'
import EditorRoot from '../EditorRoot'
import Entry from './Entry'
import style from './style'


const Category = observer(props => {
  const { category, editor } = props
  const text = category ? category.name : <span>➕</span>
  const onTap = () => {
    if (category) {
      editor.activeObject = category
    } else {
      const newCat = CategoryObject()
      editor.activeObject = newCat
    }
  }

  return (
    <Hammer onTap={onTap}>
      <div style={{ ...style.entryCard, padding: 10 }}>
        {text}
      </div>
    </Hammer>
  )
})


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
        <EditorRoot editor={this.editor} week={week} />
        <div style={style.listWrap}>
          <div style={style.listHeading}>Categories</div>
          {week.getCategories().map(category =>
            <Category
              key={category.id}
              category={category}
              editor={this.editor}
            />
          )}
          <div style={style.entryCard}>
            <Category editor={this.editor} />
          </div>

          {week.days().map(({ day_name, entries }) => (
            <div key={day_name} style={style.dayCard}>
              <div style={style.listHeading}>{day_name}</div>
              {entries.map(entry => (
                <Entry entry={entry} key={entry.id} editor={this.editor} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Radium(observer(Week))
