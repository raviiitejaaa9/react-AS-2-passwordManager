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
    const isEmpty = filteredList.length === 0

    console.log(isEmpty)

    const passwordsEmptySec = (
      <div>
        <img
          src=" https://assets.ccbp.in/frontend/react-js/no-passwords-img.png  "
          alt="no passwords"
          className="password-sec-img"
        />
        <p className="form-head"> No Passwords </p>
      </div>
    )

    const passwordItemSec = isEmpty ? passwordsEmptySec : null

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="app-logo"
        />
        <div className="form-card-sec">
          <form onSubmit={this.onClickSubmit} className="form">
            <h1 className="form-head"> Add New Password </h1>
            <div className="website-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="form-icons"
              />
              <input
                type="input"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteName}
                value={website}
                className="form-input-el"
              />
            </div>
            <div className="website-input">
              <img
                src=" https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png  "
                alt="username"
                className="form-icons"
              />
              <input
                type="input"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
                className="form-input-el"
              />
            </div>
            <div className="website-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="form-icons"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
                className="form-input-el"
              />
            </div>

            <button data-testid="delete" type="submit" className="form-btn">
              {' '}
              Add{' '}
            </button>
          </form>

          <div>
            <img
              className="password-manager-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
              alt="password manager "
            />
          </div>
        </div>

        <div className="passwords-sec">
          <div className=" passwords-top-sec ">
            <div className="passwords-count-sec">
              <h1 className="form-head"> Your Passwords </h1>
              <p> {noOfPasswords} </p>
            </div>

            <div className="website-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="form-icons"
              />
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                className="form-input-el"
              />
            </div>
          </div>

          <hr className="hr-el" />

          <div className="show-passwords">
            <input
              type="checkbox"
              onClick={this.onShowPasswords}
              id="showPasswords"
            />
            <label htmlFor="showPasswords"> Show Passwords </label>
          </div>

          <ul className="password-items">
            {passwordItemSec}
            {filteredList.map(eachItem => (
              <PasswordItem
                passwordState={showPassword}
                details={eachItem}
                onDeletePasswordItem={this.onDeletePasswordItem}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
