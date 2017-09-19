/*******
 * REACT IMPORTS
 ******/
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import Config
import routes from "../../config/routes";


/*******
 * COMPONENT
 ******/

export default class Navigation extends Component {


    /**
     * @method
     * @name renderNavigationItems
     */
    renderNavigationItems() {

        const navigationItems = routes.map((route, i) => {
            if (route.datas.navigationItem) {
                return(
                    <li key={i}>
                        <Link to={route.path}>{route.datas.navigationItem}</Link>
                    </li>
                );
            }
        });

        return navigationItems
    }


    /**
     * @method
     * @name render
     */
    render() {
        const renderNavigationItems = this.renderNavigationItems();
        return (
            <nav className="navigation">
                <ul>
                    {renderNavigationItems}
                </ul>
            </nav>
        );
    }
};