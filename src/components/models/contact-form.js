import React from 'react';
import {Form, Field} from 'react-final-form';
import styled from '@emotion/styled';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = value => (value ? undefined : 'Required');

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

export default function ContactForm() {
  return (
    <section>
      <div
        style={{
          paddingTop: '40px',
          paddingBottom: '40px'
        }}
      >
        <Form
          render={({handleSubmit, submitting, pristine}) => (
            <form onSubmit={handleSubmit}>
              <div>
                <FormGroup>
                  <Field name="firstName" validate={required}>
                    {({input, meta}) => (
                      <div>
                        <label>
                          Your name <Req title="This field is required.">*</Req>
                        </label>
                        <Input
                          {...input}
                          type="text"
                          placeholder="First Name"
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
                  <Field name="email" validate={required}>
                    {({input, meta}) => (
                      <div>
                        <label>
                          Your email address{' '}
                          <Req title="This field is required.">*</Req>
                        </label>
                        <Input
                          {...input}
                          type="text"
                          placeholder="Email Address"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field name="subject">
                    {({input, meta}) => (
                      <div>
                        <label>Subject</label>
                        <Input {...input} type="text" placeholder="Subject" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Field name="message" validate={required}>
                    {({input, meta}) => (
                      <div>
                        <label>
                          Message <Req title="This field is required.">*</Req>
                        </label>
                        <div>
                          <Input
                            {...input}
                            type="textarea"
                            placeholder="Write a message..."
                            cols="60"
                            rows="5"
                          />
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
                    disabled={submitting || pristine}
                  >
                    Send message
                  </button>
                </div>
              </div>
            </form>
          )}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}
