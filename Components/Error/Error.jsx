
import React from 'react'
import Style from './Error.module.css'

export const Error = ({ error }) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Plese fix this issue or reload the browser</h1>
        {error}
      </div>
    </div>
  )
}
