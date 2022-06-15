import React from "react";

class PdpProps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
    };
    this.toggleActive = this.toggleActive.bind(this);
  }
  toggleActive(item) {
    this.setState({
      active: item,
    },()=>{
    });
  }
  render() {
    return (
      <section>
        <h3>{this.props.att.name.toUpperCase() + ":"}</h3>
        <div className="pdp--parametrs">
          {this.props.att.items.map((item) => (
            <div key={item.id} className={`${this.props.att.name === "Color" && this.state.active === item.displayValue ? "pdp--parametrs--border--active" : ""} ${this.props.att.name === "Color" ? "pdp--parametrs--border" : ""}`}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleActive(item.displayValue);
                }}
                
                style={{
                  padding:
                    this.props.att.name !== "Color" ? "13px 23px" : "",
                  backgroundColor:
                    this.props.att.name !== "Color"
                      ? ""
                      : item.displayValue.toLowerCase(),
                  border: this.state.active !== item.displayValue ? "1px solid #1D1F22" : ""
                }}
                id={item.displayValue}
                className={
                  this.state.active === item.displayValue
                    ? `pdp--activeItem pdp--item ${this.props.att.name === "Color" ? " pdp--color" : ""}`
                    : `pdp--item ${this.props.att.name === "Color" ? " pdp--color" : ""}`                     
                }
              >
                {this.props.att.name !== "Color" ? item.displayValue : ""}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default PdpProps;
