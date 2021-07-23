import React from 'react';
import { Form, Field } from 'react-final-form';
import styled from '@emotion/styled';


const required = value => (value ? undefined : 'Required');

const Grid = styled.div`
  display: grid;
  grid-template-columns: 225px 100px;
  padding-top: 20px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    padding-top: 20px;
    max-width: 250px;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
`;

const Checkbox = styled.input`
  display: inline-block;
`;

const Req = styled.span`
  color: red;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  input.error,
  textarea.error,
  select.error {
    border: 1px solid #e74c3c;
  }
`;

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
)

export default function ContactForm(props) {
  return (
    <section>
      <div
        style={{
          paddingTop: '40px',
          paddingBottom: '40px'
        }}
      >
        <Form
          render={({ handleSubmit, submitting, pristine, submitSucceeded }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <FormGroup>
                  <Field name="name" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label>
                          Name <Req title="This field is required.">*</Req>
                        </label>
                        <Input
                          {...input}
                          type="text"
                          placeholder="Your Name"
                          id="edit-name"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field name="phone" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label>
                          Phone <Req title="This field is required.">*</Req>
                        </label>
                        <Input
                          {...input}
                          type="text"
                          placeholder="Your Phone Number"
                          id="edit-phone"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field name="email" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label>
                          Your email address{' '}
                          <Req title="This field is required.">*</Req>
                        </label>
                        <Input
                          {...input}
                          type="text"
                          placeholder="Your Email Address"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <h3>Pledge Options</h3>
                <p>Choose one of these options to make a regular donation to Vision 100</p>
                <FormGroup>
                  <Field name="pledgeType" type="radio" value="5perweek" >
                    {({ input, meta }) => (
                      <div>
                        <label>
                          <input {...input} type="radio" />
                          $5 per week
                        </label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="pledgeType" type="radio" value="10perweek" >
                    {({ input, meta }) => (
                      <div>
                        <label>
                          <input {...input} type="radio" />
                          $10 per week
                        </label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="pledgeType" type="radio" value="20perweek" >
                    {({ input, meta }) => (
                      <div>
                        <label><input {...input} type="radio" />
                          $20 per week</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="pledgeType" type="radio" value="specifyRegular" >
                    {({ input, meta }) => (
                      <>
                        <label><input {...input} type="radio" />
                          Specify my own amount</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </FormGroup>
                <Grid>
                  <Condition when="pledgeType" is="specifyRegular">
                    <Field name="specificRegularAmount" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <label> $ </label>
                          <input
                            {...input}
                            type="number"
                            placeholder=""
                            id="edit-specific-regular"
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="regularDonationFrequency" component="select" defaultValue="weekly">
                      <option value="weekly">Per Week</option>
                      <option value="monthly">Per Month</option>
                    </Field>
                  </Condition>
                </Grid>
                <p><strong>OR</strong> make a one off contribution with one of these options:</p>
                <FormGroup>
                  <Field name="pledgeType" type="radio" value="50once" >
                    {({ input, meta }) => (
                      <div>
                        <label><input {...input} type="radio" />
                          $50</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="pledgeType" type="radio" value="100once" >
                    {({ input, meta }) => (
                      <div>
                        <label><input {...input} type="radio" />
                          $100</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="pledgeType" type="radio" value="200once" >
                    {({ input, meta }) => (
                      <div>
                        <label><input {...input} type="radio" />
                          $200</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="pledgeType" type="radio" value="specifyOnce" >
                    {({ input, meta }) => (
                      <div>
                        <label><input {...input} type="radio" />
                          Specify my own one-off amount</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Condition when="pledgeType" is="specifyOnce">
                    <Field name="specificAmountOnce" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <label> $ </label>
                          <input
                            {...input}
                            type="number"
                            placeholder=""
                            id="edit-specific-one-off"
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </Condition>
                </FormGroup>
                <h3>Monthly Bulletin</h3>
                <FormGroup>
                  <Field name="bulletin" type="checkbox">
                    {({ input, meta }) => (
                      <div>
                        <label><Checkbox
                          {...input}
                          type="checkbox"
                        />
                          &nbsp;
                          I am happy to be added to the Vision 100 Network monthly email bulletin to keep in touch with what is happening within the network
                        </label>
                        <div>

                        </div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <div>
                  <button
                    type="submit"
                    name="submit"
                    disabled={submitting || pristine || submitSucceeded}
                  >
                    Pledge Support
                  </button>
                </div>
              </div>
            </form>
          )}
          onSubmit={(values) => props.onSubmitThing(values)}
        />

      </div>
    </section>
  );
}