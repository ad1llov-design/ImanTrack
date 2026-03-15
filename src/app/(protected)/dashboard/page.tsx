import { redirect } from "next/navigation";

/**
 * Dashboard route removed in SIRAT refactor.
 * Redirects to main page.
 */
export default function DashboardPage() {
  redirect("/");
}
