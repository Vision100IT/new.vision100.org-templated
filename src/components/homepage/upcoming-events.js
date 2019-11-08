import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UpcomingEvent from '../models/upcoming-event';
import styled from '@emotion/styled';

const Header = styled('h2')`
  color: #ef3b24;
  text-transform: uppercase;
  font-family: Cabin,sans-serif;`;

export default function UpcomingEvents({ upcomingEvents }) {
  return (
    <section>
      <Header>Upcoming Events</Header>
      {upcomingEvents
        ? upcomingEvents.map(event => {
          return (
            <UpcomingEvent
              key={event.title + event.startdate}
              title={event.title}
              startdate={event.startdate}
            />
          );
        })
        : 'Loading, please wait...'}
      <p>
        For a full list of our events,{' '}
        <Link to="/Calendar" title="View full calendar">
          click here
        </Link>
        .
      </p>
    </section>
  );
}

UpcomingEvents.propTypes = {
  upcomingEvents: PropTypes.array.isRequired
};
