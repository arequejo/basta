import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'normal' | 'letter';
};

/**
 * Pushable button based on Josh W Comeau's 3D MVP button.
 * @see https://www.joshwcomeau.com/animation/3d-button/#our-strategy
 */
export default React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'normal', children, ...props },
  forwardedRef
) {
  const isLetterVariant = variant === 'letter';

  return (
    <button
      ref={forwardedRef}
      className={clsx({
        'group cursor-pointer rounded-lg border-0 bg-blue-800 p-0 outline-offset-4 transition-transform disabled:cursor-not-allowed disabled:opacity-70 pressed:bg-gray-300 current:scale-110 current:bg-green-800 past:bg-blue-300':
          true,
        'disabled:opacity-100': isLetterVariant,
      })}
      {...props}
    >
      <span
        className={clsx({
          'block -translate-y-[6px] rounded-lg bg-blue-600 px-8 py-2 text-lg text-white group-active:-translate-y-[2px]':
            true,
          'px-2 uppercase group-pressed:-translate-y-[2px] group-pressed:bg-gray-100 group-pressed:text-gray-600 group-current:bg-green-600 group-past:-translate-y-[2px] group-past:bg-blue-100 group-past:text-blue-900':
            isLetterVariant,
        })}
      >
        {children}
      </span>
    </button>
  );
});
