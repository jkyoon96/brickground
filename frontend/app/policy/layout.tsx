import { Layout } from '@/components/user';

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
