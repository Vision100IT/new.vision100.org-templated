import React from 'react';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import MTSTrainingDayForm from '../MTSTrainingDayForm';


export default function MTSTrainingDay() {
  const title = "MTS Training Day September 2021"
  return (
    <section>
      <TitleBreadcrumb title={title} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <MTSTrainingDayForm />
      </ContentWrapper>
    </section>
  );
}
