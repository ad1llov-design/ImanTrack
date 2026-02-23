/**
 * @page /design-system
 *
 * ���������������� �������� ���� UI �����������.
 * ����������� ��� �������� ��� ���������� �������� ������-�������.
 */

"use client";

import { useState } from "react";

import { Badge } from "@shared/components/ui/Badge";
import { Button } from "@shared/components/ui/Button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/components/ui/Card";
import { Container } from "@shared/components/ui/Container";
import { Counter } from "@shared/components/ui/Counter";
import { Footer } from "@shared/components/ui/Footer";
import { Input } from "@shared/components/ui/Input";
import { Navbar } from "@shared/components/ui/Navbar";
import { ProgressBar } from "@shared/components/ui/ProgressBar";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonPrayerRow,
  SkeletonText,
} from "@shared/components/ui/Skeleton";
import { ThemeToggle } from "@shared/components/ui/ThemeToggle";

/* ?? Section wrapper ?????????????????????????????????????????????????? */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-20" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="mb-6">
        <h2 className="text-h2 text-neutral-900 dark:text-neutral-50">{title}</h2>
        <p className="mt-1 text-body-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
      {children}
      <div className="divider-islamic mt-12">
        <span>?</span>
      </div>
    </section>
  );
}

/* ?? Page ?????????????????????????????????????????????????????????????? */

export default function DesignSystemPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Navbar
        rightSlot={<ThemeToggle />}
      />

      <main className="min-h-screen bg-background text-main pt-20">
        {/* ?? Hero ??????????????????????????????? */}
        <div className="bg-gradient-primary py-20">
          <Container>
            <p className="font-arabic text-3xl text-gold-300">??? ???? ?????? ??????</p>
            <h1 className="mt-4 text-display text-white">
              MAZI <span className="text-gold-300">Design System</span>
            </h1>
            <p className="mt-3 max-w-2xl text-body text-primary-200">
              ������ ������-������� � ��������� ������. Ҹ���-������ �������, ������� �������,
              ��������� �����������, �������� � ������ �����������.
            </p>
          </Container>
        </div>

        <Container paddingY="lg">
          <div className="space-y-16">

            {/* ?????????????????????????????????????????????????????????? */}
            {/* COLOR PALETTE */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="�������� �������"
              description="��������: ����-������ (���� ������) � ������: ���������� � Ҹ���� �����������"
            >
              {/* Primary */}
              <div className="mb-6">
                <h3 className="mb-3 text-h4 text-neutral-700 dark:text-neutral-300">Primary (������)</h3>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className={`h-14 w-14 rounded-xl bg-primary-${shade} shadow-soft transition-transform hover:scale-110`}
                      />
                      <span className="mt-1 block text-caption text-neutral-500">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gold */}
              <div className="mb-6">
                <h3 className="mb-3 text-h4 text-neutral-700 dark:text-neutral-300">Gold (�������)</h3>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className={`h-14 w-14 rounded-xl bg-gold-${shade} shadow-soft transition-transform hover:scale-110`}
                      />
                      <span className="mt-1 block text-caption text-neutral-500">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semantic */}
              <div>
                <h3 className="mb-3 text-h4 text-neutral-700 dark:text-neutral-300">�������������</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-success-light px-4 py-2 dark:bg-success-dark">
                    <span className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-body-sm font-medium">Success</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-warning-light px-4 py-2 dark:bg-warning-dark">
                    <span className="h-3 w-3 rounded-full bg-warning" />
                    <span className="text-body-sm font-medium">Warning</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-danger-light px-4 py-2 dark:bg-danger-dark">
                    <span className="h-3 w-3 rounded-full bg-danger" />
                    <span className="text-body-sm font-medium">Danger</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-info-light px-4 py-2 dark:bg-info-dark">
                    <span className="h-3 w-3 rounded-full bg-info" />
                    <span className="text-body-sm font-medium">Info</span>
                  </div>
                </div>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* TYPOGRAPHY */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="�����������"
              description="Mobile-first �������. Inter ��� ��������, Amiri ��� ���������."
            >
              <div className="space-y-4">
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Display (3rem)</span>
                  <p className="text-display text-neutral-900 dark:text-neutral-50">?????? ????? � ��� ���</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Display SM (2.25rem)</span>
                  <p className="text-display-sm text-neutral-900 dark:text-neutral-50">�������� ����</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">H1 (1.875rem)</span>
                  <h1>������ �������</h1>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">H2 (1.5rem)</span>
                  <h2>����������� ��������</h2>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">H3 (1.25rem)</span>
                  <h3>��������</h3>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Body (1rem)</span>
                  <p>�������� ����� ��� �������� � ��������. ������ � ��������.</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Body SM (0.875rem)</span>
                  <p className="text-body-sm text-neutral-600 dark:text-neutral-400">������ ����� ��� �������� � ��������������� ����������.</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Overline (0.6875rem)</span>
                  <p className="text-overline uppercase tracking-wider text-neutral-500">��������� � �������</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Arabic (Amiri)</span>
                  <p className="font-arabic text-2xl text-gold-600 dark:text-gold-400">??? ???? ?????? ??????</p>
                </div>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* BUTTONS */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="������"
              description="5 ��������� ? 5 �������� + ��������, ������, fullWidth"
            >
              {/* Variants */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">��������</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="gold">Gold</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">�������</h3>
                <div className="flex flex-wrap items-end gap-3">
                  <Button size="xs">XS</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">X-Large</Button>
                </div>
              </div>

              {/* States */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">���������</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 2000);
                    }}
                  >
                    ����� ��� ��������
                  </Button>
                  <Button isLoading>��������...</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>

              {/* Icons */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">� ��������</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button leftIcon={<span>??</span>}>�����</Button>
                  <Button variant="gold" leftIcon={<span>??</span>}>�����</Button>
                  <Button variant="secondary" rightIcon={<span>?</span>}>�����</Button>
                </div>
              </div>

              {/* Full width */}
              <div>
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">������ ������</h3>
                <div className="max-w-md space-y-3">
                  <Button fullWidth>������ ����</Button>
                  <Button variant="secondary" fullWidth>�����</Button>
                </div>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* CARDS */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="��������"
              description="4 ��������: default, outlined, elevated, glass. ������������ hover-������."
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card variant="default" interactive>
                  <CardHeader>
                    <CardTitle>Default</CardTitle>
                  </CardHeader>
                  <CardDescription>����������� �������� � ����� � ��������.</CardDescription>
                  <CardFooter>
                    <Button size="sm">���������</Button>
                  </CardFooter>
                </Card>

                <Card variant="outlined" interactive>
                  <CardHeader>
                    <CardTitle>Outlined</CardTitle>
                  </CardHeader>
                  <CardDescription>������ ������, ��� ������� � ����.</CardDescription>
                  <CardFooter>
                    <Button size="sm" variant="secondary">�������</Button>
                  </CardFooter>
                </Card>

                <Card variant="elevated" interactive>
                  <CardHeader>
                    <CardTitle>Elevated</CardTitle>
                  </CardHeader>
                  <CardDescription>��������� ���� ��� ���������.</CardDescription>
                  <CardFooter>
                    <Button size="sm" variant="gold">�������</Button>
                  </CardFooter>
                </Card>

                <Card variant="glass" interactive padding="md">
                  <CardHeader>
                    <CardTitle>Glass</CardTitle>
                  </CardHeader>
                  <CardDescription>Glassmorphism ��� ��������.</CardDescription>
                  <CardFooter>
                    <Button size="sm" variant="ghost">�������</Button>
                  </CardFooter>
                </Card>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* INPUTS */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="���� �����"
              description="� label, ����������, �������, ��������. ������������� �����."
            >
              <div className="grid max-w-lg gap-5">
                <Input label="���" placeholder="������� ���� ���" hint="��� � ��� ����������" />
                <Input label="Email" type="email" placeholder="your@email.com" leftIcon={<span>?</span>} />
                <Input label="������" type="password" placeholder="��������" error="������� 8 ��������" />
                <Input placeholder="��� label" />
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* BADGES */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="������"
              description="�������, ���� � ���������. 6 ������ ? 3 ������� + ����� � ������."
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">��������</Badge>
                  <Badge variant="warning">� ��������</Badge>
                  <Badge variant="danger">��������</Badge>
                  <Badge variant="info">����������</Badge>
                  <Badge variant="gold">�������</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>������</Badge>
                  <Badge variant="warning" dot>�������</Badge>
                  <Badge variant="danger" dot>������</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm">SM</Badge>
                  <Badge size="md">MD</Badge>
                  <Badge size="lg">LG</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" icon={<span>??</span>}>������</Badge>
                  <Badge variant="warning" icon={<span>??</span>}>�����</Badge>
                  <Badge variant="info" icon={<span>??</span>}>����</Badge>
                </div>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* PROGRESS BARS */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="��������-���"
              description="�������� ��� scroll, 4 �������� �����, shimmer �� LG."
            >
              <div className="max-w-lg space-y-6">
                <ProgressBar value={80} label="������ �� �������" showValue variant="primary" size="md" />
                <ProgressBar value={45} label="������ ������" showValue variant="gold" size="md" />
                <ProgressBar value={20} label="���� �� ����������" showValue variant="danger" size="md" />
                <ProgressBar value={95} label="����� ��������" showValue variant="gradient" size="lg" />
                <div className="mt-4">
                  <p className="mb-2 text-body-sm text-neutral-500">�������:</p>
                  <div className="space-y-3">
                    <ProgressBar value={60} size="sm" />
                    <ProgressBar value={60} size="md" />
                    <ProgressBar value={60} size="lg" />
                  </div>
                </div>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* COUNTERS */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="��������"
              description="������������� ������� �� 0. ����������� ��� scroll. easeOutExpo."
            >
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <Card variant="default" padding="lg">
                  <Counter
                    value={1247}
                    label="�������"
                    arabicLabel="?????"
                    color="primary"
                    size="lg"
                  />
                </Card>
                <Card variant="default" padding="lg">
                  <Counter
                    value={42}
                    label="���� ������"
                    arabicLabel="????"
                    suffix=" ��"
                    color="gold"
                    size="lg"
                  />
                </Card>
                <Card variant="default" padding="lg">
                  <Counter
                    value={89}
                    label="��������"
                    suffix="%"
                    color="primary"
                    size="lg"
                  />
                </Card>
                <Card variant="default" padding="lg">
                  <Counter
                    value={7}
                    label="��������"
                    arabicLabel="?????"
                    color="neutral"
                    size="lg"
                  />
                </Card>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* SKELETON LOADERS */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="���������"
              description="�������� ��� ��������: ��������, �����, ������, ������ ������."
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card Skeleton */}
                <div>
                  <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonCard</p>
                  <SkeletonCard />
                </div>

                {/* Text + Avatar */}
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonText (4 lines)</p>
                    <SkeletonText lines={4} />
                  </div>
                  <div>
                    <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonAvatar</p>
                    <div className="flex gap-3">
                      <SkeletonAvatar size={32} />
                      <SkeletonAvatar size={40} />
                      <SkeletonAvatar size={48} />
                      <SkeletonAvatar size={56} />
                    </div>
                  </div>
                </div>

                {/* Prayer rows */}
                <div>
                  <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonPrayerRow</p>
                  <div className="space-y-3">
                    <SkeletonPrayerRow />
                    <SkeletonPrayerRow />
                    <SkeletonPrayerRow />
                  </div>
                </div>
              </div>

              {/* Raw shapes */}
              <div className="mt-8">
                <p className="mb-3 text-body-sm font-medium text-neutral-500">������� �����</p>
                <div className="flex flex-wrap gap-4">
                  <Skeleton variant="rectangular" width={120} height={80} />
                  <Skeleton variant="circular" width={60} height={60} />
                  <Skeleton variant="text" width={200} height={16} />
                </div>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* THEME TOGGLE */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="����"
              description="������������ light/dark � ��������� ������. ����������� � localStorage."
            >
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <span className="text-body-sm text-neutral-500">? ������� ��� ������������</span>
              </div>
            </Section>

            {/* ?????????????????????????????????????????????????????????? */}
            {/* CONTAINER */}
            {/* ?????????????????????????????????????????????????????????? */}
            <Section
              title="Container"
              description="3 �������: narrow (max-w-3xl), default (max-w-7xl), wide (max-w-8xl)."
            >
              <div className="space-y-4">
                <Container size="narrow" className="rounded-xl border-2 border-dashed border-primary-300 p-4 dark:border-primary-700">
                  <p className="text-center text-body-sm text-primary-600">Narrow (max-w-3xl)</p>
                </Container>
                <div className="rounded-xl border-2 border-dashed border-gold-300 p-4 dark:border-gold-700">
                  <p className="text-center text-body-sm text-gold-600">Default (max-w-7xl) � �������</p>
                </div>
              </div>
            </Section>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
