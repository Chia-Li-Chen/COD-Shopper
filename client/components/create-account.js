import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addUser} from '../store/user'

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: ''
}

class AddUser extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleKey = this.handleKey.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleKey(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    // if (this.state.password.length < 12) {
    //   alert("password must be at least 12 characters")
    // } else {
    //   this.props.addUser(this.state)
    // }
    this.props.addUser(this.state)
    this.setState(defaultState)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={this.state.firstName}
            onChange={event => this.setState({firstName: event.target.value})}
            onKeyDown={this.handleKey}
          />
          <label>Last Name</label>
          <input
            type="text"
            value={this.state.lastName}
            onChange={event => this.setState({lastName: event.target.value})}
            onKeyDown={this.handleKey}
          />
          <label>Email</label>
          <input
            type="email"
            value={this.state.email}
            onChange={event => this.setState({email: event.target.value})}
            onKeyDown={this.handleKey}
          />
          <label>Phone</label>
          <input
            type="tel"
            value={this.state.phoneNumber}
            onChange={event => this.setState({phoneNumber: event.target.value})}
            onKeyDown={this.handleKey}
          />
          <label>Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={event => this.setState({password: event.target.value})}
            onKeyDown={this.handleKey}
          />
        </div>

        <button type="submit">Add User</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {users: state.users}
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: state => {
      dispatch(addUser(state))
    }
  }
}

const ConnectedAddUser = connect(mapStateToProps, mapDispatchToProps)(AddUser)
export default ConnectedAddUser
