import { observer } from "mobx-react"
import { observable, reaction } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import TemplateView from 'components/TemplateView/TemplateView'
import EditorRoot from '../EditorRoot'
import EntriesList from './EntriesList'
import style from './style'

class ProgramView extends Component {
  static propTypes = {
    program: PropTypes.object.isRequired,
  }

  state = {
    activeTab: 'template',
  }

  constructor(props) {
    super(props)
    const { program } = props

    this.editor = observable({ entry: null })
    // reaction(
    //   () => program.days(),
    //   (days) => {
    //     console.log('reaction', days)
    //   }
    // )
  }

  handleToggleTemplate = () => {
    this.setState({activeTab: 'template'})
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
            <div style={style.navtab}>
              Schedule
            </div>
          </Hammer>
          <Hammer onTap={this.handleToggleTemplate}>
            <div style={{ ...style.navtab, ...style.navtabSettings }}>
              <span role='img' aria-label='settings'>⚙️</span>
            </div>
          </Hammer>
        </div>
        <div style={style.listWrap}>
          {this.state.activeTab === 'template' && (
            <TemplateView
              program={program}
              addEntry={program.addEntry}
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
