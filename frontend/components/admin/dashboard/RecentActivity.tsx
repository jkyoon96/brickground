'use client';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Activity {
  id: string;
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description?: string;
  timestamp: Date;
  link?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  title?: string;
  maxItems?: number;
  className?: string;
}

export function RecentActivity({
  activities,
  title = '최근 활동',
  maxItems = 5,
  className,
}: RecentActivityProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className={cn('bg-card border border-border rounded-lg', className)}>
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="divide-y divide-border">
        {displayedActivities.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            최근 활동이 없습니다
          </div>
        ) : (
          displayedActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors"
            >
              <div
                className={cn(
                  'p-2 rounded-lg bg-muted',
                  activity.iconColor
                )}
              >
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.title}</p>
                {activity.description && (
                  <p className="text-sm text-muted-foreground truncate">
                    {activity.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(activity.timestamp, {
                    addSuffix: true,
                    locale: ko,
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {activities.length > maxItems && (
        <div className="p-3 border-t border-border text-center">
          <Button variant="link" className="text-sm text-primary hover:underline h-auto p-0">
            모든 활동 보기
          </Button>
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
