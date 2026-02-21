/**
 * @module features/auth/schemas
 *
 * Zod-схемы валидации для форм авторизации.
 * Используются и на клиенте (react-hook-form), и на сервере (Server Actions).
 */

import { z } from "zod";

/* ── Общие правила ──────────────────────────────────────────────────── */

const emailSchema = z
  .string()
  .min(1, "Email обязателен")
  .email("Некорректный email");

const passwordSchema = z
  .string()
  .min(8, "Минимум 8 символов")
  .max(72, "Максимум 72 символа")
  .regex(/[a-z]/, "Нужна хотя бы одна строчная буква")
  .regex(/[A-Z]/, "Нужна хотя бы одна заглавная буква")
  .regex(/[0-9]/, "Нужна хотя бы одна цифра");

const nameSchema = z
  .string()
  .min(2, "Минимум 2 символа")
  .max(50, "Максимум 50 символов")
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/, "Только буквы, пробелы и дефисы");

/* ── Схема входа ────────────────────────────────────────────────────── */

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Пароль обязателен"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/* ── Схема регистрации ──────────────────────────────────────────────── */

export const registerSchema = z
  .object({
    fullName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/* ── Схема восстановления пароля ────────────────────────────────────── */

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/* ── Схема обновления пароля ────────────────────────────────────────── */

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
