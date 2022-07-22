import React from "react";

import ContentWrapper from "../content-wrapper";
import TitleBreadcrumb from "./title-breadcrumb";
import MTSTrainingDayForm, { mtsEventName } from "../MTSTrainingDayForm";

export default function MTSTrainingDay() {
	const title = mtsEventName;
	return (
		<section>
			<TitleBreadcrumb title={title} breadcrumbs={[["Home", "/"]]} />
			<ContentWrapper width="wide">
				<MTSTrainingDayForm />
			</ContentWrapper>
		</section>
	);
}
