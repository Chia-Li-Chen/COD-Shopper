import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createCart, getCart} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  async componentDidMount() {
    console.log('props>>>>>', this.props)
    await this.props.getCart(this.props.userId)
    console.log('Submitted date >>>>', this.props.orderSubmittedDate)
    if (this.props.orderSubmittedDate !== null) {
      await this.props.createCart(this.props.userId)
    }
  }

  render() {
    let order = this.props.orders[0]
    console.log('<<<<<Order prop: ', this.props.order)
    if (order) {
      return (
        <div>
          <h3>Welcome, {this.props.user.firstName}</h3>
          <h4>Your Shopping Cart: </h4>
          <ul>
            {order.products.map(product => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
          <h5>Total Price: ${order.totalPrice / 100} </h5>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Welcome, {this.props.user.firstName}</h3>
          <h4>Your Shopping Cart: </h4>
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    email: state.user.email,
    userId: state.user.id,
    orderSubmittedDate: state.order.orderSubmittedDate,
    orders: state.order
  }
}

const mapDispatch = dispatch => ({
  getCart: id => dispatch(getCart(id)),
  createCart: id => dispatch(createCart(id))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  // email: PropTypes.string
}
