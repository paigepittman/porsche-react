import React from "react";
import router from "react-router";
import {Route} from "react-router";
import {Router} from "react-router";
import {Link} from "react-router";
import {IndexRoute} from "react-router";
import {browserHistory} from "react-router";

import Main from "../components/Main";
import AllStores from "../components/children/AllStores";
import Scan from "../components/children/Scan";
import Store from "../components/children/Store";

// Export the Routes
module.exports = (
  // High level component is the Router component.
  <Router history={browserHistory}>
    <Route path="/" component={Main}>

      {/* If user selects Search or Saved show the appropriate component */}
      <Route path="AllStores" component={AllStores} />
      <Route path="Scan" component={Scan} />
      <Route path="Store/:name" component={Store} />


      {/*<Route exact path="/profile" render={(props) => ( <Profile user={this.props.user}/> )} /> */}

}

      {/* If user selects any other path... we get the Home Route */}
      <IndexRoute component={Scan} />

    </Route>
  </Router>
);
