import React, { Component } from 'react';
import validator from 'validator';
import styled from '@emotion/styled'
import { escape } from 'he'

import { postToWebform } from '../utils/post-to-api.js';

import GenericPaypal from './registrations/paypal.js';

const TextArea = styled.textarea`
box-sizing: border-box;
margin: 0;
min-width: 0;
display: block;
width: 50%;
`

const webformUUID = "1376468a-ec67-4873-bca1-d73eb410bbd3"

const discountCost = 35;
const regularCost = 45;


class RegistrationFormGenericPaypal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //registrationsOpen: new Date(this.props.closeDate).getTime() > Date.now(),
      registrationOpen: true,
      fullName: "",
      email: "",
      phone: "",
      whoRegistering: "justme",
      dietaryRequirements: "",
      myChurch: "",
      person1Name: "",
      person1Email: "",
      person1Church: "",
      person2Name: "",
      person2Email: "",
      person2Church: "",
      person3Name: "",
      person3Email: "",
      person3Church: "",
      person4Name: "",
      person4Email: "",
      person4Church: "",
      person5Name: "",
      person5Email: "",
      person5Church: "",
      formErrorMessage: "",
      formValid: false,
      formSubmitted: false,
      paymentMethod: "",
      totalAmount: 0,
      otherRegistrations: 0,
      discountCode: "",
      bulletin: false,
      attendedBefore: "no"

    }

    this.resetRegistrationForm = this.resetRegistrationForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetRegistrationForm() {
    this.setState({
      //registrationsOpen: new Date(this.props.closeDate).getTime() > Date.now(),
      registrationOpen: true,
      fullName: "",
      email: "",
      phone: "",
      whoRegistering: "justme",
      dietaryRequirements: "",
      myChurch: "",
      person1Name: "",
      person1Email: "",
      person1Church: "",
      person2Name: "",
      person2Email: "",
      person2Church: "",
      person3Name: "",
      person3Email: "",
      person3Church: "",
      person4Name: "",
      person4Email: "",
      person4Church: "",
      person5Name: "",
      person5Email: "",
      person5Church: "",
      formErrorMessage: "",
      formValid: false,
      formSubmitted: false,
      paymentMethod: "",
      totalAmount: 0,
      otherRegistrations: 0,
      discountCode: "",
      bulletin: false,
      attendedBefore: "no"
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
    if (validator.isEmpty(this.state.fullName)) {
      errorMessage += "Please enter your name.\n";
    }
    if (validator.isEmpty(this.state.email) || !validator.isEmail(this.state.email)) {
      errorMessage += "Please enter a valid email address.\n";
    }

    //names and emails of person 1 to 5 if applicable
    if (this.state.whoRegistering !== "justme") {
      if (this.state.otherRegistrations > 0) {
        if (validator.isEmpty(this.state.person1Name)) {
          errorMessage += "Please enter a name for Person 1.\n";
        }
        if (validator.isEmpty(this.state.person1Email) || !validator.isEmail(this.state.person1Email)) {
          errorMessage += "Please enter a valid email address for Person 1.\n";
        }
      }
      if (this.state.otherRegistrations > 1) {
        if (validator.isEmpty(this.state.person2Name)) {
          errorMessage += "Please enter a name for Person 2.\n";
        }
        if (validator.isEmpty(this.state.person2Email) || !validator.isEmail(this.state.person2Email)) {
          errorMessage += "Please enter a valid email address for Person 2.\n";
        }
      }
      if (this.state.otherRegistrations > 2) {
        if (validator.isEmpty(this.state.person3Name)) {
          errorMessage += "Please enter a name for Person 3.\n";
        }
        if (validator.isEmpty(this.state.person3Email) || !validator.isEmail(this.state.person3Email)) {
          errorMessage += "Please enter a valid email address for Person 3.\n";
        }
      }
      if (this.state.otherRegistrations > 3) {
        if (validator.isEmpty(this.state.person4Name)) {
          errorMessage += "Please enter a name for Person 4.\n";
        }
        if (validator.isEmpty(this.state.person4Email) || !validator.isEmail(this.state.person4Email)) {
          errorMessage += "Please enter a valid email address for Person 4.\n";
        }
      }
      if (this.state.otherRegistrations > 4) {
        if (validator.isEmpty(this.state.person5Name)) {
          errorMessage += "Please enter a name for Person 5.\n";
        }
        if (validator.isEmpty(this.state.person5Email) || !validator.isEmail(this.state.person5Email)) {
          errorMessage += "Please enter a valid email address for Person 5.\n";
        }
      }
    }
    if (validator.isEmpty(this.state.dietaryRequirements)) {
      errorMessage += "Please specify any dietary requirements.\n";
    }

    //payment method
    if (this.state.paymentMethod === "") {
      errorMessage += "Please select a payment method.\n";
    }


    if (errorMessage !== "") {
      this.setState({ formErrorMessage: errorMessage });
      return false;
    }
    else {
      this.setState({ formValid: true });
      var totalAmount = 0;
      var registrationCost = 0;
      var costPerRegistration = regularCost;
      if (this.state.discountCode && this.state.discountCode.toLowerCase() === "v100 cost") {
        costPerRegistration = discountCost
      }
      switch (this.state.whoRegistering) {//eslint-disable-line
        case "justme":
          registrationCost += costPerRegistration;
          break;
        case "meandothers":
          registrationCost = costPerRegistration + this.state.otherRegistrations * costPerRegistration;
          break;
        case "onlyothers":
          registrationCost = this.state.otherRegistrations * costPerRegistration;
          break;
      }
      totalAmount += registrationCost;
      if (this.state.support) {
        totalAmount += parseInt(this.state.donationAmount);
      }
      this.setState({ totalAmount: totalAmount });
      /*handle posting to drupal and show success message*/
      var form = new FormData();
      form.append("webform", webformUUID);
      form.append("submission[data][1][values][0]", escape(this.state.fullName).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][2][values][0]", escape(this.state.email).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][3][values][0]", escape(this.state.phone).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      //whoRegistering
      form.append("submission[data][4][values][0]", this.state.whoRegistering);
      //otherRegistrations
      form.append("submission[data][7][values][0]", this.state.otherRegistrations);
      //myChurch
      form.append("submission[data][6][values][0]", this.state.myChurch);
      //person1 to 5 name, email and church
      form.append("submission[data][9][values][0]", escape(this.state.person1Name).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][10][values][0]", escape(this.state.person1Email).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][11][values][0]", escape(this.state.person1Church).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      form.append("submission[data][13][values][0]", escape(this.state.person2Name).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][14][values][0]", escape(this.state.person2Email).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][15][values][0]", escape(this.state.person2Church).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      form.append("submission[data][17][values][0]", escape(this.state.person3Name).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][18][values][0]", escape(this.state.person3Email).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][19][values][0]", escape(this.state.person3Church).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      form.append("submission[data][21][values][0]", escape(this.state.person4Name).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][22][values][0]", escape(this.state.person4Email).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][23][values][0]", escape(this.state.person4Church).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      form.append("submission[data][25][values][0]", escape(this.state.person5Name).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][26][values][0]", escape(this.state.person5Email).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][27][values][0]", escape(this.state.person5Church).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      //dietaryreqs 
      form.append("submission[data][28][values][0]", escape(this.state.dietaryRequirements).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      //payment method
      form.append("submission[data][32][values][0]", this.state.paymentMethod);
      //Registration amount
      form.append("submission[data][36][values][0]", registrationCost);
      //discount code
      form.append("submission[data][29][values][0]", escape(this.state.discountCode).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      //support amount
      form.append("submission[data][31][values][0]", this.state.donationAmount);
      //total amount
      form.append("submission[data][33][values][0]", totalAmount);

      //attended MTS before
      form.append("submission[data][35][values][0]", this.state.attendedBefore);

      if (this.state.bulletin === true) {
        form.append("submission[data][34][values][0]", "yes");
      }

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
            <input className="form-control form-text required" type="text" name="fullName" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.fullName} /><br /><br />

            <label><strong>Email Address</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.email} /><br /><br />

            <label><strong>Mobile Number</strong> </label><br />
            <input className="form-control form-text required" type="text" name="phone" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.phone} /><br /><br />

            <label><strong>Who are you registering?</strong></label><br />
            <label><input type="radio" name="whoRegistering" value="justme" onChange={this.handleChange.bind(this)} checked={this.state.whoRegistering === "justme"} /> Just Me &nbsp;</label><br />
            <label><input type="radio" name="whoRegistering" value="meandothers" onChange={this.handleChange.bind(this)} checked={this.state.whoRegistering === "meandothers"} /> Me and some others &nbsp;</label><br />
            <label><input type="radio" name="whoRegistering" value="onlyothers" onChange={this.handleChange.bind(this)} checked={this.state.whoRegistering === "onlyothers"} /> Only Others &nbsp;</label>
            <br />
            <br />
            {this.state.whoRegistering !== "justme" ? <><p><strong>How Many People (not including yourself) are you Registering?</strong></p>
              <select name="otherRegistrations" value={this.state.otherRegistrations} onChange={this.handleChange.bind(this)}>
                <option value="0">- None -</option>
                <option value="1">1 Other (not including me)</option>
                <option value="2">2 Others (not including me)</option>
                <option value="3">3 Others (not including me)</option>
                <option value="4">4 Others (not including me)</option>
                <option value="5">5 Others (not including me)</option>
              </select><br /><br /></> : ''}

            {this.state.whoRegistering === "justme" || this.state.whoRegistering === "meandothers" ? <>
              <fieldset>
                <legend>My Details</legend>
                <label><strong>Church</strong> </label><br />
                <input type="text" name="myChurch" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.myChurch} /><br /><br />
                <label><strong>Attended an MTS Training Day Before?</strong> {requiredField}</label><br /><br />
                <label><input type="radio" name="attendedBefore" value="no" onChange={this.handleChange.bind(this)} checked={this.state.attendedBefore === "no"} /> This is my first time &nbsp;</label><br />
                <label><input type="radio" name="attendedBefore" value="yes" onChange={this.handleChange.bind(this)} checked={this.state.attendedBefore === "yes"} />  I have been to an MTS Training Day before &nbsp;</label><br /><br />

              </fieldset>
              <br />
            </> : ''}

            {this.state.whoRegistering !== "justme" && this.state.otherRegistrations > 0 ? <><fieldset>
              <legend>Person 1 Details</legend>
              <label><strong>Full Name</strong> </label>{requiredField}<br />
              <input type="text" name="person1Name" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person1Name} /><br /><br />
              <label><strong>Email Address</strong> </label>{requiredField}<br />
              <input type="text" name="person1Email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person1Email} /><br /><br />
              <label><strong>Church</strong> </label><br />
              <input type="text" name="person1Church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person1Church} /><br /><br />
            </fieldset>
              <br /></> : ''}
            {this.state.whoRegistering !== "justme" && this.state.otherRegistrations > 1 ? <>
              <fieldset>
                <legend>Person 2 Details</legend>
                <label><strong>Full Name</strong> </label>{requiredField}<br />
                <input type="text" name="person2Name" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person2Name} /><br /><br />
                <label><strong>Email Address</strong> </label>{requiredField}<br />
                <input type="text" name="person2Email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person2Email} /><br /><br />
                <label><strong>Church</strong> </label><br />
                <input type="text" name="person2Church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person2Church} /><br /><br />
              </fieldset>
              <br />
            </> : ''}
            {this.state.whoRegistering !== "justme" && this.state.otherRegistrations > 2 ? <>
              <fieldset>
                <legend>Person 3 Details</legend>
                <label><strong>Full Name</strong> </label>{requiredField}<br />
                <input type="text" name="person3Name" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person3Name} /><br /><br />
                <label><strong>Email</strong> </label>{requiredField}<br />
                <input type="text" name="person3Email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person3Email} /><br /><br />
                <label><strong>Church</strong> </label><br />
                <input type="text" name="person3Church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person3Church} /><br /><br />
              </fieldset>
              <br />
            </> : ''}
            {this.state.whoRegistering !== "justme" && this.state.otherRegistrations > 3 ? <>
              <fieldset>
                <legend>Person 4 Details</legend>
                <label><strong>Full Name</strong> </label>{requiredField}<br />
                <input type="text" name="person4Name" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person4Name} /><br /><br />
                <label><strong>Email</strong> </label>{requiredField}<br />
                <input type="text" name="person4Email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person4Email} /><br /><br />
                <label><strong>Church</strong> </label><br />
                <input type="text" name="person4Church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person4Church} /><br /><br />
              </fieldset>
              <br />
            </> : ''}
            {this.state.whoRegistering !== "justme" && this.state.otherRegistrations > 4 ? <>
              <fieldset>
                <legend>Person 5 Details</legend>
                <label><strong>Full Name</strong> </label>{requiredField}<br />
                <input type="text" name="person5Name" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person5Name} /><br /><br />
                <label><strong>Email</strong> </label>{requiredField}<br />
                <input type="text" name="person5Email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person5Email} /><br /><br />
                <label><strong>Church</strong> </label><br />
                <input type="text" name="person5Church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.person5Church} /><br /><br />
              </fieldset>
              <br />
            </> : ''}

            <br />
            <label><strong>Please specify any dietary requirements here</strong></label><br />

            <TextArea className="form-control" name="dietaryRequirements" rows="7" onChange={this.handleChange.bind(this)} value={this.state.dietaryRequirements} />
            <span style={{ fontSize: "14px" }}>Please write 'None' if you do not have any.</span><br /><br />

            <label><strong>Discount Code</strong> </label><br />
            <input type="text" name="discountCode" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.discountCode} /><br />
            <span style={{ fontSize: "14px" }}>Enter a discount code here if you have one.</span><br /><br />

            <p><strong>Support (Optional)</strong></p>
            <label><input type="checkbox" name="support" value={this.state.support} onChange={this.handleChange.bind(this)} />
                            &nbsp;I would like to pledge to make an extra donation towards raising up leaders and church planting in Tasmania (recommended amount $25)</label><br /><br />

            {this.state.support ? <><label><strong>Donation Amount</strong> </label><br />
            $<input type="number" name="donationAmount" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.donationAmount} /><br /></> : ''}


            <p><strong>Payment Method</strong></p>
            <select name="paymentMethod" value={this.state.paymentMethod} onChange={this.handleChange.bind(this)}>
              <option value="">- Select -</option>
              <option value="paypal">Paypal or Credit Card/Debit Card</option>
              <option value="directDeposit">Direct Deposit</option>
              <option value="cheque">Cheque</option>
            </select><br /><br />
            <p><strong>Monthly Bulletin</strong></p>
            <label><input type="checkbox" name="bulletin" value={this.state.bulletin} onChange={this.handleChange.bind(this)} />
                            &nbsp;I am happy to be added to the Vision 100 Network monthly email bulletin to keep in touch with what is happening within the network</label><br />
            <br /><br />


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
        {this.state.submissionID && this.state.paymentMethod === "paypal" ? <GenericPaypal sid={this.state.submissionID} totalCost={this.state.totalAmount} eventName="MTS" /> :
          <>
            <p>
              Thank you for your registering for the MTS Training Day March 2021.
              You will receive more information about the conference a week before the event.
              </p>

            <p>Below are more details on how you can make your payment</p>
            <br />
            <p><strong>Direct Deposits:</strong><br /><br />

              Please deposit the full amount of ${this.state.totalAmount} into the following bank account:<br /><br />

              Account Name: Vision 100 Network<br />
              BSB: 087 007<br />
              Account No: 548757295<br />
              Reference: MTS {this.state.submissionID}<br />
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

export default RegistrationFormGenericPaypal;
