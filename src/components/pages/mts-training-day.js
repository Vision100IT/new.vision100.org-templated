import React from 'react';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import MTSTrainingDayForm from '../MTSTrainingDayForm';


export default function MTSTrainingDay() {
  const title = "MTS Training Day March 2022"
  return (
    <section>
      <TitleBreadcrumb title={title} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <MTSTrainingDayForm />
      </ContentWrapper>
    </section>
  );
}
