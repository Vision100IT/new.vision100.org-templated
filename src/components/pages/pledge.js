import React, { useReducer } from 'react';
import PledgeForm from '../models/pledge-form';
import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';

// Import { postToWebform } from '../../utils/postToAPI';

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

const initialState = {
  name: '',
  phone: '',
  email: '',
  pledgeType: '',
  specificAmountRegular: '',
  specificAmountOnce: '',
  regularDonationFrequency: '',
  formErrorMessage: '',
  formValid: false
};

export default function Pledge() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit() {
    console.log('Submitting...');
  }

  return (
    <section>
      <TitleBreadcrumb title="Pledge to Sponsor Us Financially" breadcrumbs={[['Home', '/']]} />
      <ContentWrapper>
        <p>
          The Vision 100 Network exists to gather and resource a network of churches and church leaders who are committed to raising up the next generation of church leaders in order to plant evangelistic, church-planting churches. You can support this vision by partering financially with us.
        </p>
        <PledgeForm
          dispatch={dispatch}
          state={state}
          handleSubmit={handleSubmit}
        />
        <p><em>Please submit this form and we will contact you soon with payment options. Thank you for your pledge to support the Vision 100 Network.</em></p>
        <p><em>Your privacy is important to us. Your information will be kept secure and used only for the purposes of the ministry of the Vision 100 Network. For our privacy policy, contact <a href="mailto:info@vision100.org">info@vision100.org</a></em></p>
      </ContentWrapper>
    </section>
  );
}
