import React from 'react'
import PropTypes from 'prop-types'
import { connectToContext } from 'Provider'
import { createProject, loadProject } from './utils'

import './styled.css'

/** A project save/load component
 * @component
 * @category Project
 * @since 1.9.0
 */
class ProjectMenu extends React.Component {
  onCreateProject = async () => {
    const { map } = this.props

    const projectFile = await createProject(map)
    // download the project file to local machine
    const dataString = `data:text/jsoncharset=utf-8,${encodeURIComponent(JSON.stringify(projectFile))}`
    const downloadAnchorElement = document.getElementById('_ol_kit_project_download_anchor')

    downloadAnchorElement.setAttribute('href', dataString)
    downloadAnchorElement.setAttribute('download', 'ol_kit_project.olkproj')
    downloadAnchorElement.click()
  }

  onLoadProject = async () => {
    const { map } = this.props
    const upload = document.getElementById('myFile')
    const reader = new FileReader()

    reader.addEventListener('load', e => {
      const data = e.target.result
      const project = JSON.parse(data)

      loadProject(map, project)
    })
    reader.readAsBinaryString(upload.files[0])
  }

  render () {
    return (
      <div className='projectMenuContainer'>
        <a id='_ol_kit_project_download_anchor' style={{ display: 'none' }}></a>
        <div className='miniContainer'>
          <div className='miniHeader'>Save this map as an ol-kit project file:</div>
          <button id='_ol_kit_create_project' onClick={this.onCreateProject}>Save Project</button>
        </div>
        <div className='miniContainer'>
          <div className='miniHeader'>Load a map from a project file:</div>
          <input type='file' id='myFile' accept='.olkproj' onChange={this.onLoadProject} />
        </div>
      </div>
    )
  }
}

ProjectMenu.propTypes = {
  /** a reference to openlayers map object */
  map: PropTypes.object.isRequired
}

export default connectToContext(ProjectMenu)
