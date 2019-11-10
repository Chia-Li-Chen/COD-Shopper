import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateCart} from '../store'
const defaultState = {
  totalPrice: 0,
  itemQuantity: {},
  showTotalPrice: 0,
  basePrice: 0
}

class OrderProducts extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showTotalPrice = this.showTotalPrice.bind(this)
  }

  componentDidMount() {
    this.setState({totalPrice: this.props.order[0].totalPrice})
    // this.props.order[0].products.map(product => {
    //   this.setState({totalPrice:[product.id]: product.quantity})
    // })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateCart(this.state)
  }

  showTotalPrice() {}

  render() {
    if (this.props.order) {
      return (
        <div>
          <h5>Total Price: ${this.state.totalPrice / 100} </h5>
          <button type="button" className="checkout">
            Save
          </button>
          <ul>
            {this.props.order[0].products.map(product => (
              <li key={product.id}>
                <div className="productItem">
                  <div className="productImage">
                    <img
                      src={`${product.imageUrl}`}
                      width="128px"
                      height="128px"
                    />
                  </div>
                  <div className="productDetails">
                    <div className="productName">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <div>
                        <button type="button" className="deleteButton">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="productQuantity">
                      <label>Quantity: {product.order_to_item.quantity}</label>
                      <input type="button" name="decrease" value="-" />
                      <input type="button" name="increase" value="+" />
                    </div>
                  </div>

                  <div className="productPrice">
                    <h5>${product.price / 100}</h5>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      return <h4>Your cart is empty </h4>
    }
  }
}

const mapStateToProps = state => {
  return {order: state.order}
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: state => {
      dispatch(updateCart(state))
    }
  }
}

const ConnectedOrderProducts = connect(mapStateToProps, mapDispatchToProps)(
  OrderProducts
)

export default ConnectedOrderProducts
