import React from "react";
import {Link} from "react-router";
import helpers from "../utils/helpers";


class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storeName: this.props.params.name,
      storeData: []
    };
    this.fullPromo = this.fullPromo.bind(this);
  }

  fullPromo(event) {
    console.log(this.event)
  }

  componentDidMount() {
    console.log(this.state.storeName)
    helpers.getLocation(this.state.storeName).then(function(res) {
      this.setState({storeData: res.data})
    }.bind(this))
  }

  render() {
    return (
      <div id="wrapper">
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/AllStores" className="waves-effect waves-light btn blue" id="back-button">view my stores</Link>
          </li>
        </ul>


        <center><h3 id="store-selected">{this.state.storeName}</h3></center>

        <table>
          <th>title</th>
          <th>promo</th>
          <th>category</th>
          <th>image</th>
          {this.state.storeData.map(function(promo, i) {
            var promoSplit = promo.promo.split(" ", 8);
            var promoShort = promoSplit.join(" ") + "...";
        return (

           <tr key={i}>
             <td>{promo.title}</td>
             <td value={promo.promo} onClick= {this.fullPromo}>{promoShort}</td>
             <td>{promo.category}</td>
             <td><img src={promo.image}/></td>
         </tr>
        );
      }.bind(this))}</table>
        <div id="promotions"></div>

      </div>

    );
  }
}

export default Store;
