import { observer } from "mobx-react"
import { observable, reaction } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import CategoriesList from '../CategoriesList/CategoriesList'
import EditorRoot from '../EditorRoot'
import EntriesList from './EntriesList'
import style from './style'

class Week extends Component {
  static propTypes = {
    week: PropTypes.object.isRequired,
  }

  state = {
    activeTab: 'week',
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

  handleToggleCategories = () => {
    this.setState({activeTab: 'categories'})
  }

  handleToggleWeek = () => {
    this.setState({activeTab: 'week'})
  }

  render() {
    const { week } = this.props

    return (
      <div>
        <EditorRoot editor={this.editor} week={week} />
        <div style={{display: 'flex'}}>
          <Hammer onTap={this.handleToggleCategories}>
            <div style={style.tab}>Categories</div>
          </Hammer>
          <Hammer onTap={this.handleToggleWeek}>
            <div style={style.tab}>Week</div>
          </Hammer>
        </div>
        <div style={style.listWrap}>
          {this.state.activeTab === 'categories' && (
            <CategoriesList week={week} editor={this.editor} />
          )}
          {this.state.activeTab === 'week' && (
            <EntriesList week={week} editor={this.editor} />
          )}
        </div>
      </div>
    )
  }
}

export default Radium(observer(Week))
