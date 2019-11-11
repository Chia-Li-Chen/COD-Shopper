import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {addProductToCart} from '../store/orderItems'

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
      this.props.orderId,
      this.props.match.params.id,
      this.state.quantity
    )
    this.setState({
      quantity: ''
    })
  }

  async componentDidMount() {
    await this.props.fetchProduct(this.props.match.params.id)
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
          <button type="submit">Add to Cart</button>
        </div>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  orderId: state.orderId
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id)),
  addProductToCart: (orderId, productId, quantity) =>
    dispatch(addProductToCart(orderId, productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
