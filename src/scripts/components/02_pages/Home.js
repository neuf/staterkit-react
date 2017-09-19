// Import React
import React, { Component } from "react";

// Import Components
import ProjectListContainer from "../../containers/ProjectListContainer"


// Component
class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <ProjectListContainer/>
      </div>
    )
  }
};

export default Home;
