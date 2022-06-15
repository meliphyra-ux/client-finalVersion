import React from "react";
import ProductInCart from "./ProductInCart";
import "./Cart.css";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      quantity: 0,
      tax: 0,
      currency: "",
      currencyId: 0,
      cart: null,
    };
    this.updateCartInfo = this.updateCartInfo.bind(this);
  }
  updateCartInfo() {
    let total = 0;
    let quantity = 0;
    let tax = 0;
    let currency = "$";
    this.props.cart.forEach((product) => {
      total +=
        Number(product.item.prices[this.props.currency].amount) *
        Number(product.counter);
      quantity += Number(product.counter);

      currency = product.item.prices[this.props.currency].currency.symbol;
    });
    tax = ((total / 100) * 21).toFixed(2);
    this.setState({
      total: total.toFixed(2),
      quantity: quantity,
      tax: tax,
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
      <div className="cart">
        <h1>CART</h1>
        {this.props.cart.map((product) => (
          <ProductInCart
            key={product.item.name + product.ids}
            currency={this.props.currency}
            product={product}
            cart={this.props.cart}
            deleteProduct={this.props.deleteProduct}
            updateCartInfo={this.updateCartInfo}
            incrementItemCounter={this.props.incrementItemCounter}
            decrementItemCounter={this.props.decrementItemCounter}
          />
        ))}
        <div className="cart--totalInfo">
          {this.props.cart.length !== 0 && (
            <>
              <h2>
                Tax 21%: <b>{this.state.currency + this.state.tax}</b>
              </h2>
              <h2>
                Quantity: <b>{this.state.quantity}</b>
              </h2>
              <h2>
                Total: <b>{this.state.currency + this.state.total}</b>
              </h2>
              <button>CHECK OUT</button>
            </>
          )}
        </div>
        {this.props.cart.length === 0 && <h1>Cart is empty</h1>}
        
      </div>
    );
  }
}
export default Cart;
