"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuranIndexPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lastPage = localStorage.getItem("quran_last_page") || "1";
    router.replace(`/quran/${lastPage}`);
  }, [router]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return null;
}
