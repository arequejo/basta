import React from 'react';
import clsx from 'clsx';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', ...props }, forwardedRef) => (
  <button
    className={clsx(
      'px-8 py-2 bg-blue-500 text-white rounded shadow disabled:cursor-not-allowed disabled:bg-blue-300',
      className
    )}
    {...props}
    ref={forwardedRef}
  />
));

Button.displayName = 'Button';

export default Button;
