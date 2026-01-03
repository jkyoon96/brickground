'use client';

import { useState } from 'react';
import {
  Users,
  UserPlus,
  Download,
  Search,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui';
import {
  AdminLayout,
  StatCard,
  UserRoleBadge,
  UserStatusBadge,
  UserAvatar,
} from '@/components/admin';
import type { UserRole, UserStatus } from '@/components/admin';

// Mock user data
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: '홍길동',
    username: '@honggildong',
    email: 'hong@email.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: '김영희',
    username: '@kimyh',
    email: 'kim@email.com',
    role: 'seller',
    status: 'active',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    name: '이철수',
    username: '@leecs',
    email: 'lee@email.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-12',
  },
  {
    id: '4',
    name: '박지민',
    username: '@parkjm',
    email: 'park@email.com',
    role: 'seller',
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '5',
    name: '최민수',
    username: '@choims',
    email: 'choi@email.com',
    role: 'user',
    status: 'banned',
    createdAt: '2024-01-08',
  },
];

const mockStats = [
  {
    title: '전체 회원',
    value: 12458,
    change: { value: 2.5, type: 'increase' as const, period: 'from last month' },
  },
  {
    title: '활성 회원',
    value: 8234,
    change: { value: 4.1, type: 'increase' as const, period: 'from last month' },
  },
  {
    title: '판매자',
    value: 342,
    description: '+12 new this week',
  },
  {
    title: '정지 회원',
    value: 28,
    change: { value: 3, type: 'decrease' as const, period: 'from last week' },
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  const totalItems = 12458;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Filter users
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      searchQuery === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const isAllSelected = filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length;

  return (
    <AdminLayout
      user={{ name: '관리자', email: 'admin@brickground.com', role: 'Admin' }}
      notificationCount={5}
    >
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">회원 관리</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            회원 추가
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            description={stat.description}
          />
        ))}
      </div>

      {/* Filter Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">모든 상태</option>
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
          <option value="banned">정지</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">모든 등급</option>
          <option value="admin">관리자</option>
          <option value="seller">판매자</option>
          <option value="user">일반 회원</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="createdAt">가입일 순</option>
          <option value="lastActive">최근 활동 순</option>
          <option value="name">이름 순</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="rounded-lg border border-border bg-card">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_1fr_180px_100px_100px_100px_60px] gap-4 border-b border-border bg-muted/50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-primary"
            />
          </div>
          <div>회원정보</div>
          <div>이메일</div>
          <div>등급</div>
          <div>상태</div>
          <div>가입일</div>
          <div></div>
        </div>

        {/* Table Rows */}
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[40px_1fr_180px_100px_100px_100px_60px] items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-muted/30"
          >
            <div>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <UserAvatar name={user.name} avatar={user.avatar} />
              <div>
                <div className="font-semibold text-foreground">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.username}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div>
              <UserRoleBadge role={user.role} />
            </div>
            <div>
              <UserStatusBadge status={user.status} />
            </div>
            <div className="text-sm text-muted-foreground">{user.createdAt}</div>
            <div>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3">
          <p className="text-sm text-muted-foreground">
            Showing 1-{filteredUsers.length} of {totalItems.toLocaleString()} results
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">
              ...
            </span>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {totalPages}
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
