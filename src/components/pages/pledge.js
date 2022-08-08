import React, { useReducer, useState } from "react";
import PledgeForm from "../models/pledge-form";
import ContentWrapper from "../content-wrapper";
import TitleBreadcrumb from "./title-breadcrumb";
import PaypalSupport from "../registrations/paypalSupport";
import { postToWebform } from "../../utils/post-to-api";

function reducer(state, action) {
	return { ...state, [action.name]: action.value };
}

const initialState = {
	name: "",
	phone: "",
	email: "",
	pledgeType: "",
	specificAmountRegular: "",
	specificAmountOnce: "",
	regularDonationFrequency: "",
	formErrorMessage: "",
	formValid: false
};
export default function Pledge() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [pledgeAmount, setPledgeAmount] = useState(0);
	const [frequency, setFrequency] = useState(null); //eslint-disable-line
	const [showPaypal, setShowPaypal] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const [submissionId, setSubmissionId] = useState(0);

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const onSubmit = async (values) => {
		console.log("submitting...");
		console.log(values);
		var form = new FormData();
		form.append("webform", "2dfe5b8f-b9af-49b7-8afb-b1bacae7c78d");
		form.append(
			"submission[data][1][values][0]",
			values["name"].replace(
				/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
				""
			)
		);
		form.append(
			"submission[data][2][values][0]",
			values["phone"].replace(
				/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
				""
			)
		);
		form.append(
			"submission[data][3][values][0]",
			values["email"].replace(
				/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
				""
			)
		);
		form.append(
			"submission[data][7][values][0]",
			values["pledgeType"].replace(
				/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
				""
			)
		);

		//eslint-disable-next-line
		switch (values.pledgeType) {
			case "specifyOnce":
				setPledgeAmount(values["specificAmountOnce"]);
				setFrequency("once");
				form.append(
					"submission[data][6][values][0]",
					values["specificAmountOnce"].replace(
						/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
						""
					)
				);
				break;
			case "specifyRegular":
				setPledgeAmount(values["specificRegularAmount"]);
				setFrequency(values["regularDonationFrequency"]);
				form.append(
					"submission[data][4][values][0]",
					values["specificRegularAmount"].replace(
						/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
						""
					)
				);
				form.append(
					"submission[data][5][values][0]",
					values["regularDonationFrequency"].replace(
						/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
						""
					)
				);
				break;
			case "5perweek":
				setPledgeAmount(5);
				setFrequency("weekly");
				form.append("submission[data][4][values][0]", 5);
				form.append("submission[data][5][values][0]", "weekly");

				break;
			case "10perweek":
				setPledgeAmount(10);
				setFrequency("weekly");
				form.append("submission[data][4][values][0]", 10);
				form.append("submission[data][5][values][0]", "weekly");
				break;
			case "20perweek":
				setPledgeAmount(20);
				setFrequency("weekly");
				form.append("submission[data][4][values][0]", 20);
				form.append("submission[data][5][values][0]", "weekly");
				break;
			case "50once":
				setPledgeAmount(50);
				setFrequency("once");
				form.append("submission[data][6][values][0]", 50);
				break;
			case "100once":
				setPledgeAmount(100);
				setFrequency("once");
				form.append("submission[data][6][values][0]", 100);
				break;
			case "200once":
				setPledgeAmount(200);
				setFrequency("once");
				form.append("submission[data][6][values][0]", 200);
				break;
		}
		postToWebform(form, function(data) {
			setSubmissionId(data.sid);
		});

		await sleep(300);
		values.pledgeType.toLowerCase().indexOf("once") !== -1 ? setShowPaypal(true) : setShowPaypal(false);
		setShowForm(false);
		console.log(submissionId);
	};

	return (
		<section>
			<TitleBreadcrumb title="Pledge to Sponsor Us Financially" breadcrumbs={[["Home", "/"]]} />
			<ContentWrapper>
				<p>
					The Vision 100 Network exists to gather and resource a network of churches and church leaders who are
					committed to raising up the next generation of church leaders in order to plant evangelistic, church-planting
					churches. You can support this vision by partering financially with us.
				</p>
				{showForm ? (
					<>
						<PledgeForm dispatch={dispatch} state={state} handleSubmit={onSubmit} onSubmitThing={onSubmit} />
						<p>
							<em>
								Please submit this form and we will contact you soon with payment options. Thank you for your pledge to
								support the Vision 100 Network.
							</em>
						</p>
					</>
				) : (
					<>
						<br />
						<br />
						<p>
							Thank you so much for your financial support of the Vision 100 Network! We really appreciate your
							generosity to us in this way and for helping this really valuable work to continue.{" "}
						</p>

						<p>Please use the information below to set up your pledge:</p>

						<p>
							Vision 100 Network Inc
							<br />
							BSB: 087007
							<br />
							Account number: 548757295
							<br />
						</p>

						{showPaypal ? <PaypalSupport sid={submissionId} pledgeAmount={pledgeAmount} /> : ""}

						<p>
							Thanks again for your support! If you have any questions please contact{" "}
							<a href="mailto:rachael@vision100.org">rachael@vision100.org</a>.
						</p>

						<p>
							In Christ,
							<br />
							Rachael Penny
						</p>
						<br />
						<br />
					</>
				)}
				<p>
					<em>
						Your privacy is important to us. Your information will be kept secure and used only for the purposes of the
						ministry of the Vision 100 Network. For our privacy policy, contact{" "}
						<a href="mailto:info@vision100.org">info@vision100.org</a>
					</em>
				</p>
			</ContentWrapper>
		</section>
	);
}
