import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './style'

class Entry extends Component {
  static propTypes = {
    entry: PropTypes.shape({
      id: PropTypes.string.isRequired,
      category_id: PropTypes.string.isRequired,
      category: PropTypes.object.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    editor: PropTypes.shape({
      activeObject: PropTypes.object,
    }).isRequired,
  }

  onTap = () => {
    const { entry, editor } = this.props
    editor.activeObject = entry
  }

  render() {
    console.log('Entry render')
    const { text, type, category: { name }, id, category_id } = this.props.entry

    return (
      <Hammer onTap={this.onTap}>
        <div style={style.entryCard} key={id}>
          <div style={style.entryText}>
            {text}
          </div>
          <div style={style.entryTags}>
            {type}
          </div>

        </div>
      </Hammer>
    )
  }
}

export default Radium(observer(Entry))
