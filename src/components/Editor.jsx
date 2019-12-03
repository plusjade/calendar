import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import EnterText from './EnterText/EnterText'
import EditCategoryObject from './EditCategoryObject'

const style = {
  default: {
    position: 'fixed',
    bottom: 0,
    top: 0,
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
    backgroundColor: '#212121',
    borderRadius: '10px 10px 0 0',
    minHeight: '20vh',
    height: '90vh',
    padding: 10,
    color: '#EEEEEE',
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
      activeObject: PropTypes.object,
    }).isRequired,
  }

  handleClose = () => {
    this.props.editor.activeObject = null
  }

  onEnterText = (value) => {
    if (value) {
      this.onChangeText(value)
    }

    this.handleClose()
  }

  onChangeText = (value) => {
    this.props.editor.activeObject.text = value || ''
  }

  onEnterTags = (value) => {
    if (value) {
      this.onChangeTags(value)
    }

    this.handleClose()
  }

  onChangeTags = (value) => {
    this.props.editor.activeObject.tags = (value || '').split(' ')
  }

  render() {
    console.log('editor render')
    const { activeObject = {} } = this.props.editor
    const entry = activeObject && activeObject.type === 'EntryObject' ? activeObject : null
    const category = activeObject && activeObject.type === 'CategoryObject' ? activeObject : null

    const { text, tags, category: { name } = {}, id, category_id } = entry || {}

    const isActive = entry || category ? style.isActive : {}
    const css = {...style.default, ...isActive}

    return (
      <div style={css}>
        <div>
          <Hammer onTap={this.handleClose}>
            <div style={style.close}><div style={style.closeInner}>❌</div></div>
          </Hammer>
        </div>
        <div style={style.inner}>
          {category && <EditCategoryObject category={category} />}
          {entry && (
            <div>
              <div>id: {id || ''}</div>
              <div>category_id: {category_id || ''}</div>
              <div>name: {name}</div>
              <div>
                <EnterText
                  value={entry.text}
                  onSubmit={this.onEnterText}
                  onChange={this.onChangeText}
                  placeholder={'enter a text description'}
                  isActive
                />
              </div>
              <div>
                <EnterText
                  value={tags.join(' ')}
                  onSubmit={this.onEnterTags}
                  onChange={this.onChangeTags}
                  placeholder={'tags'}
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
