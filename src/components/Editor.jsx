import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import EnterText from './EnterText/EnterText'

const style = {
  default: {
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    transition: "transform 180ms ease-in-out",
    transform: 'translateY(100%)',
  },
  isActive: {
    transform: 'translateY(0)',
  },
  inner: {
    backgroundColor: '#CCC',
    borderRadius: '10px 10px 0 0',
    minHeight: '20vh',
    maxHeight: '95vh',
    padding: 10,
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeInner: {
    padding: 10,
    fontSize: 20,
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

class Editor extends Component {
  static propTypes = {
    editor: PropTypes.shape({
      entry: PropTypes.object,
    }).isRequired,
  }

  handleClose = () => {
    this.props.editor.entry = null
  }

  onEnterText = (value) => {
    if (value) {
      this.onChangeText(value)
    }

    this.handleClose()
  }

  onChangeText = (value) => {
    this.props.editor.entry.text = value || ''
  }

  onEnterTags = (value) => {
    if (value) {
      this.onChangeTags(value)
    }

    this.handleClose()
  }

  onChangeTags = (value) => {
    this.props.editor.entry.tags = (value || '').split(' ')
  }

  render() {
    const { entry } = this.props.editor
    const { text, tags, category_name, id, category_id } = entry || {}
    const isActive = entry ? style.isActive : {}
    const css = {...style.default, ...isActive}

    return (
      <div style={css}>
        <div>
          <Hammer onTap={this.handleClose}>
            <div style={style.close}><div style={style.closeInner}>❌</div></div>
          </Hammer>
        </div>
        <div style={style.inner}>
          {entry && (
            <div>
              <div>id: {id || ''}</div>
              <div>category_id: {category_id || ''}</div>
              <div>category_name: {category_name}</div>
              <div>
                <EnterText
                  value={tags.join(' ')}
                  onSubmit={this.onEnterTags}
                  onChange={this.onChangeTags}
                  placeholder={'tags'}
                  isActive
                />
              </div>
              <div>
                <EnterText
                  value={entry.text}
                  onSubmit={this.onEnterText}
                  onChange={this.onChangeText}
                  placeholder={'enter a text description'}
                  isActive
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default observer(Editor)
