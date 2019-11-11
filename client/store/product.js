import axios from 'axios'

/**
 * ACTION TYPES
 */
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_PRODUCT = 'FETCH_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  productList: []
}

/**
 * ACTION CREATORS
 */
const fetchProductsAction = products => ({type: FETCH_PRODUCTS, products})
const fetchProductAction = product => ({type: FETCH_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/products')
    dispatch(fetchProductsAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProduct = id => async dispatch => {
  try {
    const response = await axios.get(`/api/products/${id}`)
    dispatch(fetchProductAction(response.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  Object.freeze(state)
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, productList: action.products}
    case FETCH_PRODUCT:
      return {...state, productList: action.product}
    default:
      return state
  }
}
