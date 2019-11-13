import React from 'react'
import {connect} from 'react-redux'
import {createCart, getCart, deleteProductFromCart} from '../store'
import GuestOrderProducts from './guestOrderProducts'

/**
 * COMPONENT
 */
class GuestCart extends React.Component {
  render() {
    let guestCart = this.props.guestCart
    if (guestCart.totalPrice > 0) {
      return (
        <div>
          <h3>Welcome, nameless wayward fish connoisseur</h3>
          <h4>Your Shopping Cart: </h4>
          <div>
            <GuestOrderProducts />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Welcome, nameless wayward fish connoisseur</h3>
          <h4>What are you doing? Go buy some fish.</h4>
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
    orderId: state.order.id,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => ({
  getCart: id => dispatch(getCart(id)),
  createCart: id => dispatch(createCart(id)),
  deleteProduct: (productId, orderId) =>
    dispatch(deleteProductFromCart(productId, orderId))
})

export default connect(mapState, mapDispatch)(GuestCart)
