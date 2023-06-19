import './index.css'

const PasswordItem = props => {
  const {passwordState, details, onDeletePasswordItem} = props
  console.log(passwordState)

  const {website, username, password} = details

  console.log(website)

  const showPassword = passwordState ? (
    password
  ) : (
    <img
      alt="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
    />
  )

  const onClickDelete = () => {
    onDeletePasswordItem(website)
  }

  return (
    <div className="password-item-card">
      <div className="password-icon">
        <p> {website[0]} </p>
      </div>

      <div>
        <p> {website} </p>
        <p> {username} </p>
        <p> {showPassword} </p>
      </div>

      <button type="button" onClick={onClickDelete}>
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
        />
      </button>
    </div>
  )
}

export default PasswordItem
