// Import React
import React, { Component } from "react";
import { Route } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import AnimatedSwitch from '../utils/AnimatedSwitch';

// Import Config
import routes from "../config/routes";

// Import Components
import Navigation from "../components/00_ui/Navigation"

// Component
class App extends Component {

	/**
	 * @constructor
	 */
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderRoutes() {
		return routes.map((r, i) => {
			return <Route exact={r.exact} path={r.path} component={r.component} key={i}/>
		});
	}


	/**
	 * @method
	 * @name render
	 */
	render() {
		const renderRoutes = this.renderRoutes();
		return (
			<main className="main">
				<Navigation></Navigation>
				<Route
					render={({ location }) => (
						<TransitionGroup component="div">
							<AnimatedSwitch key={location.key} location={location}>
								{renderRoutes}
							</AnimatedSwitch>
						</TransitionGroup>
					)}
				/>
			</main>
		); 
	}
}


export default App;
