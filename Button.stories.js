import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { withTests } from '@storybook/addon-jest';

import results from '../../../../../.jest-test-results.json';
import Button from './Button';
import './Button.css';

import SVGIcon from '../../images/SVGIcon';
import ChevronLeft from '../../../../assets/chevron_left.svg';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: ['primary', 'secondary', 'tertiary']
      }
    },
    variant: {
      control: {
        type: 'radio',
        options: ['standard', 'medium', 'ghost', 'text', 'input-field']
      }
    },
    onClick: {
      table: {
        disable: true
      }
    }
  },
  decorators: [withDesign, withTests({ results })]
};

const ButtonTemplate = (args) => <Button {...args} />;

export const Main = ButtonTemplate.bind({});
Main.args = {
  color: 'primary',
  children: 'Button',
  onClick: () => {}
};

Main.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9eNr76u4dtpL4sviH8qjqW/Button'
  }
};

export const Icon = ButtonTemplate.bind({});
Icon.args = {
  color: 'primary',
  children: 'Button',
  startIcon: <SVGIcon svg={ChevronLeft} title='Expand content icon' />
};

export const Medium = ButtonTemplate.bind({});
Medium.args = {
  color: 'secondary',
  children: 'Button',
  variant: 'medium',
  onClick: () => {}
};

export const Text = ButtonTemplate.bind({});
Text.args = {
  color: 'secondary',
  children: 'Button',
  variant: 'text',
  onClick: () => {}
};
