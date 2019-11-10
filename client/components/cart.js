import React from 'react'
import {getCart} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.getCart(this.props.user.id)
  }
  render() {
    console.log('the products: ', this.props)
    const {products} = this.props
    return (
      <div className="all-products-body">
        <h1>{this.props.user.firstName}'s Shopping Cart</h1>
        <ul>
          {products.productList.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
  user: state.user,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => dispatch(getCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
