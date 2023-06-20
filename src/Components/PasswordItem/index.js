import './index.css'

const PasswordItem = props => {
  const {passwordState, details, onDeletePasswordItem} = props
  // console.log(passwordState)

  const {website, username, password, id} = details

  // console.log(website)

  const showPassword = passwordState ? (
    <p className="details"> {password} </p>
  ) : (
    <img
      className="stars-img"
      alt="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
    />
  )

  const onClickDelete = () => {
    onDeletePasswordItem(id)
  }

  return (
    <li className="password-item-card">
      <div className="password-icon">
        <p> {website[0]} </p>
      </div>

      <div>
        <p className="details"> {website} </p>
        <p className="details"> {username} </p>
        {showPassword}
      </div>

      <button type="button" onClick={onClickDelete}>
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
