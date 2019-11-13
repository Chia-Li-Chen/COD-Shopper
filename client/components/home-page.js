import React from 'react'
import {Login} from './auth-form'

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page-body">
        <h1>Welcome To The Best Fish Dealer on the Net</h1>
        <Login />
      </div>
    )
  }
}
