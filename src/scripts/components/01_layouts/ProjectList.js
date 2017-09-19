/*******
 * REACT IMPORTS
 ******/
import React, { Component } from "react";

/*******
 * COMPONENT
 ******/
export default class ProjectList extends Component {


  /**
   * @method
   * @name renderProjectList
   */
  renderProjectList() {
    const projectList = this.props.projects.map((project) => {

      let activeStyle = null;

      if (!project.active) {
        activeStyle = {
          opacity: '0.2'
        }
      }

      return(
        <li key={project.id}>
          <p style={activeStyle}>{project.name}</p>
          <button onClick={() => this.props.toggleActive(project)}>Toggle Active</button>
        </li>
      );
    });
    return projectList
  }


  /**
   * @method
   * @name render
   */
  render() {
    const projectList = this.renderProjectList();
    return (
        <ul className="project_list">
          {projectList}
        </ul>
    );
  }
};
