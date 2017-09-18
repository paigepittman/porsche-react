import React from "react";
import {Link} from "react-router";
import helpers from '../utils/helpers';

class Scan extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
   }
  //
  componentWillUnmount() {

    helpers.runScrape().then(function(response) {
      console.log(response);
    })

 }


  render() {
    return (

          <div id="buttons">
            <Link to="/AllStores" className="waves-effect waves-light btn-large blue" id="scrape-button">scan for promos</Link>
            </div>

          );
        }
      }

  export default Scan;
