export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--pixar-background)]">
      {/* Main Content */}
      <main>{children}</main>
  
    </div>
  );
}
