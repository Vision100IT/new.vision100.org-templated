import React from 'react';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import ChurchPlantingForm from '../ChurchPlantingForm';


export default function ChurchPlantingConference() {
  const title = "Church Planting Conference October 2021"
  return (
    <section>
      <TitleBreadcrumb title={title} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <ChurchPlantingForm />
      </ContentWrapper>
    </section>
  );
}
