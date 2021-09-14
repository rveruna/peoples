import React, { useState } from 'react';
import { bool, node, string } from 'prop-types';
import ChevronDown from '../../../assets/chevron_down.svg';
import SVGIcon from '../images/SVGIcon';
import Typography from '../Typography/Typography';

const Expansion = ({
  center, children, headerOpen, headerClose, expandUp
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className='expansion'>
      <div
        className='expansion-header'
        onClick={() => setShow(!show)}
        onKeyPress={(e) => e.key === 'Enter' && setShow(!show)}
        role='link'
        style={{ justifyContent: center && 'center', order: expandUp && '2' }}
        tabIndex='0'
      >
        <Typography variant='body'>
          <span>{show ? headerClose : headerOpen}</span>
        </Typography>
        <span
          className='header-icon'
          style={{
            transform: show ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'all 0.35s linear'
          }}
        >
          <SVGIcon svg={ChevronDown} title='Expand content icon' />
        </span>
      </div>
      <div className={`expansion-content ${show ? 'fade-in' : 'fade-out'}`}>
        {children}
      </div>
    </div>
  );
};

export default Expansion;

Expansion.propTypes = {
  center: bool,
  children: node.isRequired,
  headerOpen: string.isRequired,
  headerClose: string.isRequired,
  expandUp: bool
};

Expansion.defaultProps = {
  center: false,
  expandUp: false
};
