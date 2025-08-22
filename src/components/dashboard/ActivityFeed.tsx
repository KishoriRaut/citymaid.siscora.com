import { CheckCircle2, Clock, MessageSquare, UserPlus, FileText, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActivityType = 'application' | 'message' | 'hired' | 'interview' | 'task' | 'system';

type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  time: string;
  read: boolean;
  href?: string;
};

const activityIcons = {
  application: FileText,
  message: MessageSquare,
  hired: CheckCircle2,
  interview: Clock,
  task: CheckCircle2,
  system: Bell,
};

const activityColors = {
  application: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
  message: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
  hired: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
  interview: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
  task: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400',
  system: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
  emptyState?: React.ReactNode;
}

export function ActivityFeed({ activities, className, emptyState }: ActivityFeedProps) {
  if (activities.length === 0) {
    return emptyState ? (
      <div className={cn('p-6 text-center text-muted-foreground', className)}>
        {emptyState}
      </div>
    ) : null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      {activities.map((activity) => {
        const Icon = activityIcons[activity.type] || Bell;
        return (
          <div
            key={activity.id}
            className={cn(
              'relative flex gap-4 p-4 rounded-lg transition-colors',
              'hover:bg-accent/50',
              !activity.read && 'bg-accent/30',
              activity.href && 'cursor-pointer',
            )}
          >
            <div className={cn(
              'flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full',
              activityColors[activity.type] || activityColors.system
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              {activity.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.description}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {activity.time}
              </p>
            </div>
            {!activity.read && (
              <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Helper component for the activity feed header
interface ActivityFeedHeaderProps {
  title: string;
  viewAllHref?: string;
  className?: string;
}

export function ActivityFeedHeader({ title, viewAllHref, className }: ActivityFeedHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {viewAllHref && (
        <a
          href={viewAllHref}
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </a>
      )}
    </div>
  );
}
