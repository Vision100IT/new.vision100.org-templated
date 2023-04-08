import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import SubmenuBlock from './submenu-block';

const theme = {
  colors: {
    highlight: '#ef3b24'
  }
};

const List = styled('ul')`
  margin: 0;
  list-style: none;
  display: ${props => props.isVisible};
  li {
    padding: 16px 20px;
    font-weight: bold;
    a {
      color: #777;
    }
  }
  text-align: center;
  padding-left: 0;
  @media (min-width: 770px) {
    display: flex;
  }
`;

const Caret = styled('span')`
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  border-top: 4px solid #000;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  margin-left: 6px;
  content: '';
  cursor: pointer;
`;

const Dropdown = styled('li')`
  cursor: pointer;
  div {
    display: none;
  }
  a:hover,
  a:focus-within {
    color: green;
  }
  &:hover div,
  &:focus-within div {
    display: block;
    @media (min-width: 770px) {
      display: grid;
    }
  }
`;

export default function Menu({items, isVisible}) {
  return (
    <ThemeProvider theme={theme}>
      <List isVisible={isVisible ? 'block' : 'none'}>
        {items.map((item, idx) => {
          const {title, submenu, slug, name} = item;

          if (submenu) {
            return (
              <Dropdown key={`menu-${idx}`}>
                 { //eslint-disable-next-line 
                 }<a href="#">
                  {title}
                  <Caret />
                </a>
                <SubmenuBlock key={`submenu-${idx}`} submenu={submenu} />
              </Dropdown>
            );
          }

          return (
            <li key={slug}>
              <Link to={`/${slug}`}>{name}</Link>
            </li>
          );
        })}
      </List>
    </ThemeProvider>
  );
}
