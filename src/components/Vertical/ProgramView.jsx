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

class ProgramView extends Component {
  static propTypes = {
    program: PropTypes.object.isRequired,
  }

  state = {
    activeTab: 'list',
  }

  constructor(props) {
    super(props)
    const { program } = props

    this.editor = observable({ entry: null })

    reaction(
      () => program.days(),
      (days) => {
        console.log('reaction', days)
      }
    )
  }

  handleToggleCategories = () => {
    this.setState({activeTab: 'categories'})
  }

  handleToggleWeek = () => {
    this.setState({activeTab: 'list'})
  }

  render() {
    const { program } = this.props

    return (
      <div>
        <EditorRoot editor={this.editor} />
        <div style={style.navigationWrap}>
          <Hammer onTap={this.handleToggleWeek}>
            <div style={style.navtab}>Weight Training</div>
          </Hammer>
          <Hammer onTap={this.handleToggleCategories}>
            <div style={{ ...style.navtab, ...style.navtabSettings }}>
              <span role='img' aria-label='settings'>⚙️</span>
            </div>
          </Hammer>
        </div>
        <div style={style.dateNavigationWrap}>
          <div style={style.navtabDate}>2019</div>
          <div style={style.navtabDate}>DEC</div>
        </div>
        <div style={style.listWrap}>
          {this.state.activeTab === 'categories' && (
            <CategoriesList
              addCategory={program.addCategory}
              categories={program.getCategories()}
              editor={this.editor}
            />
          )}
          {this.state.activeTab === 'list' && (
            <EntriesList
              program={program}
              editor={this.editor}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Radium(observer(ProgramView))
