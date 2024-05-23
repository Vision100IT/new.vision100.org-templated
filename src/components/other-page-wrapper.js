import React from "react";
import { Route, Switch } from "react-router-dom";

import OtherPageContent from "./other-page-content";

import AllSermons from "./pages/all-sermons";
import Sermons from "./pages/sermons";
import SermonPage from "./pages/sermon-page";
import SermonSeriesPage from "./pages/sermon-series-page";
import OurPeople from "./pages/our-people";
import ContactUs from "./pages/contact-us";
import Page from "./pages/api-page";
import Newsletter from "./pages/newsletter-page";
import Calendar from "./pages/calendar-page";
import Pledge from "./pages/pledge";
//import SanityPage from './pages/sanity-page';
import MLCRegistration from "./pages/mlc-registration";
import MTSTrainingDay from "./pages/mts-training-day";
import CombinedMTSTraining from "./pages/combined-mts-training";
import PaypalReturn from "./pages/paypal-return";
import ChurchPlantingConference from "./pages/church-planting-regsitration";
import PreachersWorkshopRegistration from "./pages/preachers-workshop-registration";

export default function OtherPageWrapper({
	globalSermons,
	setGlobalSermons,
	pagesData,
	newslettersData,
	sanityPagesData
}) {
	return pagesData ? (
		<section>
			<Switch>
				<Route
					exact
					path="/AllSermons"
					render={() => <AllSermons globalSermons={globalSermons} setGlobalSermons={setGlobalSermons} />}
				/>
				<Route
					exact
					path="/Sermons"
					render={() => <Sermons globalSermons={globalSermons} setGlobalSermons={setGlobalSermons} />}
				/>
				<Route exact path={["/sermon/:nid", "/sermon/:nid/:title"]} component={SermonPage} />
				<Route path={["/series/:nid", "/series/:nid/:title}"]} component={SermonSeriesPage} />
				<Route exact path="/OurPeople" component={OurPeople} />
				<Route exact path="/Contact" component={ContactUs} />
				<Route exact path="/Pledge" component={Pledge} />
				<Route
					exact
					path="/Newsletter"
					render={(
						{} //eslint-disable-line
					) => <Newsletter newslettersData={newslettersData} />}
				/>
				<Route
					exact
					path="/Calendar"
					render={(
						{} //eslint-disable-line
					) => <Calendar />}
				/>
				<Route path="/mtstraining/register" render={({ match }) => <CombinedMTSTraining />} />
				<Route path="/mtstrainingday/register" render={({ match }) => <MTSTrainingDay />} />
				<Route path="/MLC/register" render={({ match }) => <MLCRegistration />} />
				<Route path="/tcpec/register" render={({ match }) => <ChurchPlantingConference />} />

				<Route path="/handlingtheword/register" render={({ match }) => <PreachersWorkshopRegistration />} />

				{/*Sanity Registration Forms
        <Route
          path="/register/:slug"
          render={({ match }) => (
            <SanityPage
              slug={match.params.slug}
              sanityPagesData={sanityPagesData ? sanityPagesData : undefined}
            />
          )}
        />
*/}
				<Route path="/PaypalReturn/:sid" render={({ match }) => <PaypalReturn sid={match.params.sid} />} />
				<Route
					path="/:slug"
					render={({ match }) => (
						<Page
							slug={match.params.slug}
							pageData={pagesData ? pagesData[match.params.slug.toLowerCase()] : undefined}
						/>
					)}
				/>
				<Route path="/*" component={OtherPageContent} />
			</Switch>
		</section>
	) : (
		""
	);
}
