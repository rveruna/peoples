import React from 'react';
import { func, string, oneOf, element, bool } from 'prop-types';

const Button = ({
  active,
  onClick,
  onMouseUp,
  onMouseDown,
  children,
  color,
  startIcon,
  type,
  variant,
  disabled
}) => {
  const onClickBtn = (e) => {
    if (onClick) onClick(e);
  };

  // adding more click events slows down the default buttons.
  // this ensures they are only added when the button type used for input-fields is used
  // a better solution could be used in future.
  const inputFieldButtonProps =
    variant === 'input-field'
      ? {
        onMouseUp,
        onMouseDown
      }
      : {};

  return (
    <button
      className={`button ${variant !== 'text' ? `button-${color}` : ''}  button-${variant} ${
        disabled ? 'button--disabled' : ''
      } ${active}`}
      type={type}
      onClick={onClickBtn}
      disabled={disabled}
      {...inputFieldButtonProps}
    >
      <span className='button-label'>
        {startIcon && <span className='button-starticon'>{startIcon}</span>}
        {children}
      </span>
    </button>
  );
};

Button.propTypes = {
  active: string,
  children: string.isRequired,
  color: string,
  onClick: func,
  onMouseUp: func,
  onMouseDown: func,
  startIcon: element,
  disabled: bool,
  type: oneOf(['button', 'submit']),
  variant: oneOf(['standard', 'text', 'medium', 'ghost', 'input-field'])
};

Button.defaultProps = {
  color: 'primary',
  disabled: false,
  onClick: () => null,
  startIcon: undefined,
  type: 'button',
  variant: 'standard'
};

export default Button;
