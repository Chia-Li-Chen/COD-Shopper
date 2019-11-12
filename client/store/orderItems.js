import axios from 'axios'
import {updateTotalPrice} from './order'

/*
 * ACTION TYPES
 */
const GET_ORDERITEM = 'GET_ORDERITEM'
const UPDATE_ORDERITEM = 'UPDATE_ORDERITEM'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

/**
 * INITIAL STATE
 */
const defaultOrderItem = []

/**
 * ACTION CREATORS
 */

const getOrderItemAction = orderItems => ({type: GET_ORDERITEM, orderItems})
const updateOrderItemsAction = orderItems => ({
  type: UPDATE_ORDERITEM,
  orderItems
})
export const increaseQuantityAction = orderItems => ({
  type: INCREASE_QUANTITY,
  orderItems
})

export const decreaseQuantityAction = orderItems => ({
  type: DECREASE_QUANTITY,
  orderItems
})

const addToCartAction = orderItemInstance => ({
  type: ADD_PRODUCT_TO_CART,
  orderItemInstance
})

/**
 * THUNK CREATORS
 */

export const getOrderItem = orderId => async dispatch => {
  try {
    const response = await axios.get(`/api/orders/orderItems/${orderId}`)
    dispatch(getOrderItemAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateOrderItems = orderItems => async dispatch => {
  const newOrderItems = []
  try {
    for (let i = 0; i < orderItems.length; i++) {
      const eaOrderItem = await axios.put(
        `/api/orders/updateOrderItems/${orderItems[i].orderId}/${
          orderItems[i].productId
        }/${orderItems[i].quantity}`
      )
      newOrderItems.push(...eaOrderItem.data)
    }
    dispatch(updateOrderItemsAction(newOrderItems))
  } catch (err) {
    console.error(err)
  }
}

export const addProductToCart = (
  orderId,
  productId,
  quantity
) => async dispatch => {
  try {
    const response = await axios.post('/api/orders/additem', {
      orderId,
      productId,
      quantity
    })
    dispatch(addToCartAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const increaseQuantity = productId => dispatch => {
  dispatch(increaseQuantityAction(productId))
  dispatch(updateTotalPrice())
}

export const decreaseQuantity = productId => dispatch => {
  dispatch(decreaseQuantityAction(productId))
  dispatch(updateTotalPrice())
}

/**
 * REDUCER
 */

export default function(state = defaultOrderItem, action) {
  Object.freeze(state)
  switch (action.type) {
    case GET_ORDERITEM:
      return [...state, ...action.orderItems]

    case INCREASE_QUANTITY: {
      return state.map(orderItem => {
        if (orderItem.productId === action.orderItems) {
          return {...orderItem, quantity: orderItem.quantity + 1}
        } else {
          return orderItem
        }
      })
    }
    case DECREASE_QUANTITY: {
      return state.map(orderItem => {
        if (
          orderItem.productId === action.orderItems &&
          orderItem.quantity > 1
        ) {
          return {...orderItem, quantity: orderItem.quantity - 1}
        } else {
          return orderItem
        }
      })
    }

    case UPDATE_ORDERITEM: {
      return [...action.orderItems]
    }
    case ADD_PRODUCT_TO_CART:
      return state
    default:
      return state
  }
}
