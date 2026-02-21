/**
 * @module services/auth
 *
 * Server Actions для авторизации через Supabase Auth.
 * Все функции выполняются ТОЛЬКО на сервере. Валидация через Zod.
 * После успешного действия — revalidate + redirect.
 */

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@lib/supabase/server";
import {
  type ForgotPasswordFormData,
  type LoginFormData,
  type RegisterFormData,
  type ResetPasswordFormData,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@features/auth/schemas/auth.schema";

/* ── Result type ────────────────────────────────────────────────────── */

export interface AuthActionResult {
  success: boolean;
  error?: string;
  message?: string;
}

/* ── Login ──────────────────────────────────────────────────────────── */

export async function loginAction(
  formData: LoginFormData,
): Promise<AuthActionResult> {
  // Валидация на сервере
  const parsed = loginSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Ошибка валидации",
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Маппинг ошибок Supabase на русский
    const errorMessages: Record<string, string> = {
      "Invalid login credentials": "Неверный email или пароль",
      "Email not confirmed": "Email не подтверждён. Проверьте почту.",
      "Too many requests": "Слишком много попыток. Попробуйте позже.",
    };

    return {
      success: false,
      error: errorMessages[error.message] ?? "Ошибка входа. Попробуйте снова.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/* ── Register ──────────────────────────────────────────────────────── */

export async function registerAction(
  formData: RegisterFormData,
): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Ошибка валидации",
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    const errorMessages: Record<string, string> = {
      "User already registered": "Пользователь с таким email уже зарегистрирован",
      "Password should be at least 6 characters": "Пароль должен содержать минимум 6 символов",
      "Signup requires a valid password": "Введите корректный пароль",
    };

    return {
      success: false,
      error: errorMessages[error.message] ?? "Ошибка регистрации. Попробуйте снова.",
    };
  }

  return {
    success: true,
    message: "Регистрация успешна! Проверьте email для подтверждения.",
  };
}

/* ── Logout ─────────────────────────────────────────────────────────── */

export async function logoutAction(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/auth/login");
}

/* ── Forgot Password ────────────────────────────────────────────────── */

export async function forgotPasswordAction(
  formData: ForgotPasswordFormData,
): Promise<AuthActionResult> {
  const parsed = forgotPasswordSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Ошибка валидации",
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    },
  );

  if (error) {
    return {
      success: false,
      error: "Не удалось отправить письмо. Попробуйте позже.",
    };
  }

  return {
    success: true,
    message: "Письмо для сброса пароля отправлено. Проверьте почту.",
  };
}

/* ── Reset Password ─────────────────────────────────────────────────── */

export async function resetPasswordAction(
  formData: ResetPasswordFormData,
): Promise<AuthActionResult> {
  const parsed = resetPasswordSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Ошибка валидации",
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      error: "Не удалось обновить пароль. Попробуйте снова.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/auth/login?message=Пароль+успешно+обновлён");
}
