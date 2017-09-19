// Import React
import React, { Component } from "react";

// Import Components
import ProjectListContainer from "../../containers/ProjectListContainer"


// Component
class Home extends Component {
  render() {
    return (
      <div className="home_wrapper">
          <h1>Homepage</h1>
          <img src="../assets/images/ohyeah.gif" alt=""/>
          <ProjectListContainer/>
      </div>
    )
  }
};

export default Home;
