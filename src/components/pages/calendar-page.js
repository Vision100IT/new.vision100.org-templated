import React from 'react';
import { useHistory } from 'react-router-dom'
import Calendar, { drupalClient } from '@newfrontdoor/calendar';
import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';
import { ThemeProvider } from 'theme-ui';
import theme from '../themes/theme';

const client = drupalClient(
  'https://api.vision100.org/api/views/all_events_api'
);




export default function CalendarPage({ }) {
  let history = useHistory();
  function handleNav(url) {
    if (url.indexOf('http') === 0 || url.indexOf('www.') === 0) {
      //absolutie external urls
      window.location.href = url;
    }
    else {
      //relative internal urls
      history.push(url)
    }

  }
  return (
    <section>
      <TitleBreadcrumb
        title="Calendar"
        breadcrumbs={[['Home', '/'], ['Events', '']]}
      />
      <ContentWrapper width="wide">
        <div>
          <ThemeProvider theme={theme}>
            <Calendar client={client} initialView="month" handleNav={handleNav} />
          </ThemeProvider>

        </div>
      </ContentWrapper>
    </section>
  );
}
