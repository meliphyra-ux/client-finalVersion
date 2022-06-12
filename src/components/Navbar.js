import React from "react";
import Logo from "../assets/logo.svg";
import Vector from "../assets/Vector.svg";
import VectorRev from "../assets/VectorRev.svg";
import Cart from "../assets/Cart.svg";
import { getCurrencies, getCategories } from "../GraphQL/queries";
import "./Navbar.css";
import CurrencySwitcher from "./CurrencySwitcher";
import CartOverlay from "./CartOverlay";
 
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.open = React.createRef()
    this.state = {
      activeCategory: "all",
      categories: [],
      isCurrenciesVisible: false,
      isCartVisible: false,
      currency: [],
      currencySymbol: "$"
    };
    this.toggleCurrencies = this.toggleCurrencies.bind(this);
    this.showCurrencies = this.showCurrencies.bind(this);
  }
  componentDidMount() {
    getCurrencies().then(({ currencies }) => {
      this.setState({
        currency: currencies,
      });
    });
    getCategories().then(({categories}) =>{
      this.setState({
        categories: categories,
      });
    })
  }
  toggleCurrencies(currencySymbol) {
    this.setState({
      currencySymbol: currencySymbol,
    });
  }
  showCurrencies() {
    this.props.heightOutput()
    this.setState({
      isCurrenciesVisible: !this.state.isCurrenciesVisible,
    });
  }
  showCart() {
    this.setState({
      isCartVisible: !this.state.isCartVisible,
    });
  }
  render() {
    window.addEventListener("click", (e)=>{
      if(this.state.isCurrenciesVisible && e.target !== this.open.current){
        this.setState({
          isCurrenciesVisible: false
        })
      }
    })
    return (
      <>
      <nav className="navbar">
        <div className="navbar--navigation">
          {this.state.categories.map(category =>(
            <div key={category.name} className={this.state.activeCategory === category.name ? "active" : ""} onClick={()=>{
            this.props.navigate(`/${category.name}`)
            this.setState({
              activeCategory: category.name
            })
          }}>
            {category.name[0].toUpperCase() + category.name.substring(1)}
          </div>
          ))}
          
        </div>
          <img src={Logo} alt="logo"></img>
        <div className="navbar--buttons">
          <div className="navbar--currency">
            <button ref={this.open}
              onClick={() => {
                this.showCurrencies();
              }}
            >
              {this.state.currencySymbol}
              <img src={this.state.isCurrenciesVisible ? VectorRev : Vector} alt=""/>
            </button>
            {this.state.isCurrenciesVisible && (
              <CurrencySwitcher
                toggleCurrencies={this.toggleCurrencies}
                currency={this.state.currency}
                toggleCurrency={this.props.toggleCurrency}
                updateCartInfo={this.props.updateCartInfo}
                showCurrencies={this.showCurrencies}
              />
            )}
          </div>
          <div className="navbar--cart">
            <button onClick={() => this.props.heightOutput(this.showCart())}>
              <img src={Cart} alt=""/>
              {this.props.itemCounter ? <div className="item--counter">{this.props.itemCounter}</div> : ""}
            </button>
          </div>
        </div>
      </nav>
      {this.state.isCartVisible && (
              <div className="navbar--cartBackground" 
              style={{
                height: `${this.props.heightCalc - 80}px`
              }}
              onClick={() => {
                this.showCart()
                }}>
                <CartOverlay
                  cart={this.props.cart}
                  currency={this.props.currency}
                  itemCounter={this.props.itemCounter}
                  deleteProduct={this.props.deleteProduct}
                  incrementItemCounter={this.props.incrementItemCounter}
                  decrementItemCounter={this.props.decrementItemCounter}
                  showCart={this.showCart}
                  navigate={this.props.navigate}
                />
              </div>
            )}
      </>
    );
  }
}

export default Navbar;
