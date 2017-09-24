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
    this.sortAlpha = this.sortAlpha.bind(this);
    this.sortTotals = this.sortTotals.bind(this);

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

  sortAlpha() {

var alphaArray = this.state.results
var sorted = alphaArray.sort((a, b) => a.name.localeCompare(b.name));
this.setState({results: sorted})
console.log(sorted);

  }

  sortTotals() {

    const totalsArray = this.state.results
    var sorted = totalsArray.sort(function(a, b){return a.total-b.total});

    console.log(sorted)
    this.setState({results: sorted})

  }


  render() {
    return (

          <div id="wrapper">
            <table id="all-store-table">
              <th onClick={this.sortAlpha}>location</th>
              <th onClick={this.sortTotals}>total promotions</th>
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
  low: {'background-color':'rgb(214, 45, 45)'}
}
export default AllStores;
