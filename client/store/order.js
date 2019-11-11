import axios from 'axios'

/*
 * ACTION TYPES
 */
const CREATE_CART = 'CREATE_CART'
const GET_CART = 'GET_CART'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'
const GET_ORDERITEM = 'GET_ORDERITEM'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */

const createCartAction = totalPrice => ({type: CREATE_CART, totalPrice})
const getCartAction = orderProducts => ({type: GET_CART, orderProducts})
const getOrderItemAction = orderItems => ({type: GET_ORDERITEM, orderItems})
const updateCartAction = order => ({type: UPDATE_CART, order})

/**
 * THUNK CREATORS
 */

export const getCart = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/orders/${userId}/getCart`)
    dispatch(getCartAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteProductFromCart = id => ({
  type: DELETE_PRODUCT_FROM_CART,
  itemId: id
})

export const updateCart = order => async dispatch => {
  try {
    const response = await axios.put(
      `/api/orders/updateOrder/${order.id}/${order.totalPrice}`
    )
    dispatch(updateCartAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const getOrderItem = orderId => async dispatch => {
  try {
    const response = await axios.get(`/api/orders/orderItems/${orderId}`)
    dispatch(getOrderItemAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const createCart = userId => async dispatch => {
  try {
    const response = await axios.post(`/api/orders/`, {userId})
    dispatch(createCartAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  Object.freeze(state)
  switch (action.type) {
    case CREATE_CART:
      return {...state, ...action.totalPrice}
    case GET_CART:
      return {...state, ...action.orderProducts}
    case DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        orderItems: state.orderItems.filter(
          product => product.id !== action.itemId
        )
      }
    // case GET_ORDERITEM:
    //   return {...state, ...action.orderItems}
    // case UPDATE_CART:
    //   return { ...state, ...action.orderItems }
    default:
      return state
  }
}
