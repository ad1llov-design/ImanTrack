import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        404
      </h2>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        Страница не найдена. Возможно, она была удалена или вы ввели неверный адрес.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
