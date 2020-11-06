import React, { useEffect, useState } from 'react';
import SanityBlock from '../block-text-serializer';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import MTSTrainingForm from '../MTSTrainingForm';


export default function CombinedMTSTraining() {
  const title = "Combined MTS Apprentice Training"
  return (
    <section>
      <TitleBreadcrumb title={title} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <MTSTrainingForm />
      </ContentWrapper>
    </section>
  );
}
