import React, { Component } from 'react';
import validator from 'validator';
import styled from '@emotion/styled'
import { escape } from 'he'

import { postToWebform } from '../utils/post-to-api.js';

const TextArea = styled.textarea`
box-sizing: border-box;
margin: 0;
min-width: 0;
display: block;
width: 50%;
`

const webformUUID = "6e5ad8e4-1bfc-4d22-a695-51d087f0c033"

//const discountCost = 10;
//const regularCost = 15;


class MTSTrainingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //registrationsOpen: new Date(this.props.closeDate).getTime() > Date.now(),
      registrationOpen: true,
      apprenticeName: "",
      apprenticeEmail: "",
      trainerName: "",
      trainerEmail: "",
      churchOrMinistry: "",
      yearOfApprentiship: "",
      plannedAttendance: "",
      additionalAttendanceInfo: "",
      ableToFinanciallyContribute: "",
      formErrorMessage: "",
      formValid: false,
      formSubmitted: false,
      paymentMethod: "directDebit",
      bulletin: false
    }

    this.resetRegistrationForm = this.resetRegistrationForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetRegistrationForm() {
    this.setState({
      //registrationsOpen: new Date(this.props.closeDate).getTime() > Date.now(),
      registrationOpen: true,
      apprenticeName: "",
      apprenticeEmail: "",
      trainerName: "",
      trainerEmail: "",
      churchOrMinistry: "",
      yearOfApprentiship: "",
      plannedAttendance: "",
      additionalAttendanceInfo: "",
      ableToFinanciallyContribute: "",
      formErrorMessage: "",
      formValid: false,
      formSubmitted: false,
      paymentMethod: "directDebit",
      bulletin: false
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
    if (validator.isEmpty(this.state.apprenticeName)) {
      errorMessage += "Please enter the apprentice's name.\n";
    }
    if (validator.isEmpty(this.state.apprenticeEmail) || !validator.isEmail(this.state.apprenticeEmail)) {
      errorMessage += "Please enter a valid email address for the apprentice.\n";
    }

    if (validator.isEmpty(this.state.trainerName)) {
      errorMessage += "Please enter the trainer's name.\n";
    }
    if (validator.isEmpty(this.state.trainerEmail) || !validator.isEmail(this.state.trainerEmail)) {
      errorMessage += "Please enter a valid email address for the trainer.\n";
    }


    if (validator.isEmpty(this.state.churchOrMinistry)) {
      errorMessage += "Please specify the Church or Ministry wher the apprentice is working.\n";
    }

    if (validator.isEmpty(this.state.yearOfApprentiship)) {
      errorMessage += "Please specify the apprenticeship year.\n";
    }

    if (validator.isEmpty(this.state.plannedAttendance)) {
      errorMessage += "Please specify when apprentice plans to attend the combined training.\n";
    }

    if (this.state.plannedAttendance === "other" && validator.isEmpty(this.state.additionalAttendanceInfo)) {
      errorMessage += "Please specify when apprentice plans to attend the combined training.\n";
    }

    if (validator.isEmpty(this.state.ableToFinanciallyContribute)) {
      errorMessage += "Please specify if you a ble to financially contribute towards combined apprentice training.\n";
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
      form.append("submission[data][1][values][0]", escape(this.state.apprenticeName).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][2][values][0]", escape(this.state.apprenticeEmail).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][3][values][0]", escape(this.state.trainerName).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][4][values][0]", escape(this.state.trainerEmail).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      form.append("submission[data][5][values][0]", escape(this.state.churchOrMinistry).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][6][values][0]", escape(this.state.yearOfApprentiship).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      form.append("submission[data][7][values][0]", escape(this.state.plannedAttendance).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      if (this.state.plannedAttendance === "other") {
        form.append("submission[data][8][values][0]", escape(this.state.additionalAttendanceInfo).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));
      }

      form.append("submission[data][9][values][0]", escape(this.state.ableToFinanciallyContribute).replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''));

      if (this.state.bulletin === true) {
        form.append("submission[data][10][values][0]", "yes");
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
            <label><strong>Apprentice Name</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="apprenticeName" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.apprenticeName} /><br /><br />

            <label><strong>Apprentice Email</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="apprenticeEmail" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.apprenticeEmail} /><br /><br />

            <label><strong>Trainer Name</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="trainerName" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.trainerName} /><br /><br />

            <label><strong>Trainer Email</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="trainerEmail" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.trainerEmail} /><br /><br />

            <label><strong>Church / Ministry working at</strong> </label>{requiredField}<br />
            <input className="form-control form-text required" type="text" name="churchOrMinistry" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.churchOrMinistry} /><br /><br />


            <p><strong>Current year of apprenticeship</strong> {requiredField}</p>
            <select name="yearOfApprentiship" value={this.state.yearOfApprentiship} onChange={this.handleChange.bind(this)}>
              <option value="">- Select -</option>
              <option value="first">1st Year</option>
              <option value="second">2nd Year</option>
              <option value="intern">Intern</option>
            </select><br /><br />

            <label><strong>Apprentice plans to come to combined apprentice training</strong> {requiredField}</label><br /><br />
            <label><input type="radio" name="plannedAttendance" value="weekly" onChange={this.handleChange.bind(this)} checked={this.state.plannedAttendance === "weekly"} /> Weekly &nbsp;</label><br />
            <label><input type="radio" name="plannedAttendance" value="fortnightly" onChange={this.handleChange.bind(this)} checked={this.state.plannedAttendance === "fortnightly"} /> Fortnightly &nbsp;</label><br />
            <label><input type="radio" name="plannedAttendance" value="monthly" onChange={this.handleChange.bind(this)} checked={this.state.plannedAttendance === "monthly"} /> Monthly &nbsp;</label><br />
            <label><input type="radio" name="plannedAttendance" value="whenPossible" onChange={this.handleChange.bind(this)} checked={this.state.plannedAttendance === "whenPossible"} /> Whenever Possible &nbsp;</label><br />
            <label><input type="radio" name="plannedAttendance" value="other" onChange={this.handleChange.bind(this)} checked={this.state.plannedAttendance === "other"} /> Other... &nbsp;</label><br />
            <br />

            {this.state.plannedAttendance === "other" ? <><TextArea className="form-control" name="additionalAttendanceInfo" rows="7" onChange={this.handleChange.bind(this)} value={this.state.additionalAttendanceInfo} /><br /></> : ''}

            <label><strong>I am able to financially contribute $195 towards combined apprentice training</strong> {requiredField}</label><br /><br />
            <label><input type="radio" name="ableToFinanciallyContribute" value="yes" onChange={this.handleChange.bind(this)} checked={this.state.ableToFinanciallyContribute === "yes"} /> Yes &nbsp;</label><br />
            <label><input type="radio" name="ableToFinanciallyContribute" value="no" onChange={this.handleChange.bind(this)} checked={this.state.ableToFinanciallyContribute === "no"} /> No &nbsp;</label><br />
            <br />
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
        <p>
          If possible, we do ask the church or ministry that they apprentice is working for to financially contribute $195 towards this service that the Vision 100 Network is offering. This money will go towards the administration work that is involved in setting up the weekly training and keeping it running throughout the year. To pay this please direct debit $195 using the following details:
        </p>

        <p>
          Bank: National Australia Bank<br />
          BSB: 087 007<br />
          Account No: 548757295<br />
          Reference: 'MTS {this.state.apprenticeName}'<br />
        </p>
        <p>
          If you require an invoice for this, please let <a href="mailto:jess@vision100.org">jess@vision100.org</a> know and she can arrange this. <br /><br />

          If you are an MTS Apprentice and would like to join in with these, please email <a href="mailto:jess@vision100.org">jess@vision100.org</a>.
        </p>
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

export default MTSTrainingForm;
