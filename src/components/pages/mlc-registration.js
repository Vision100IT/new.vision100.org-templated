import React, { useEffect, useState } from 'react';
import SanityBlock from '../block-text-serializer';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import MLCRegistrationForm from '../MLCRegistrationForm';


export default function MLCRegistration() {
  const title = "Ministry Leaders Conference 2020 Registration"
  return (
    <section>
      <TitleBreadcrumb title={title} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <MLCRegistrationForm />
      </ContentWrapper>
    </section>
  );
}
