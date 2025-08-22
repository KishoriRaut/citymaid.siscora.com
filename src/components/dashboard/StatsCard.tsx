import { ArrowDownRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type StatCardProps = {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  href?: string;
  className?: string;
};

export function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  href,
  className,
}: StatCardProps) {
  const content = (
    <div className={cn(
      'flex flex-col h-full p-6 bg-card rounded-xl border',
      'transition-all hover:shadow-md',
      href && 'group hover:border-primary/20',
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <span className={cn(
            'inline-flex items-center text-sm font-medium px-2 py-1 rounded-full',
            changeType === 'increase' && 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            changeType === 'decrease' && 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            changeType === 'neutral' && 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
          )}>
            {changeType === 'increase' && <ArrowUpRight className="h-3.5 w-3.5 mr-1" />}
            {changeType === 'decrease' && <ArrowDownRight className="h-3.5 w-3.5 mr-1" />}
            {changeType === 'neutral' && <TrendingUp className="h-3.5 w-3.5 mr-1" />}
            {change}
          </span>
        )}
      </div>
      <div className="mt-auto">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
