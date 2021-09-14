import React from 'react';

import Expansion from './Expansion';
import './Expansion.css';

import Typography from '../Typography/Typography';

export default {
  title: 'Example/Expansion',
  component: Expansion,
  argTypes: {}
};

const ExpansionStory = (args) => (
  <Expansion {...args}>{args.children}</Expansion>
);

export const HeaderAsBody = ExpansionStory.bind({});
HeaderAsBody.args = {
  center: true,
  children: (
    <>
      <Typography variant='body'>
        - Look at your last energy bill. It’ll show you a figure for
        <b> &lsquo;actual annual consumption (in kWh)&rsquo;</b>
        . This will be
        the most accurate.
      </Typography>
      <Typography variant='body'>
        - Your bill might only show an
        <b> &lsquo;estimated annual consumption (in kWh)&rsquo;</b>
        , usually
        because you haven’t provided regular meter readings. This is what your
        energy supplier thinks you’ve used in the last year, so use this.
      </Typography>
    </>
  ),
  headerOpen: 'View more',
  headerClose: 'Show less',
  expandUp: true
};

export const SmallContent = ExpansionStory.bind({});
SmallContent.args = {
  children: <Typography variant='small'>This is small text.</Typography>,
  headerOpen: 'Header is clickable',
  headerClose: 'Header is clickable'
};
