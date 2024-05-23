import React from "react";

import ContentWrapper from "../content-wrapper";
import TitleBreadcrumb from "./title-breadcrumb";
import PreachersWorkshopForm from "../PreachersWorkshopForm";

export default function MLCRegistration() {
	const title = "Handling the WORD Registration 2024";
	return (
		<section>
			<TitleBreadcrumb title={title} breadcrumbs={[["Home", "/"]]} />
			<ContentWrapper width="wide">
				<PreachersWorkshopForm />
			</ContentWrapper>
		</section>
	);
}
