import React from "react";
import CartItem from "./CartItem";

class CartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currency: "",
      currencyId: 0,
      counter: 0,
      cart: 0,
    };
    this.updateCartInfo = this.updateCartInfo.bind(this);
  }
  updateCartInfo() {
    let total = 0;
    let currency = "$";

    this.props.cart.forEach((product) => {
      total +=
        Number(product.item.prices[this.props.currency].amount) *
        Number(product.counter);
      currency = product.item.prices[this.props.currency].currency.symbol;
    });
    this.setState({
      total: total.toFixed(2),
      currency: currency,
      currencyId: this.props.currency,
      cart: this.props.cart,
    });
  }
  componentDidMount() {
    this.updateCartInfo();
  }
  componentDidUpdate() {
    if (
      this.props.currency !== this.state.currencyId ||
      this.props.cart !== this.state.cart
    ) {
      this.updateCartInfo();
    }
  }
  render() {
    return (
      <div
        className="navbar--cartOverlay"
        onClick={(e) => {
          e.stopPropagation();
          console.log(this.props.cart);
        }}
      >
        {this.props.cart.length !== 0 && (
          <>
            <h1>
              My Bag, <span>{this.props.itemCounter} items</span>
            </h1>
            {this.props.cart.map((product) => (
              <CartItem
                key={JSON.stringify(product.ids)}
                updateCartInfo={this.updateCartInfo}
                deleteProduct={this.props.deleteProduct}
                incrementItemCounter={this.props.incrementItemCounter}
                decrementItemCounter={this.props.decrementItemCounter}
                currency={this.props.currency}
                product={product}
              />
            ))}
            <h3 className="navbar--cartOverlay--total">
              Total: {this.state.currency + this.state.total}
            </h3>
          </>
        )}
        {this.props.cart.length === 0 && (
          <h1>Cart is empty</h1>
        )}
        <button
        className="navbar--cartOverlay--bag"
          onClick={() => {
            // this.props.showCart()
            this.props.navigate("/cart")
          }}
        >
          VIEW BAG
        </button>
        <button>ORDER</button>
      </div>
    );
  }
}
export default CartOverlay;
