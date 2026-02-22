import { PageWrapper } from "@shared/components/layout/PageWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageWrapper className="flex-1 flex flex-col">{children}</PageWrapper>;
}
