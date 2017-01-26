/** @module notes/containers/Form */

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import * as categoryActions from '../../categories/actions'
import * as noteActions from '../actions'
import Notifications from 'react-notification-system-redux';
import { fieldsValidator, renderFields } from '../../common'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class Form extends Component{
  constructor() {
    super()
  }

  static propTypes = {
    formTitle: React.PropTypes.string.isRequired,
    closeForm: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {

    let { handleSubmit, closeForm, formTitle, categories, submitting } = this.props

    let categoriesOptions = this.props.categories.map( (category) =>
    <option key={category._id} value={category._id}>
      {category.name}
    </option> )

    return (
      <form className="modal-form" onSubmit={handleSubmit( values => this.props.onSave(values) )}>
        <h3>{formTitle}</h3>
        <Field name="title" label="Title"
          component={renderFields.renderInput} type="text" validate={fieldsValidator.required}/>

        <Field name="body" validate={fieldsValidator.required} label="Categories" rows="6"
          component={renderFields.renderTextarea}  type="text" validate={fieldsValidator.required} />

        <Field name="category" label="Category"
          component={renderFields.renderSelect} validate={fieldsValidator.required } >
          <option disabled>Pick a category</option>
          {categoriesOptions}
        </Field>
        <div className="inner-center">
          <button type="button" className="button secondary float-right" onClick={closeForm}>Cancel</button>
          <button type="submit" disabled={submitting} className="button dark float-right">
            Save
          </button>
        </div>
      </form>
    )
  }
}

Form = reduxForm({
  form: 'noteForm', 
})(Form);

Form = connect(
  state => ({
    initialValues: state.notes.selectedNote, // pull initial values from account reducer,
    categories: state.categories.data,
    operationHasBeenSucceded: state.notes.operationHasBeenSucceded
  }),
  (dispatch, ownProps, mergeProps) => ({
    fetchCategories: () => { dispatch(categoryActions.fetchCategories()) },
    onSave: (note, operationHasBeenSucceded, notificationOptions) => {
      note.date = Date()

      let promise =  dispatch(noteActions.saveNote(note))

      promise.then((result, err) => {
        ownProps.closeForm()
      })
    }
  })
)(Form)

export default Form;
