import axios from 'axios'

/*
 * ACTION TYPES
 */
const GET_ORDERITEM = 'GET_ORDERITEM'

/**
 * INITIAL STATE
 */
const defaultOrderItem = []

/**
 * ACTION CREATORS
 */

const getOrderItemAction = orderItems => ({type: GET_ORDERITEM, orderItems})

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

/**
 * REDUCER
 */
export default function(state = defaultOrderItem, action) {
  Object.freeze(state)
  switch (action.type) {
    case GET_ORDERITEM:
      return [...state, ...action.orderItems]
    default:
      return state
  }
}
