import React from 'react';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import PreachersWorkshopForm from '../PreachersWorkshopForm';


export default function MLCRegistration() {
  const title = "Preachers Workshop Registration 2022"
  return (
    <section>
      <TitleBreadcrumb title={title} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <PreachersWorkshopForm />
      </ContentWrapper>
    </section>
  );
}
