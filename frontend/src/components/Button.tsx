import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'success' | 'info' | 'error' | 'warning';
  size?: 'md' | 'sm';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, type = 'button', variant = 'info', size = 'md' }) => {
  const variantClasses = {
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-300',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
    error: 'bg-red-600 hover:bg-red-700 focus:ring-red-300',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300',
  };

  const sizeClasses = {
    md: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1 text-xs',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded text-white focus:ring-2 focus:outline-none cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
