import React from 'react';
import { Button } from './button';

const AccessibleButton = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '',
  ariaLabel,
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const getContrastColors = (variant) => {
    switch (variant) {
      case 'default':
        return 'bg-primary-700 hover:bg-primary-800 text-white border-primary-700';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-200';
      case 'outline':
        return 'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white';
      case 'ghost':
        return 'text-primary-700 hover:bg-primary-100 hover:text-primary-800';
      case 'link':
        return 'text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline';
      default:
        return 'bg-primary-700 hover:bg-primary-800 text-white border-primary-700';
    }
  };

  const contrastClass = getContrastColors(variant);

  return (
    <Button
      className={`${contrastClass} ${className} focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200`}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AccessibleButton;