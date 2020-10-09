import React from 'react'

const Alert = props => {

  return (
    <div
      className={`alert alert-${props.alertType} alert-dismissible fade ${props.alert ? 'show d-block' : 'd-none'}`}
      role="alert"
    >
      <strong>{props.content}</strong>
      {/* <button type="button" class="close" onClick={()=> props.setAlert(false)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
    </div>
  )
}

export default Alert;