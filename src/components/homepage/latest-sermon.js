import React from 'react';
import AudioPlayer from 'react-responsive-audio-player';
import '../../assets/css/audioplayer.css';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import SVGLogo from '../../assets/img/Logo.svg'

const Img = styled('img')`
  width: 100%;
  height: 100%;
  max-width: 270px;
`;

const AudioPlayerWrapper = styled('div')`
  max-width: 270px;
`

const Header = styled('h2')`
  color: #ef3b24;
  text-transform: uppercase;
  font-family: Cabin,sans-serif;`;

export default function LatestSermon({
  latestSermon: { nid, sermon_img, series_img, node_title, preacher, url }
}) {
  return (
    <section>
      <Header>Past Talk</Header>
      {node_title ? (
        <div>
          <Img src={sermon_img ? sermon_img : series_img ? series_img : SVGLogo} /><br />
          <Link to={`/sermon/${nid}`} dangerouslySetInnerHTML={{ __html: node_title }} />
          <div dangerouslySetInnerHTML={{ __html: preacher }}></div>
          <AudioPlayerWrapper>
            <AudioPlayer
              playlist={[{ url }]}
              controls={['playpause', 'spacer', 'progress']}
            />
          </AudioPlayerWrapper>
          <a href={url}>Download Talk</a>
        </div>
      ) : (
          'loading...'
        )}
    </section>
  );
}