export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--pixar-background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <div className="font-display text-2xl font-bold text-pixar-blue">
            BrickGround
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {/* Navigation items */}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">{/* Cart, User menu */}</div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Footer content */}
          <p className="text-center text-sm text-gray-500">
            &copy; 2026 BrickGround. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
