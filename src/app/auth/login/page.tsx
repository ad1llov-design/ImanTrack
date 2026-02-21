export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-light dark:bg-surface-dark">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Вход в ImanTrack</h1>
        <p className="mt-2 text-sm text-neutral-500">Войдите, чтобы продолжить ваш духовный путь</p>
        {/* Auth form will be implemented in auth feature */}
      </div>
    </div>
  );
}
