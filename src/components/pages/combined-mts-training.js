import React from 'react';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import MTSTrainingForm from '../MTSTrainingForm';


export default function CombinedMTSTraining() {
  const title = "Combined MTS Apprentice Training 2022"
  return (
    <section>
      <TitleBreadcrumb title={title} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <MTSTrainingForm />
      </ContentWrapper>
    </section>
  );
}
