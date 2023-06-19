import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    showPassword: false,
    searchInput: '',
  }

  onClickSubmit = event => {
    event.preventDefault()
    console.log('submit triggered')
    const {website, username, password} = this.state
    const id = uuidv4()

    this.setState(prevState => ({
      passwordsList: [
        ...prevState.passwordsList,
        {website, username, password, id},
      ],
      website: '',
      username: '',
      password: '',
    }))

    this.setState({
      website: '',
      username: '',
      password: '',
    })

    // const websiteName = this.onChangeWebsiteName()
    // console.log(websiteName)
  }

  onChangeWebsiteName = event => {
    // console.log(event.target.value)
    const websiteEntered = event.target.value
    this.setState({website: websiteEntered})
  }

  onChangeUsername = event => {
    console.log(event.target.value)
    const usernameEntered = event.target.value
    this.setState({username: usernameEntered})
  }

  onChangePassword = event => {
    console.log(event.target.value)
    const passwordEntered = event.target.value
    this.setState({password: passwordEntered})
  }

  onChangeSearchInput = event => {
    const searchInputValue = event.target.value
    this.setState({searchInput: searchInputValue})
  }

  onShowPasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onFilteredList = (passwordsList, searchInput) => {
    const filteredList = passwordsList.filter(eachPassword =>
      eachPassword.website.includes(searchInput),
    )
    return filteredList
  }

  onDeletePasswordItem = delId => {
    // console.log('delete triggered')
    console.log(delId)
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachItem => eachItem.id !== delId)
    this.setState({passwordsList: [...newList]})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      showPassword,
      searchInput,
    } = this.state

    console.log(passwordsList)
    const noOfPasswords = passwordsList.length

    console.log(searchInput)
    const filteredList = this.onFilteredList(passwordsList, searchInput)

    // console.log(showPassword)
    // console.log(filteredList)

    return (
      <div className="app-container">
        <div className="form-card-sec">
          <form onSubmit={this.onClickSubmit}>
            <h1> Add New Password </h1>
            <div className="website-input">
              <img alt="website" />
              <input
                type="input"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteName}
                value={website}
              />
            </div>
            <div className="website-input">
              <img alt="username" />
              <input
                type="input"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="website-input">
              <img alt="password" />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>

            <button type="submit"> Add </button>
          </form>
        </div>
        <div>
          <div className="passwords-sec">
            <h1> passwords </h1>
            <p> {noOfPasswords} </p>
          </div>

          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              type="search"
              onChange={this.onChangeSearchInput}
              placeholder="Search"
            />
          </div>
        </div>
        <hr />
        <div>
          <input
            type="checkbox"
            onClick={this.onShowPasswords}
            id="showPasswords"
          />
          <label htmlFor="showPasswords"> Show Passwords </label>
        </div>

        {filteredList.map(eachItem => (
          <PasswordItem
            passwordState={showPassword}
            details={eachItem}
            onDeletePasswordItem={this.onDeletePasswordItem}
            key={eachItem.id}
          />
        ))}
      </div>
    )
  }
}

export default PasswordManager
