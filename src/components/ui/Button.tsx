import React, { ButtonHTMLAttributes, forwardRef, ReactNode, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  as?: 'button';
  href?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: 'a';
  href: string;
}

interface ButtonAsNextLinkProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: typeof Link;
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsNextLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    as: Tag = 'button',
    href,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none';
    
    const sizeStyles = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 py-2 text-sm',
      lg: 'h-12 px-6 py-3 text-base',
    };

    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
      secondary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm',
      ghost: 'hover:bg-gray-100 text-gray-700',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
    };

    const buttonContent = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    const classNameProp = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    // Handle Link component
    if (Tag === Link) {
      return (
        <Link
          href={href || '#'}
          className={classNameProp}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as any)}
        >
          {buttonContent}
        </Link>
      );
    }

    // Handle anchor tag
    if (Tag === 'a' || href) {
      return (
        <a
          className={classNameProp}
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as any)}
        >
          {buttonContent}
        </a>
      );
    }

    // Default to button
    return (
      <button
        type="button"
        className={classNameProp}
        disabled={isLoading || disabled}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as any)}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
