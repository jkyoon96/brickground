'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Store,
  Blocks,
  Grid3X3,
  Sparkles,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Ticket,
  ImageIcon,
  Settings,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface MenuItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  children?: MenuItem[];
  badge?: string | number;
}

const menuItems: MenuItem[] = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/analytics', label: '분석', icon: BarChart3 },
  {
    label: '사용자 관리',
    icon: Users,
    children: [
      { href: '/admin/users', label: '회원 목록', icon: Users },
      { href: '/admin/sellers', label: '판매자 관리', icon: Store },
    ],
  },
  {
    label: '상품 관리',
    icon: Package,
    children: [
      { href: '/admin/products', label: '상품 목록', icon: Package },
      { href: '/admin/categories', label: '카테고리', icon: Package },
      { href: '/admin/inventory', label: '재고 관리', icon: Package },
    ],
  },
  { href: '/admin/orders', label: '주문 관리', icon: ShoppingCart },
  {
    label: '콘텐츠 관리',
    icon: Sparkles,
    children: [
      { href: '/admin/vrmall', label: 'VR Mall', icon: Store },
      { href: '/admin/brickart', label: '브릭아트', icon: Blocks },
      { href: '/admin/dotart', label: '도트아트', icon: Grid3X3 },
      { href: '/admin/creations', label: '창작물', icon: Sparkles },
      { href: '/admin/manuals', label: '매뉴얼', icon: BookOpen },
    ],
  },
  {
    label: '고객 지원',
    icon: HelpCircle,
    children: [
      { href: '/admin/inquiries', label: '1:1 문의', icon: MessageSquare, badge: 5 },
      { href: '/admin/qna', label: 'Q&A', icon: HelpCircle },
      { href: '/admin/reviews', label: '리뷰 관리', icon: MessageSquare },
    ],
  },
  {
    label: '마케팅',
    icon: Ticket,
    children: [
      { href: '/admin/coupons', label: '쿠폰 관리', icon: Ticket },
      { href: '/admin/banners', label: '배너 관리', icon: ImageIcon },
      { href: '/admin/notifications', label: '알림 발송', icon: Bell },
    ],
  },
  { href: '/admin/settings', label: '설정', icon: Settings },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({ collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = item.href ? isActive(item.href) : false;

    return (
      <div key={item.label}>
        {item.href ? (
          <Link
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              depth > 0 && 'pl-10',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ) : (
          <Button
            variant="ghost"
            onClick={() => toggleExpand(item.label)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors h-auto',
              'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </>
            )}
          </Button>
        )}

        {/* Children */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Blocks className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold">BrickGround</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
