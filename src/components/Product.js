import React from "react";
import "./Product.css";
import CartWhite from "../assets/CartWhite.svg";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      ids: [],
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleUnfocus = this.handleUnfocus.bind(this);
    this.getIDs = this.getIDs.bind(this);
  }
  handleFocus() {
    this.setState({
      focus: true,
    });
  }
  handleUnfocus() {
    this.setState({
      focus: false,
    });
  }
  getIDs() {
    let id = [];
    this.props.product.attributes.forEach((att) => {
      id.push(att.items[1].id);
    });
    this.setState(
      {
        ids: [...id],
      },
      () => {
        this.props.handleCart({
          item: this.props.product,
          ids: this.state.ids,
          counter: 1,
        });
      }
    );
  }
  render() {
    return (
      <div
        className={
          (this.state.focus ? "product--active" : "") + " product product--link"
        }
        onMouseEnter={this.handleFocus}
        onMouseLeave={this.handleUnfocus}
        onClick={()=>{
          this.props.navigate(`/products/${this.props.id}`)
        }}
      >
        {!this.props.inStock && (
          <div className="product--outOfStock">
            <h1>OUT OF STOCK</h1>
          </div>
        )}
        <div className="product--foto">
          <img src={this.props.img} alt="" />
        </div>
        {this.state.focus && this.props.inStock && (
          <button
            className="cart--add"
            onClick={(e) => {
              e.stopPropagation();
              this.getIDs();
            }}
          >
            <img src={CartWhite} alt="" />
          </button>
        )}
        <h3>{this.props.brand} {this.props.name}</h3>
        <h2>{this.props.currency + this.props.price}</h2>
      </div>
    );
  }
}
export default Product;
