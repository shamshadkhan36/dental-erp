import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  hoverEffect = false,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-2xl border border-[#e2ebe8] shadow-[0_3px_14px_rgba(22,58,51,.035)] p-5 transition-all',
          hoverEffect && 'hover:shadow-[0_10px_26px_rgba(22,58,51,.09)] hover:border-[#c8ddd5] hover:-translate-y-0.5',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge(clsx('flex items-center justify-between pb-3 mb-4 border-b border-[#edf2f0]', className))} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={twMerge(clsx('text-base font-semibold text-slate-900', className))} {...props}>
      {children}
    </h3>
  );
}
