import React from "react";
import {Link} from "react-router";
import helpers from "../utils/helpers";

class AllStores extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      storeClicked: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    console.log("did mount")
    helpers.getPromotions().then(function(res) {
      var locationsArray = [];
      var newLocations = [];

      var stores = res.data;

      stores.forEach(function(el) {
        if (locationsArray.indexOf(el.location) === -1) {
          locationsArray.push(el.location);
          helpers.getLocation(el.location).then(function(res) {
            console.log(res)
            newLocations.push({"name": el.location,
                                "total": res.data.length})
            this.setState({results: newLocations});
          }.bind(this))
      }
    }.bind(this))
      // this.setState({results: res.data});
    }.bind(this))
  }

  handleClick() {

    {/* change the state of storeclicked to the store that was clicked and go to store page */}
  }


  render() {
    return (

          <div id="wrapper">
            <center><h3 id="header">My Stores</h3></center>
            <table>
              <th>location</th>
              <th>total promotions</th>
              {this.state.results.map(function(store, i) {
                var url = "/Store/" + store.name
                if (store.total < 5) {
                  return (
                     <tr style={styles.low}
                       key={i}><td><Link to={url} id="location">{store.name}</Link></td>  <td>{store.total}</td></tr>
                  );
                }
                else {
                  return (

                     <tr key={i}><td><Link to={url} id="location">{store.name}</Link></td>  <td>{store.total}</td></tr>
                  );
                }

          })}</table>
          </div>

      );
    }
  }
const styles = {
  low: {'background-color':'rgb(236, 114, 99)'}
}
export default AllStores;
