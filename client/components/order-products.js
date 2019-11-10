import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateCart} from '../store'

const defaultState = {
  totalPrice: 0,
  products: [],
  showTotalPrice: 0,
  orderToItem: []
}

class OrderProducts extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.calcTotalPrice = this.calcTotalPrice.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  async componentDidMount() {
    this.setState({totalPrice: this.props.order[0].totalPrice})
    this.setState({products: this.props.order[0].products})
    this.setState({showTotalPrice: this.props.order[0].totalPrice})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateCart(this.state)
  }

  calcTotalPrice() {
    let totalPriceShown = this.state.products.reduce((acc, product) => {
      let subtotal = product.price * product.order_to_item.quantity
      return acc + subtotal
    }, 0)
    this.setState({showTotalPrice: totalPriceShown})
  }

  increment(productId) {}

  decrement(productId) {
    let productToUpdate = this.state.products.filter(
      product => product.id === productId
    )
    let quantity = productToUpdate[0].order_to_item.quantity
    let price = productToUpdate[0].price
    quantity = quantity < 1 ? quantity : quantity - 1
    price = price * quantity
    this.calcTotalPrice()
    console.log('price: ', price)
    console.log('quantity: ', quantity)
    console.log('productToUpdate: ', productToUpdate)
  }

  render() {
    console.log('this.state: ', this.state)
    if (this.props.order) {
      return (
        <div>
          <h5>Total Price: ${this.state.showTotalPrice / 100} </h5>
          <button type="button" className="checkout">
            Save
          </button>
          <ul>
            {this.state.products.map(product => (
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
                      <input
                        type="button"
                        name="decrease"
                        value="-"
                        onClick={() => {
                          this.decrement(product.id)
                        }}
                      />
                      <input
                        type="button"
                        name="increase"
                        value="+"
                        onClick={() => {
                          this.increment(product.id)
                        }}
                      />
                    </div>
                  </div>
                  <div className="productPrice">
                    <label>Price per item: </label>
                    <h5>${product.price / 100}</h5>
                    <label>Subtotal: </label>
                    <h5>
                      ${product.price * product.order_to_item.quantity / 100}
                    </h5>
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
