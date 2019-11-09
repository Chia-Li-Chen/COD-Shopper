import React from 'react'
import {fetchProducts} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts()
  }
  render() {
    const {products} = this.props
    return (
      <div className="all-products-body">
        <h1>All the products!</h1>
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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
