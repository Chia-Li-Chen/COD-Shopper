import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {createCart, getCart, addProductToCart} from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addProductToCart(
      this.props.orders[0].id,
      this.props.match.params.id,
      this.state.quantity
    )
    this.setState({
      quantity: ''
    })
  }

  async componentDidMount() {
    await this.props.fetchProduct(this.props.match.params.id)
    if (this.props.user.id) {
      await this.props.getCart(this.props.userId)
      if (this.props.orders[0]) {
        if (
          this.props.orders[0].orderSubmittedDate !== null ||
          this.props.orders[0].orderSubmittedDate
        ) {
          await this.props.createCart(this.props.userId)
        }
      }
    }
  }

  render() {
    return (
      <table className="single-product-body">
        <tbody>
          {this.props.products.productList.map(product => (
            <tr key={product.id}>
              <img src={product.imageUrl} width="150" height="150" />
              <td>{`Name: ${product.name}`}</td>
              <td>{`Description: ${product.description}`}</td>
              <td>{`Price: $${product.price / 100.0}`}</td>
            </tr>
          ))}
        </tbody>
        <div>
          <label>
            Quantity:
            <input
              type="integer"
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </label>
          <form onSubmit={this.handleSubmit}>
            <button type="submit">Add to Cart</button>
          </form>
        </div>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user,
  email: state.user.email,
  userId: state.user.id,
  orders: state.order
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id)),
  addProductToCart: (orderId, productId, quantity) =>
    dispatch(addProductToCart(orderId, productId, quantity)),
  getCart: id => dispatch(getCart(id)),
  createCart: id => dispatch(createCart(id)),
  deleteProduct: (productId, orderId) =>
    dispatch(deleteProductFromCart(productId, orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
