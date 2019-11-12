import React from 'react'
import {createCart, getCart} from './store'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
