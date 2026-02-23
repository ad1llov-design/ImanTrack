import { redirect } from "next/navigation";

/**
 * Dashboard route removed in MAZI refactor.
 * Redirects to main page.
 */
export default function DashboardPage() {
  redirect("/");
}
