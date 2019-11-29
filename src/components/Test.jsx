import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Test extends Component {
    componentDidMount() {
      setInterval(() => {
          this.props.entry.secondsPassed++
      }, 1000)
    }

    render() {
        console.log('Test render')
        return <span>Seconds passed: {this.props.entry.secondsPassed} </span>
    }
}

export default observer(Radium(Test))
