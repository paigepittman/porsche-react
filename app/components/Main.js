import React from "react";
import {Link} from "react-router";

import AllStores from "./children/AllStores";
import Scan from "./children/Scan";
import Store from "./children/Store";
import helpers from "./utils/helpers";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: "bleep"
    };
  }
  render() {
    return (
      <div className="main-container">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">Porsche Specials Tracker</Link>
          </div>
        </nav>

        {this.props.children}

      </div>
    )
  }
}

export default Main;
