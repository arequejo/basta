import React from 'react';
import clsx from 'clsx';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', ...props }, forwardedRef) => (
  <button
    className={clsx(
      'rounded bg-blue-500 px-8 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-blue-300',
      className
    )}
    {...props}
    ref={forwardedRef}
  />
));

Button.displayName = 'Button';

export default Button;
