/**
 * @layout App Layout
 *
 * Layout for main app pages. No auth required — app works without login.
 */

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-y-auto bg-background text-main pb-20">
      {children}
    </div>
  );
}
