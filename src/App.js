import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./pages/cart/Cart";
import Main from "./pages/main/Main";
import Pdp from "./pages/pdp/Pdp";
import { useNavigate, Navigate } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      currency: 0,
      itemCounter: 0,
      height: 0,
      page: ""
    };
    this.heightCalc = React.createRef();
    this.handleCart = this.handleCart.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.toggleCurrency = this.toggleCurrency.bind(this);
    this.incrementItemCounter = this.incrementItemCounter.bind(this);
    this.decrementItemCounter = this.decrementItemCounter.bind(this);
    this.heightOutput = this.heightOutput.bind(this);
  }
  toggleCurrency(id) {
    this.setState({
      currency: id,
    });
  }

  incrementItemCounter() {
    this.setState({
      itemCounter: this.state.itemCounter + 1,
    });
  }
  decrementItemCounter() {
    this.setState({
      itemCounter: this.state.itemCounter - 1,
    });
  }
  heightOutput(func) {
    const height = this.divElement.clientHeight;
    this.setState({ height }, () => {
      return func;
    });
  }
  handleCart(item) {
    const product = this.state.cart.find(
      (product) =>
        product.item.id === item.item.id &&
        JSON.stringify(product.ids) === JSON.stringify(item.ids)
    );
    if (product && JSON.stringify(product.ids) === JSON.stringify(item.ids)) {
      product.counter += 1;
      this.incrementItemCounter(item);
    } else {
      this.setState({
        cart: [...this.state.cart, item],
      });
      this.incrementItemCounter(item);
    }
  }
  deleteProduct(item) {
    const deletedProduct = this.state.cart.find(
      (product) => product.item.id === item.item.id && product.ids === item.ids
    );
    const cart = [...this.state.cart];
    cart.splice(cart.indexOf(deletedProduct), 1);
    this.setState(
      {
        cart: [...cart],
      }
    );
  }
  render() {
    return (
      <div
        className="App"
        ref={(divElement) => {
          this.divElement = divElement;
        }}
      >
        <Navbar
          cart={this.state.cart}
          handleCart={this.handleCart}
          currency={this.state.currency}
          deleteProduct={this.deleteProduct}
          toggleCurrency={this.toggleCurrency}
          itemCounter={this.state.itemCounter}
          heightCalc={this.state.height}
          heightOutput={this.heightOutput}
          incrementItemCounter={this.incrementItemCounter}
          decrementItemCounter={this.decrementItemCounter}
          navigate={this.props.navigate}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/all" />} />
          <Route
            path="/:id"
            element={
              <Main
                handleCart={this.handleCart}
                currency={this.state.currency}
                navigate={this.props.navigate}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <Pdp
                {...this.props}
                handleCart={this.handleCart}
                currency={this.state.currency}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                {...this.props}
                handleCart={this.handleCart}
                currency={this.state.currency}
                cart={this.state.cart}
                deleteProduct={this.deleteProduct}
                incrementItemCounter={this.incrementItemCounter}
                decrementItemCounter={this.decrementItemCounter}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default function AppWrap(props) {
  return <App {...props} navigate={useNavigate()} />;
}
