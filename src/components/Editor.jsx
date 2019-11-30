import { observer } from "mobx-react"
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

const style = {
  default: {
    position: 'fixed',
    bottom: 0,
    // height: '90vh',
    backgroundColor: '#CCC',
    overflow: 'hidden',
    width: '100vw',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px 10px 0 0',
    justifyContent: 'flex-end',
    transition: "transform 180ms ease-in-out",
    transform: 'translateY(100%)',
  },
  isActive: {
    transform: 'translateY(0)',
  },
  inner: {
    // background: '#FFF',
    padding: 10,
    height: '20vh'
  }
}

class Editor extends Component {
  static propTypes = {
    editor: PropTypes.shape({
      entry: PropTypes.object,
    }).isRequired,
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.props.editor.isActive = true
  //   }, 3000)
  // }
  handleClose = () => {
    this.props.editor.entry = null
  }

  render() {
    const { entry } = this.props.editor
    const { text, tags, category_name, id, category_id } = entry || {}

    const isActive = entry ? style.isActive : {}
    const css = {...style.default, ...isActive}
    console.log('entry', entry)
    return (
      <div style={css}>
        <div style={{textAlign: 'right', padding: 10}}>
          <Hammer onTap={this.handleClose}>
            <div style={{fontSize: 20}}>❌</div>
          </Hammer>
        </div>
        <div style={style.inner}>
          {entry && (
            <div>
              <div>{category_name}</div>
              <div>{entry.text}</div>
              <div>{entry.tags}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default observer(Editor)
