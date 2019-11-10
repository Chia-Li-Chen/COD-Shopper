import React from 'react'
import {Link} from 'react-router-dom'

const OrderProducts = props => {
  if (props.order) {
    return (
      <div>
        <h5>Total Price: ${props.order.totalPrice / 100} </h5>

        <button type="button" className="checkout">
          Save
        </button>
        <ul>
          {props.order.products.map(product => (
            <li key={product.id}>
              <div className="productItem">
                <div className="productImage">
                  <img
                    src={`${product.imageUrl}`}
                    width="128px"
                    height="128px"
                  />
                </div>
                <div className="productDetails">
                  <div className="productName">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <div>
                      <button type="button" className="deleteButton">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="productQuantity">
                    <label>Quantity: {product.order_to_item.quantity}</label>
                    <input type="button" name="decrease" value="-" />
                    <input type="button" name="increase" value="+" />
                  </div>
                </div>

                <div className="productPrice">
                  <h5>${product.price / 100}</h5>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return <h4>Your cart is empty </h4>
  }
}

export default OrderProducts
