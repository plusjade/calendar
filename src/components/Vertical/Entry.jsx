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
      tags: PropTypes.array.isRequired,
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
    const { text, tags, category: { name }, id, category_id } = this.props.entry

    return (
      <Hammer onTap={this.onTap}>
        <div style={style.entryCard}>

          <div style={{...style.entryRow, ...style.categoryRow}}>
            <div>{name}</div>
          </div>

          <div style={{...style.entryRow, ...style.TextRow}}>
            <div style={style.entryTextWrap}>
              <div style={style.entryTextTag}>
                {tags[0] || <span style={{color: '#BDBDBD'}}>type</span>}
              </div>
              <div style={style.entryText}>
                {text || <span style={{color: '#BDBDBD'}}>description</span>}
              </div>
            </div>
          </div>


        </div>
      </Hammer>
    )
  }
}

export default Radium(observer(Entry))
