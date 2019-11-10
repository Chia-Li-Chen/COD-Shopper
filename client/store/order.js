import axios from 'axios'

/*
 * ACTION TYPES
 */
const CREATE_CART = 'CREATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const GET_ORDERITEM = 'GET_ORDERITEM'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */

const createCartAction = totalPrice => ({type: CREATE_CART, totalPrice})
const addToCartAction = order => ({type: ADD_TO_CART, order})
const getCartAction = orderProducts => ({type: GET_CART, orderProducts})
const getOrderItemAction = orderItems => ({type: GET_ORDERITEM, orderItems})

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

export const getOrderItem = orderId => async dispatch => {
  try {
    const response = await axios.get(`/api/orders/orderItems`, {orderId})
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

export const addToCart = () => async dispatch => {
  try {
    const response = await axios.post('/api/orderstoitems/')
    dispatch(addToCartAction(response.data))
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
    case ADD_TO_CART:
      return {...state, ...action.product}
    case GET_CART:
      return {...state, ...action.orderProducts}
    case GET_ORDERITEM:
      return {...state, ...action.orderItems}
    default:
      return state
  }
}
