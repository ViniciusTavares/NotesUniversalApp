/** @module common/renderFields */

import React from 'react'

export const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="render-field">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="remove-margin-bottom" />
      {touched && ((error && <small className="form-error-message">{error}</small>) || (warning && <small>{warning}</small>))}
    </div>
  </div>
)

export const renderSelect = ({ input, label, type, meta: { touched, error, warning }, children }) => (
  <div className="render-field">
    <label>{label}</label>
    <select {...input} className="remove-margin-bottom">
      {children}
    </select>
    {touched && ((error && <small className="form-error-message">{error}</small>) || (warning && <small>{warning}</small>))}
  </div>
)

export const renderTextarea = ({ input, label, rows, type, meta: { touched, error, warning } }) => (
  <div className="render-field">
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} rows={rows} className="remove-margin-bottom" type="textarea" />
      {touched && ((error && <small className="form-error-message">{error}</small>) || (warning && <small>{warning}</small>))}
    </div>
  </div>
)
