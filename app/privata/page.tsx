"use client";

import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Key,
  Lock,
  Cookie,
  Fingerprint,
  Package,
  ArrowRight,
  Users,
  TrendingUp,
  Crown,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Stats {
  products: number;
  users: number;
  totalValue: number;
  avgPrice: number;
  mostExpensive: { Nome: string; Prezzo: number } | null;
  categories: { name: string; value: number }[];
  priceRanges: { name: string; value: number }[];
}

function StatCard({
  icon,
  label,
  value,
  subtext,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      {subtext && (
        <p className="text-xs text-muted-foreground">{subtext}</p>
      )}
    </div>
  );
}

function AuthMethodCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-card-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function PrivataPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const { data: stats } = useSWR<Stats>(
    user ? "/api/stats" : null,
    fetcher,
  );

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Benvenuto, <span className="font-medium text-foreground">{user.username}</span>
            </p>
          </div>
        </div>
        <Link
          href="/prodotti"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105"
        >
          <Package className="h-4 w-4" />
          Gestione Prodotti
        </Link>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Package className="h-5 w-5" />}
            label="Prodotti"
            value={String(stats.products)}
            subtext="Nel catalogo"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Utenti"
            value={String(stats.users)}
            subtext="Registrati"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Valore Totale"
            value={stats.totalValue.toLocaleString("it-IT", {
              style: "currency",
              currency: "EUR",
            })}
            subtext={`Media: ${stats.avgPrice.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}`}
          />
          <StatCard
            icon={<Crown className="h-5 w-5" />}
            label="Top Product"
            value={stats.mostExpensive ? stats.mostExpensive.Prezzo.toLocaleString("it-IT", { style: "currency", currency: "EUR" }) : "-"}
            subtext={stats.mostExpensive?.Nome || "Nessuno"}
          />
        </div>
      )}

      {/* Charts Section */}
      {stats && (
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Category Distribution */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-foreground">Distribuzione Categorie</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.categories}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'currentColor', opacity: 0.7 }}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'currentColor', opacity: 0.7 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Price Distribution */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-foreground">Fasce di Prezzo</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.priceRanges}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.priceRanges.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#f59e0b', '#ef4444'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Auth Info & Methods (Moved down) */}
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Autenticazione Sicura</h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            Questa dashboard utilizza sessioni protette via cookie HTTP-only.
            I dati vengono caricati tramite API route sicure che verificano
            l&apos;identità dell&apos;utente server-side ad ogni richiesta.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Cookie className="h-3 w-3" />
              Cookie Session
            </div>
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              HTTPS Only
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Tech Stack</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Next.js 16 (App Router)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              SQLite + Better-SQLite3
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Recharts Visualization
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Tailwind CSS + Framer Motion
            </li>
          </ul>
        </section>
      </div>

    </div>
  );
}
