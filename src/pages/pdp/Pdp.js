import React from "react";
import PdpProps from "../../components/PdpProps";
import { getProduct } from "../../GraphQL/queries";
import "./Pdp.css";
import { Markup } from "interweave";
import { WrapComponent } from "../../components/WrapComponent";

class Pdp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null,
      description: null,
      err: null,
      mainFoto: null,
      actives: [],
      inStock: true,
      refItems: [],
    };
    this.pathname = React.createRef();
    this.toggleMainFoto = this.toggleMainFoto.bind(this);
    this.addToRefs = this.addToRefs.bind(this);
    this.Refs = React.createRef();
    this.Refs.current = [];
  }
  toggleMainFoto(e) {
    this.setState({
      mainFoto: e.target.src,
    });
  }
  addToRefs(el) {
    this.state.refItems.push(el);
  }

  toggleActives() {
    let ids = [];
    this.state.refItems.map((item) => ids.push(item.state.active));
    if (
      this.state.properties.attributes.length === 0 ||
      (!ids.includes(null) &&
        ids.length === this.state.properties.attributes.length)
    ) {
      this.props.handleCart({
        item: this.state.properties,
        ids: [...ids],
        counter: 1,
      });
    } else {
      alert("Pick attributes");
    }
  }
  componentDidMount() {
    const { id } = this.props.params;
    getProduct(id)
      .then(({ product }) => {
        this.setState({
          id: id,
          properties: product,
          description: product.description,
          mainFoto: product.gallery[0],
          inStock: product.inStock,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          err: "Could not fetch data",
        });
      });
  }

  render() {
    return (
      <>
        {this.state.err && <h1>Could not fetch data</h1>}
        {this.state.properties && (
          <div className="pdp">
            <div className="pdp--gallery">
              {this.state.properties.gallery.map((foto) => (
                <img
                  key={foto}
                  src={foto}
                  onClick={(e) => this.toggleMainFoto(e)}
                  alt=""
                />
              ))}
            </div>
            <div className="pdp--mainFoto--wrapper">
              <img src={this.state.mainFoto} className="pdp--mainFoto" alt="" />
            </div>
            <div className="pdp--info">
              <h1>{this.state.properties.brand}</h1>
              <h2>{this.state.properties.name}</h2>

              {this.state.properties.attributes.map((att) => (
                <PdpProps
                  ref={this.addToRefs}
                  key={att.name}
                  att={att}
                  toggleActives={this.toggleActives}
                />
              ))}
              <h3>Price</h3>
              <h3>
                {this.state.properties.prices[this.props.currency].currency
                  .symbol +
                  this.state.properties.prices[this.props.currency].amount}
              </h3>
              {this.state.inStock && (
                <button
                  className="pdp--inStock"
                  onClick={() => {
                    this.toggleActives();
                  }}
                >
                  ADD TO CART
                </button>
              )}
              {!this.state.inStock && (
                <button className="pdp--outOfStock">Out of The Stock</button>
              )}
              <Markup content={this.state.description} />
            </div>
          </div>
        )}
      </>
    );
  }
}
export default WrapComponent(Pdp);
