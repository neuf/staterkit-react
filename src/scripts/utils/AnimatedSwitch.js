import React, { Component } from "react";
import { Switch } from "react-router-dom";
import pageTransition from "../utils/pageTransitions";

export default class AnimatedSwitch extends Switch {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.transition = new pageTransition();
  }

  componentWillAppear(callBack) {
    this.transition.start('componentWillAppear', this.props.location.pathname, callBack);
  }

  componentWillEnter(callBack) {
    this.transition.start('componentWillEnter', this.props.location.pathname, callBack);    
    console.log("componentWillEnter");
    callBack();
  }

  componentWillLeave(callBack) {
    this.transition.start('componentWillLeave', this.props.location.pathname, callBack);
    console.log("componentWillLeave");
  }


  render() {
    return (
      <div className="animated_page">
        {super.render()}
      </div>
    );
  }
};
