import React, { Component } from 'react';
import validator from 'validator';
import { escape } from 'he'
import GenericPaypal from './registrations/paypal'
import { postToWebform } from '../utils/post-to-api.js';

const webformUUID = "67277241-910e-407f-b34b-3c614a5fd7a8"

class PreachersWorkshopForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //registrationsOpen: new Date(this.props.closeDate).getTime() > Date.now(),
      registrationOpen: true,
      name: "",
      email: "",
      phone: "",
      church: "",
      attendedBefore: "",
      registrationType: "",
      participatingFrom: "south",
      formErrorMessage: "",
      formValid: false,
      formSubmitted: false,
      paymentMethod: "paypal",
      totalAmount: 0
    }

    this.resetRegistrationForm = this.resetRegistrationForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetRegistrationForm() {
    this.setState({
      //registrationsOpen: new Date(this.props.closeDate).getTime() > Date.now(),
      registrationOpen: true,
      name: "",
      email: "",
      phone: "",
      church: "",
      attendedBefore: "",
      registrationType: "",
      participatingFrom: "south",
      formErrorMessage: "",
      formValid: false,
      formSubmitted: false,
      paymentMethod: "paypal",
      totalAmount: 0
    })
  }

  handleChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    var change = {};
    change[e.target.name] = value;
    this.setState(change);
  }

  handleSubmit(e) {
    e.preventDefault();
    var errorMessage = "";

    /*Contact Information validation*/
    if (validator.isEmpty(this.state.name)) {
      errorMessage += "Please enter your name.\n";
    }
    if (validator.isEmpty(this.state.email) || !validator.isEmail(this.state.email)) {
      errorMessage += "Please enter a valid email address.\n";
    }
    if (validator.isEmpty(this.state.phone)) {
      errorMessage += "Please enter your phone number.\n";
    }


    if (validator.isEmpty(this.state.church)) {
      errorMessage += "Please specify your church.\n";
    }

    if (validator.isEmpty(this.state.attendedBefore)) {
      errorMessage += "Please specify if you have attended Preachers Workshop before.\n";
    }



    if (validator.isEmpty(this.state.participatingFrom)) {
      errorMessage += "Please specify where you will attend Preacher's Workshop.\n";
    }

    if (errorMessage !== "") {
      this.setState({ formErrorMessage: errorMessage });
      return false;
    }
    else {
      this.setState({ formValid: true });

      /*handle posting to drupal and show success message*/
      var form = new FormData();
      form.append("webform", webformUUID);
      form.append("submission[data][1][values][0]", escape(this.state.name).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][2][values][0]", escape(this.state.email).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][3][values][0]", escape(this.state.phone).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][4][values][0]", escape(this.state.church).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      form.append("submission[data][5][values][0]", escape(this.state.attendedBefore).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][6][values][0]", escape(this.state.registrationType).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][8][values][0]", escape(this.state.participatingFrom).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      form.append("submission[data][7][values][0]", escape(this.state.paymentMethod).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      var totalAmount = this.state.registrationType === 'full' ? 30 : 10;
      this.setState({ totalAmount: totalAmount })
      var that = this;
      postToWebform(form, function (data) {
        that.setState({ submissionID: data.sid })
        that.setState({ formSubmitted: true })
      })
    }

  }

  render() {
    var requiredField = (<span style={{ color: 'red' }} title="This field is required.">*</span>);
    var registrationForm;
    if (!this.state.formValid && this.state.registrationOpen) {
      registrationForm = (
        <section>
          <form onSubmit={this.handleSubmit}>
            <label><strong>Full Name</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="name" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.name} /><br /><br />

            <label><strong>Email</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.email} /><br /><br />

            <label><strong>Phone Number</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="phone" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.phone} /><br /><br />

            <label><strong>Your Church</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.church} /><br /><br />

            <label><strong>Attended Preachers Workshop before?</strong> {requiredField}</label><br /><br />
            <label><input type="radio" name="attendedBefore" value="yes" onChange={this.handleChange.bind(this)} checked={this.state.attendedBefore === "yes"} /> Yes &nbsp;</label><br />
            <label><input type="radio" name="attendedBefore" value="no" onChange={this.handleChange.bind(this)} checked={this.state.attendedBefore === "no"} /> No &nbsp;</label><br />
            <br />

            <label><strong>Which location will you participate from?</strong> {requiredField}</label><br /><br />
            <select name="participatingFrom" value={this.state.participatingFrom} onChange={this.handleChange.bind(this)}>
              <option value="south">South (Christian Reformed Church of Kingston)</option>
              <option value="north">North (via livestream)</option>
            </select><br /><br />

            <label><strong>Registration Cost?</strong> {requiredField}</label><br /><br />
            <label><input type="radio" name="registrationType" value="full" onChange={this.handleChange.bind(this)} checked={this.state.registrationType === "full"} /> $30 (includes copy of Setting Hearts on Fire, by John Chapman. This is essential) &nbsp;</label><br />
            <label><input type="radio" name="registrationType" value="workshopOnly" onChange={this.handleChange.bind(this)} checked={this.state.registrationType === "workshopOnly"} />  $10 if you already have a copy of Setting Hearts on Fire &nbsp;</label><br />
            <br />

            <p><strong>Payment Method</strong></p>
            <select name="paymentMethod" value={this.state.paymentMethod} onChange={this.handleChange.bind(this)}>
              <option value="paypal">Paypal or Credit Card/Debit Card</option>
              <option value="directDeposit">Direct Deposit</option>
              <option value="cheque">Cheque</option>
            </select><br /><br />

            <p><em>Your privacy is important to us. Your information will be kept secure and used only for the purposes of the ministry of the Vision 100 Network. For our privacy policy, contact info@vision100.org</em></p>
            <input type="submit" value="Register" className="btn btn-primary" />

            <br /><br />
            <div id="errorMessage" style={{ whiteSpace: "pre-line", fontWeight: "bold" }}>
              {this.state.formErrorMessage}
            </div>
          </form>
        </section>
      );
    }
    else if (!this.state.formValid && !this.state.registrationsOpen) {
      registrationForm = (
        <section>
          <p>{this.props.eventDates}<br />
            {this.props.eventLocation}</p>
          <h3 style={{ color: "#ef3b24" }}>Registrations for this event have now closed.</h3>
        </section>
      )
    }
    else {
      registrationForm = <div></div>
    }

    var formSubmitted;
    if (this.state.formSubmitted) {
      formSubmitted = (<div>
        {this.state.submissionID && this.state.paymentMethod === "paypal" ? <GenericPaypal sid={this.state.submissionID} totalCost={this.state.totalAmount} eventName="PW" /> :
          <>
            <p>Thank you for registering for Preachers Workshop 2022!</p>

            <p>Below are more details on how you can make your payment</p>
            <br />
            <p><strong>Direct Deposits:</strong><br /><br />

              Please deposit the full amount of ${this.state.totalAmount} into the following bank account:<br /><br />

              Account Name: Vision 100 Network<br />
              BSB: 087 007<br />
              Account No: 548757295<br />
              Reference: PW {this.state.submissionID}<br />
            </p>
            <p>
              <strong>Cheques:</strong><br /><br />

              Please make your cheque payable to 'The Vision 100 Network'<br />
              Post to: The Treasurer, Vision 100 Network<br />
              PO Box 5006, UTAS LPO, Sandy Bay TAS 7005<br />

              <br />
              Having difficulty with payment?<br /><br />

              Email <a href="mailto:eventmanager@vision100.org">eventmanager@vision100.org</a> with any questions you may have.
            </p>

          </>}
      </div >);
    }
    else {
      formSubmitted = "";
    }

    return (
      <section>
        <br />
        <section className="container">
          {formSubmitted}
          {registrationForm}
        </section>
      </section>
    );
  }
}

export default PreachersWorkshopForm;
