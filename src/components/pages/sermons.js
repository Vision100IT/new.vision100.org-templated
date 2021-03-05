import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchDrupalData } from '../../utils/fetch-functions';
import ContentWrapper from '../content-wrapper';
import { CurrentSeries, LatestSermon, RecentSeries } from './sermon-components';
import TitleBreadcrumb from './title-breadcrumb';

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.columns ? props.columns : '270px 270px'};
  justify-content: ${props =>
    props.justify ? props.justify : 'space-between'};
  gap: ${props => (props.gap ? props.gap : '')};
  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 1em;
  }
`;

const Alt = styled.div`
  background: #6f695f;
  color: #f0f0f0;
  a {
    color: #f0f0f0;
  }
  h2 {
    color: #f0f0f0;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: center;
  column-gap: 100px;
  margin-top: 10px;
  @media (max-width: 560px) {
    column-gap: 50px;
  }
  @media (max-width: 508px) {
    flex-flow: row wrap;
  }
  a:hover, a:focus, a:active{
    color: #fff;
  }
`;

const Button = styled.button`
margin-top: 20px;
min-width: 220px;
border-color: #ef3b24;
color: #ef3b24;
padding: 7px 35px;
background: transparent;
border: 2px solid;
transition: all 0.3s ease-in-out;
font-weight: 400;
text-align: center;
vertical-align: middle;
cursor: pointer;
white-space: nowrap;
:hover{
  background: #ef3b24;
  color: #fff;
}
`

export default function Sermons({ globalSermons, setGlobalSermons }) {
  const [sermons, setSermons] = useState(globalSermons);
  const [recentSeries, setRecentSeries] = useState(null);

  useEffect(() => {
    setSermons(globalSermons);
  }, [globalSermons]);

  useEffect(() => {
    if (!sermons) {
      fetchDrupalData('sermons', {}).then(response => {
        setGlobalSermons(response);
      });
    }

    fetchDrupalData('recent', {}).then(response => {
      setRecentSeries(response);
    });
  }, [sermons, setGlobalSermons]);

  return (
    <section>
      <TitleBreadcrumb
        title="Sermons"
        breadcrumbs={[['Home', '/'], ['Sermons', '']]}
      />
      <ContentWrapper width="wide">
        <p>
          Here you'll find all the latest talks from the Vision 100 Network. Feel free to browse around and check out the
          different talks.
        </p>
        <p>
          If you're after something specific, and can't find it here, then
          please <Link to="/allsermons">click here</Link> and you'll be able to
          search through all of our recorded sermons.
        </p>
        <ButtonsDiv>
          <a href="https://feeds.feedburner.com/Vision100" rel="noreferrer noopener" target="_blank">
            <Button>
              Subscribe to our podcast
            </Button>
          </a>
          <Link to="/allsermons">
            <Button>
              Search all sermons
            </Button>
          </Link>
        </ButtonsDiv>
      </ContentWrapper>

      <Alt>
        <ContentWrapper width="wide">
          <Grid>
            <div>
              <h2>Latest Sermon</h2>
              <LatestSermon latestSermon={sermons ? sermons[0] : ''} />
            </div>
            <div>
              <h2>Current Series</h2>
              <CurrentSeries latestSermon={sermons ? sermons[0] : ''} />
            </div>
          </Grid>
        </ContentWrapper>
      </Alt>
      <ContentWrapper width="wide">
        <h2>Recent Series</h2>
        <RecentSeries recentSeries={recentSeries} />
      </ContentWrapper>
    </section>
  );
}
