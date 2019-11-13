const initState = {
  orderItems: {
    0: {product: {id: 0, price: 1}, quantity: 2},
    1: {product: {id: 1, price: 2}, quantity: 1}
  }
}

const computeTotalPrice = state => {
  return Object.values(state.orderItems).reduce((total, currOrderItem) => {
    return total + currOrderItem.product.price * currOrderItem.quantity
  }, 0)
}

console.log(computeTotalPrice(initState))
