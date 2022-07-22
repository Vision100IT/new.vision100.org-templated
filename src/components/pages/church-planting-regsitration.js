import React from "react";

import ContentWrapper from "../content-wrapper";
import TitleBreadcrumb from "./title-breadcrumb";
import ChurchPlantingForm, { tcpcEventName } from "../ChurchPlantingForm";

export default function ChurchPlantingConference() {
	const title = tcpcEventName;
	return (
		<section>
			<TitleBreadcrumb title={title} breadcrumbs={[["Home", "/"]]} />
			<ContentWrapper width="wide">
				<ChurchPlantingForm />
			</ContentWrapper>
		</section>
	);
}
