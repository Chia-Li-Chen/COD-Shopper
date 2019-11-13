import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {logout} from '../store'
import AddUser from './create-account'
import {AppBar, Toolbar} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    <div className="nav-left">
      COD
      <Link to="/home">Shopping Cart</Link>
      <Link to="/products"> See All Products</Link>
    </div>
    <div className="nav-right">
      {isLoggedIn ? (
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      ) : (
        <Fragment>
          <Link to="/login">Login</Link>
          <Link to="/create-account"> Create Account</Link>
        </Fragment>
      )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
