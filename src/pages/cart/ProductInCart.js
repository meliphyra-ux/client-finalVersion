import React, { Component } from "react";
import Left from "../../assets/CaretLeft.svg";
import Right from "../../assets/CaretRight.svg";

class ProductInCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.product.counter,
      foto: 0,
    };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }
  incrementCounter() {
    console.log(this.props.product);
    this.setState(
      (prevState) => ({
        counter: prevState.counter + 1,
      }),
      () => {
        this.props.product.counter = this.state.counter;
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
      this.setState(
        {
          counter: 0,
        },
        () => {
          this.props.product.counter = this.state.counter;
          this.props.deleteProduct(item);
          this.props.updateCartInfo();
          this.props.decrementItemCounter();
        }
      );
    }
  }
  render() {
    return (
      <section>
        <div className="product--info">
          <h2>{this.props.product.item.name}</h2>
          <h3>{this.props.product.item.brand}</h3>
          <h3 className="product--price">
            {this.props.product.item.prices[this.props.currency].currency
              .symbol +
              this.props.product.item.prices[this.props.currency].amount}
          </h3>
          {this.props.product.item.attributes.map((att) => (
            <section key={att.name}>
              <h3>{att.name.toUpperCase() + ":"}</h3>
              <div className="pdp--parametrs">
                {att.items.map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      att.name === "Color" &&
                      this.props.product.ids[
                        this.props.product.item.attributes.indexOf(att)
                      ] === item.displayValue
                        ? "pdp--parametrs--border--active"
                        : ""
                    } ${att.name === "Color" ? "pdp--parametrs--border" : ""}`}
                  >
                    <div
                      key={item.id}
                      style={{
                        padding: att.name !== "Color" ? "13px 23px" : "",
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
                          ? `pdp--activeItem pdp--item ${
                              att.name === "Color" ? " pdp--color" : ""
                            }`
                          : `pdp--item ${
                              att.name === "Color" ? " pdp--color" : ""
                            }`
                      }
                    >
                      {att.name !== "Color" ? item.displayValue : ""}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="product--counterButtons">
          <button
            onClick={() => {
              this.incrementCounter();
            }}
          >
            +
          </button>
          <p>{this.state.counter}</p>
          <button
            onClick={async () => {
              this.decrementCounter(this.props.product);
            }}
          >
            -
          </button>
        </div>
        <div className="product--gallery">
          {this.props.product.item.gallery.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              style={{
                transform: `translateX(-${this.state.foto}%)`,
              }}
            />
          ))}
          {this.props.product.item.gallery.length !== 1 && (
            <>
              <button
                style={{
                  right: "50px",
                  bottom: "10px",
                }}
                onClick={() => {
                  if (this.state.foto > 0) {
                    this.setState({
                      foto: this.state.foto - 100,
                    });
                  }
                }}
              >
                <img src={Left} alt="" />
              </button>
              <button
                style={{
                  right: "10px",
                  bottom: "10px",
                }}
                onClick={() => {
                  if (
                    this.state.foto <
                    (this.props.product.item.gallery.length - 1) * 100
                  ) {
                    this.setState({
                      foto: this.state.foto + 100,
                    });
                  }
                }}
              >
                <img src={Right} alt="" />
              </button>
            </>
          )}
        </div>
      </section>
    );
  }
}
export default ProductInCart;
