import axios from 'axios'

/*
 * ACTION TYPES
 */
const GET_ORDERITEM = 'GET_ORDERITEM'
const UPDATE_ORDERITEM = 'UPDATE_ORDERITEM'
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

export const updateOrderItems = orderItem => async dispatch => {
  try {
    const response = await axios.put(
      `/api/orders/updateOrderItems/${orderItem.orderId}/${
        orderItem.productId
      }/${orderItem.quantity}`
    )
    dispatch(updateOrderItemsAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const addProductToCart = orderId => async dispatch => {
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
/**
 * REDUCER
 */
export default function(state = defaultOrderItem, action) {
  Object.freeze(state)
  switch (action.type) {
    case GET_ORDERITEM:
      return [...state, ...action.orderItems]
    case UPDATE_ORDERITEM: {
      const updatedOrderItem = state.orderItems.map(orderItem => {
        if (
          orderItem.orderId === action.orderItem.orderId &&
          orderItem.productId === action.orderItem.productId
        ) {
          return action.orderItem
        } else {
          return orderItem
        }
      })
      return {...state, updatedOrderItem}
    }
    case ADD_PRODUCT_TO_CART:
      return {...state, ...action.product}
    default:
      return state
  }
}
