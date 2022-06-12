import React from "react";

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "USD",
    };
  }
  toggleActive(item, id, currencySymbol) {
    this.setState(
      {
        activeItem: item,
      },
      () => {
        this.props.toggleCurrencies(currencySymbol);
        this.props.toggleCurrency(id);
        this.props.showCurrencies()
      }
    );
  }
  render() {
    return (
      <div className="navbar--currencyList">
        {this.props.currency &&
          this.props.currency.map((currency) => (
            <h1
              key={currency.label}
              onClick={() => {
                this.toggleActive(
                  currency.label,
                  this.props.currency.indexOf(currency),
                  currency.symbol
                );
              }}
            >
              {currency.symbol + currency.label}
            </h1>
          ))}
      </div>
    );
  }
}
export default CurrencySwitcher;
