import axios from 'axios'

/*
 * ACTION TYPES
 */
const CREATE_CART = 'CREATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'

/**
 * INITIAL STATE
 */
const defaultOrder = {
  0: {
    totalPrice: 0,
    products: []
  }
}

/**
 * ACTION CREATORS
 */

const createCartAction = totalPrice => ({type: CREATE_CART, totalPrice})
const addToCartAction = order => ({type: ADD_TO_CART, order})
const getCartAction = orderProducts => ({type: GET_CART, orderProducts})
export const deleteProductFromCart = id => ({
  type: DELETE_PRODUCT_FROM_CART,
  itemId: id
})
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
    case DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        0: {
          ...state[0],
          products: state[0].products.filter(item => item.id !== action.itemId)
        }
      }
    default:
      return state
  }
}
