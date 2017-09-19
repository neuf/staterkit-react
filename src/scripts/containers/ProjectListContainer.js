// Import React
import React, { Component } from "react";

// Import Store
import store from '../config/store';
import { getProjectsSuccess } from '../actions/projectActions';
import { connect } from 'react-redux';

import api from "../config/api";


// Import Components
import ProjectList from "../components/01_layouts/ProjectList";

// Component
class ProjectListContainer extends Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      datasAreFetched : false,
      projects : []
    };
  }

  /**
   * @method
   * @name componentDidMount
   */
  componentDidMount() {

    // API CALL
    api.getProjects()
      .then((response) => {
        /* Dispatch to store */
        store.dispatch(getProjectsSuccess(response));
        /* Set to disable change loading state */
        this.setState({ datasAreFetched: true })
      })
      .then(() => {
        /* Work with projects list */
        const projects = this.props.projects;
        projects.map((project) => {
          project.active = true;
        });
        this.setState({
          projects: projects
        });
      });
  }

  /**
   * @method
   * @name toggleActive
   * @param project - Array of objects contains all projects
   */
  toggleActive(project) {

    // State should never be mutated (changed) directly.
    // So create a shallow copy of the projects list
    const newProject = Object.assign({}, project, {
      active: !project.active
    });

    // create a shallow copy of the projects list
    const newProjects = this.state.projects.slice();

    // put the new project into the new list
    const index = this.state.projects.indexOf(project);
    newProjects[index] = newProject;

    // set state with new projects
    this.setState({
      projects: newProjects
    });
  }


  renderProjectList(){
    return (
      <ProjectList projects={this.state.projects} toggleActive={this.toggleActive.bind(this)}/>
    )
  }

  renderLoader(){
    // We can imagine a loader component
    return (
      <p>Please wait we load datas</p>
    )
  }


  /**
   * @method
   * @name render
   */
  render() {

    let projectListRender = null;

    /* Loader if datas aren't ready */
    if (this.state.datasAreFetched) {
      projectListRender = this.renderProjectList();
    } else {
      projectListRender = this.renderLoader();
    }

    return (
      <div>
        <div className="test">gegre</div>
        {projectListRender}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    projects: store.projectReducer.projects
  };
};

export default connect(mapStateToProps)(ProjectListContainer);
