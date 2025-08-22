import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  headerActions?: ReactNode;
  className?: string;
}

export function DashboardLayout({
  children,
  title,
  description,
  headerActions,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      <div className="flex flex-col space-y-2 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {headerActions && <div>{headerActions}</div>}
        </div>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  headerActions?: ReactNode;
}

export function DashboardCard({
  children,
  className,
  title,
  description,
  headerActions,
}: DashboardCardProps) {
  return (
    <div className={cn(
      'bg-card text-card-foreground rounded-xl border shadow-sm',
      'transition-colors hover:shadow-md',
      className
    )}>
      {(title || headerActions) && (
        <div className="flex items-center justify-between p-6 pb-0">
          {title && (
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {headerActions}
        </div>
      )}
      <div className={cn(
        'p-6',
        !title && !headerActions && 'pt-6'
      )}>
        {children}
      </div>
    </div>
  );
}
