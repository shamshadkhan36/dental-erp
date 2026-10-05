import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'purple' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#f1f5f2] text-[#52685e] border-[#e2eae5]',
    primary: 'bg-[#eaf5ef] text-[#1b735f] border-[#d3e9dc]',
    secondary: 'bg-[#29453c] text-white border-[#29453c]',
    success: 'bg-[#e9f5ed] text-[#28734f] border-[#d1e8d8]',
    warning: 'bg-[#fbf4e7] text-[#956a28] border-[#f0e2c3]',
    danger: 'bg-[#fbefed] text-[#a14c40] border-[#f0d7d2]',
    purple: 'bg-[#f3eff8] text-[#70578f] border-[#e6ddef]',
    outline: 'bg-transparent text-[#586d64] border-[#d5e1db]'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold'
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1 rounded-full border transition-colors',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
