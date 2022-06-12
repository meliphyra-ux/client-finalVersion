import React, { Component } from "react";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.product.counter,
    };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }
  incrementCounter(item) {
    this.setState(
      (prevState) => ({
        counter: prevState.counter + 1,
      }),
      () => {
        item.counter = this.state.counter;
        this.props.updateCartInfo();
        this.props.incrementItemCounter();
      }
    );
  }
  decrementCounter(item) {
    if (this.state.counter > 1)
      this.setState(
        (prevState) => ({
          counter: prevState.counter - 1,
        }),
        () => {
          this.props.product.counter = this.state.counter;
          this.props.updateCartInfo();
          this.props.decrementItemCounter();
        }
      );
    else {
      this.props.updateCartInfo();
      this.props.deleteProduct(item);
      this.props.decrementItemCounter();
    }
  }
  render() {
    return (
      <div
        className="navbar--cartOverlay--container"
        key={this.props.product.item.name}
      >
        <div className="navbar--cartOverlay--info">
          <h2>{this.props.product.item.brand}</h2>
          <h2>{this.props.product.item.name}</h2>
          <h3>
            {this.props.product.item.prices[this.props.currency].currency
              .symbol +
              this.props.product.item.prices[this.props.currency].amount}
          </h3>
          {this.props.product.item.attributes.map((att) => (
            <section key={att.name}>
              <h3>{att.name + ":"}</h3>
              <div className="navbar--cartOverlay--info--parametrs">
                {att.items.map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      att.name === "Color" &&
                      this.props.product.ids[
                        this.props.product.item.attributes.indexOf(att)
                      ] === item.displayValue
                        ? "cart--parametrs--border--active"
                        : ""
                    } ${att.name === "Color" ? "cart--parametrs--border" : ""} inline`}
                  >
                    <div
                      style={{
                        width:
                          att.name !== "Color"
                            ? att.name === "Size"
                              ? "24px"
                              : "fit-content"
                            : "16px",
                        height: att.name !== "Color" ? "24px" : "16px",

                        backgroundColor:
                          att.name !== "Color"
                            ? ""
                            : item.displayValue.toLowerCase(),
                        border:
                          this.props.product.ids[
                            this.props.product.item.attributes.indexOf(att)
                          ] !== item.displayValue
                            ? "1px solid #1D1F22"
                            : "",
                      }}
                      id={item.displayValue}
                      className={
                        this.props.product.ids[
                          this.props.product.item.attributes.indexOf(att)
                        ] === item.displayValue
                          ? `pdp--activeItem cart--item ${
                              att.name === "Color" ? " cart--color" : ""
                            }`
                          : `cart--item ${
                              att.name === "Color" ? " cart--color" : ""
                            }`
                      }
                    >
                      {att.name !== "Color"
                        ? att.name === "Size" &&
                          isNaN(Number(item.displayValue))
                          ? item.displayValue === "Extra Small" ||
                            item.displayValue === "Extra Large"
                            ? `X${item.displayValue[6]}`
                            : item.displayValue[0]
                          : item.displayValue
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="navbar--cartOverlay--container--counterButtons">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.incrementCounter(this.props.product);
            }}
          >
            +
          </button>
          <p className="navbar--cartOverlay--container--counter">{this.state.counter}</p>
          <button
            onClick={(e) => {
              this.decrementCounter(this.props.product);
            }}
          >
            -
          </button>
        </div>
        <div className="navbar--cartOverlay--container--gallery">
          <img src={this.props.product.item.gallery[0]} alt="" />
        </div>
      </div>
    );
  }
}
