import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  // name: string;/
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline' | 'rounded' | 'bottomBorder';
  dimension?: 'small' | 'medium' | 'big';
}
const classes = {
  root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-customBlue1',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-customBlue1',
  outline: 'border border-border-base focus:border-customBlue1',
  rounded: 'border border-border-base focus:border-customBlue1 rounded-xl',
  shadow: 'focus:shadow',
  bottomBorder: 'rounded-none border-b-2  focus:border-customBlue1',
};
// const sizeClasses = {
//   small: "text-sm h-10",
//   medium: "h-12",
//   big: "h-14",
// };

const Input = (
  {
    className,
    label,
    note,
    name,
    error,
    variant = 'normal',
    // dimension = "medium",
    shadow = false,
    type = 'text',
    inputClassName,
    ...rest
  }: Props,
  ref: any
) => {
  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outline]: variant === 'outline',
      [classes.rounded]: variant === 'rounded',
      [classes.bottomBorder]: variant === 'bottomBorder',
    },
    {
      [classes.shadow]: shadow,
    },
    // sizeClasses[dimension],
    inputClassName
  );

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-body-dark font-semibold text-sm leading-none mb-3"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-invalid={error ? 'true' : 'false'}
        {...rest}
      />
      {note && <p className="mt-2 text-xs text-body">{note}</p>}
      {error && <p className="my-2 text-xs text-start text-red-500">{error}</p>}
    </div>
  );
};

export default React.forwardRef(Input);
