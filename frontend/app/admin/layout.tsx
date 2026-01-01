import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BrickGround Admin',
  description: 'BrickGround 관리자 대시보드',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
          {/* AdminSidebar component will go here */}
          <div className="flex h-16 items-center border-b px-6">
            <span className="text-lg font-semibold">BrickGround Admin</span>
          </div>
          <nav className="p-4">{/* Navigation items */}</nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6">
            {/* AdminHeader component will go here */}
          </header>

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
