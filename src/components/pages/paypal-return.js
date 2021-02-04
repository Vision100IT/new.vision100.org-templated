import React from 'react';
//import styled from '@emotion/styled';
//import { fetchDrupalData } from '../../utils/fetch-functions';
import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';


export default function PaypalReturn({ sid }) {
    return (
        <section>
            <TitleBreadcrumb
                title={'Paypal Payment Received'}
                breadcrumbs={[['Home', '/']]}
            />
            <ContentWrapper width="wide">
            <div className="content">
              <p>Thank you for your payment.</p>
              <p>Click <a href="/">here</a> to return to the home page.</p>
            </div>
            </ContentWrapper>
        </section>
    )
}
