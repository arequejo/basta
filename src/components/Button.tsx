import * as React from 'react';
import clsx from 'clsx';

interface NormalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal';
  color?: 'green' | 'orange';
}

interface LetterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'letter';
  color?: never;
}

type ButtonProps = NormalButtonProps | LetterButtonProps;

/**
 * Pushable button based on Josh W Comeau's 3D MVP button.
 * @see https://www.joshwcomeau.com/animation/3d-button/#our-strategy
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'normal', color, children, ...props },
    forwardedRef
  ) {
    const isLetterVariant = variant === 'letter';
    const isGreenColor = color === 'green';
    const isOrangeColor = color === 'orange';

    return (
      <button
        ref={forwardedRef}
        className={clsx({
          'group cursor-pointer rounded-lg border-0 p-0 text-lg text-white outline-offset-4 transition-transform disabled:cursor-not-allowed disabled:opacity-70 pressed:bg-gray-500 current:scale-110 current:bg-green-800 past:bg-blue-400': true,
          'bg-blue-800': isLetterVariant,
          'bg-green-800': isGreenColor,
          'bg-orange-800': isOrangeColor,
          'disabled:opacity-100': isLetterVariant,
        })}
        {...props}
      >
        <span
          className={clsx({
            'flex -translate-y-[6px] items-center justify-center rounded-lg px-8 py-2 group-active:-translate-y-[2px]': true,
            'bg-blue-600': isLetterVariant,
            'bg-green-600': isGreenColor,
            'bg-orange-600': isOrangeColor,
            'aspect-square px-0 py-0 text-3xl uppercase group-pressed:-translate-y-[2px] group-pressed:bg-gray-300 group-pressed:text-gray-600 group-current:bg-green-600 group-past:-translate-y-[2px] group-past:bg-blue-200 group-past:text-blue-600':
              isLetterVariant,
          })}
        >
          {children}
        </span>
      </button>
    );
  }
);
