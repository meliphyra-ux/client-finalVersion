import React from "react";
import Product from "../../components/Product";
import "./Main.css";
import { getCategory } from "../../GraphQL/queries";
import { useParams  } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      title: "",
      err: null,
      page: null,
    };
  }
  componentDidMount() {
    const { id } = this.props.params
    getCategory(id)
      .then((data) => {
        this.setState({
          products: data.category.products,
          title:
            data.category.name[0].toUpperCase() +
            data.category.name.substring(1),
          page: id,
        });
      })
      .catch((err) => {
        this.setState({
          err: err,
        });
      });
  }
  componentDidUpdate() {
    const { id } = this.props.params
    if (id !== this.state.page)
      getCategory(id)
        .then((data) => {
          this.setState({
            products: data.category.products,
            title:
              data.category.name[0].toUpperCase() +
              data.category.name.substring(1),
            page: id,
          });
        })
        .catch((err) => {
          this.setState({
            err: err,
          });
        });
  }
  render() {
    return (
      <main>
        <h1 className="category">{this.state.title}</h1>
        <div className="category--all">
          <div className="product--grid">
            {this.state.err && <h1>Could not fetch data</h1>}
            {this.state.products &&
              this.state.products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  id={product.id}
                  img={product.gallery[0]}
                  name={product.name}
                  currency={product.prices[this.props.currency].currency.symbol}
                  inStock={product.inStock}
                  price={product.prices[this.props.currency].amount}
                  handleCart={this.props.handleCart}
                  brand={product.brand}
                  navigate={this.props.navigate}
                />
              ))}
          </div>
        </div>
      </main>
    );
  }
}
export default function MainWrap(props){
 return <Main {...props} params={useParams()}/>
};
