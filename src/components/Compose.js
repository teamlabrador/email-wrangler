import React from 'react';
import { Field, reduxForm } from 'redux-form';

const Compose = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Contributor</label>
        <div>
          <Field
            name="contributor"
            component="input"
            type="text"
            placeholder="Emails(comma seprated)"
          />
        </div>
      </div>
      <div>
        <label>Approver</label>
        <div>
          <Field
            name="approver"
            component="input"
            type="text"
            placeholder="Approver"
          />
        </div>
      </div>
      <div>
        <label>Informed</label>
        <div>
          <Field
            name="informed"
            component="input"
            type="text"
            placeholder="Informed"
          />
        </div>
      </div>
      <div>
        <label>Subject</label>
        <div>
          <Field
            name="subject"
            component="input"
            type="text"
            placeholder="Subject"
          />
        </div>
      </div>
      <div>
        <label>Message</label>
        <div>
          <Field name="message" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
  };

  export default reduxForm({
    // a unique name for the form
    form: 'thread',
  })(Compose)

