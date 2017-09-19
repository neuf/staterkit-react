                // In this file load CSS / ROUTER / STORE
// and launch app

// Import Styles
import "../styles/app.scss";

// Import React
import React from "react";
import { render } from "react-dom";

// Import Router
import { BrowserRouter as Router } from "react-router-dom";

// Import Redux
import { Provider } from 'react-redux';
import store from './config/store';

// Import App
import App from "./components/app";


// Render
const renderApp = Component =>
	render(
		<Provider store={store}>
			<Router>
				<Component/>
			</Router>
		</Provider>,
		document.getElementById("root")
	);

renderApp(App);

if (module.hot) module.hot.accept("./components/app", () => renderApp(App));
