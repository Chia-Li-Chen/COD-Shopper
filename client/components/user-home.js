import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createCart, getCart, getOrderItem} from '../store'
import OrderProducts from './order-products'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  async componentDidMount() {
    await this.props.getCart(this.props.userId)
    if (this.props.orderSubmittedDate !== null) {
      await this.props.createCart(this.props.userId)
    }
    // await this.props.getOrderItem(this.props.order.id)
  }

  render() {
    let order = this.props.orders[0]
    console.log(
      '>>>>>>>order sumbitted date and order id: ',
      this.props.orderSubmittedDate,
      ' and ',
      this.props.orders[0]
    )
    if (order) {
      return (
        <div>
          <h3>Welcome, {this.props.user.firstName}</h3>
          <h4>Your Shopping Cart: </h4>
          <div>
            <OrderProducts order={order} />
          </div>
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
    orderId: state.order.id,
    orderSubmittedDate: state.order.orderSubmittedDate,
    orders: state.order
  }
}

const mapDispatch = dispatch => ({
  getCart: id => dispatch(getCart(id)),
  createCart: id => dispatch(createCart(id)),
  getOrderItem: id => dispatch(getOrderItem(id))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  // email: PropTypes.string
}
