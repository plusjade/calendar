import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Editor from './Editor'

const Node = window.document.getElementById('editor-root')
const EditorRoot = props =>
  ReactDOM.createPortal(<Editor {...props} />, Node)

export default EditorRoot
