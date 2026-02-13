"use client";

import React from "react"
import { motion } from "framer-motion";
import { Server, Zap, FileCode, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";


function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:border-primary/20"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.div>
  );
}

import Image from "next/image";


export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero Section */}
      <section className="mb-24 flex flex-col items-center gap-12 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-1 flex-col gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/20"
          >
            <Zap className="h-4 w-4" />
            Next.js 16 Power
          </motion.div>
          <h1 className="text-balance text-5xl font-extrabold leading-tight text-foreground lg:text-7xl">
            Il framework React per il <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">web moderno</span>
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Un&apos;esperienza di sviluppo completa con rendering ibrido, routing avanzato e una UI in stile Glassmorphism pronta all&apos;uso.
          </p>
          <div className="flex gap-4">
            <Link href="/pubblica?ref=hero" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90">
              Esplora Utenti
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/privata" className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-8 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
              Area Privata
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex items-center justify-center p-8 relative"
        >
          {/* Decorative gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl -z-10 rounded-full" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="mb-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">Caratteristiche principali</h2>
          <p className="mt-4 text-muted-foreground">Tutto il necessario per scalare.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            delay={0.1}
            icon={<Server className="h-5 w-5" />}
            title="Server Components"
            description="Rendering lato server per performance ottimali e SEO nativa."
          />
          <FeatureCard
            delay={0.2}
            icon={<FileCode className="h-5 w-5" />}
            title="App Router"
            description="Routing intuitivo basato su file system con layout nidificati."
          />
          <FeatureCard
            delay={0.3}
            icon={<Zap className="h-5 w-5" />}
            title="Turbopack"
            description="Bundler scritto in Rust, velocissimo per lo sviluppo locale."
          />
          <FeatureCard
            delay={0.4}
            icon={<Globe className="h-5 w-5" />}
            title="API Routes"
            description="Backend serverless integrato direttamente nel tuo client."
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="mb-16 flex flex-col items-center gap-8 lg:flex-row lg:gap-12 rounded-3xl border border-border bg-card/50 p-8 lg:p-12 glass">
        <div className="flex-1 w-full">
          <div className="relative flex h-[300px] w-full items-center justify-center rounded-2xl border border-border bg-muted/30 overflow-hidden">
            <Image
              src="/images/next-js-rendering.png"
              alt="Strategie di Rendering Next.js"
              fill
              className="object-cover opacity-90 transition-opacity hover:opacity-100"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="text-3xl font-bold text-foreground">Flessibilità Totale</h2>
          <p className="leading-relaxed text-muted-foreground">
            Scegli la strategia di rendering migliore per ogni pagina: Statico, Server-Side o Client-Side.
          </p>
          <ul className="grid gap-3">
            {["Static Site Generation (SSG)", "Server-Side Rendering (SSR)", "Incremental Static Regeneration (ISR)"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-4">
          <p>© 2026 Circuitry Inc. All rights reserved.</p>
          <Link href="/docs" className="text-primary hover:underline">
            API Docs
          </Link>
        </div>
      </footer>
    </div >
  );
}
