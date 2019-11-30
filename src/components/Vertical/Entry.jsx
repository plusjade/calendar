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
      category_name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
    }).isRequired,
    editor: PropTypes.shape({
      isActive: PropTypes.bool.isRequired,
      activeEntry: PropTypes.object,
    }).isRequired,
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.props.entry.text = this.props.entry.text + ' 🥝 '
    //   this.props.entry.tags = [...this.props.entry.tags, '🐻 ']
    // }, 2500)
  }

  onTap = () => {
    console.log('tapped!')
    const { entry, editor } = this.props
    editor.entry = entry
  }

  render() {
    console.log('Entry render')
    const { text, tags, category_name, id, category_id } = this.props.entry

    return (
      <Hammer onTap={this.onTap}>
        <tr style={style.tr} key={category_name}>
          <td style={style.td}>

              <div>{category_name}</div>

          </td>
          <td style={style.td}>
            <div style={style.entryText}>
              <div>{text}</div>
              <div>{id || ''}</div>
              <div>{category_id || ''}</div>
            </div>
          </td>
          <td style={style.td}>
            <div style={style.tagsWrap}>
              {tags.map(tag => (
                <span style={style.hashtag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </td>
        </tr>
      </Hammer>
    )
  }
}

export default Radium(observer(Entry))
