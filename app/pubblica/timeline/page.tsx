"use client";

import React from "react";

import { Timeline } from "@/components/ui/timeline";
import { Clock } from "lucide-react";

const timelineData = [
    {
        title: "2024 - Next.js 15",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Supporto per React 19, miglioramenti al caching e React Server Components sempre più potenti.
                </p>
                <div className="mb-8">
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ React 19 Support
                    </div>
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ Caching Semplicato
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "2023 - Next.js 14",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Server Actions stabili e Partial Prerendering. Il framework diventa sempre più dinamico senza sacrificare le performance.
                </p>
                <div className="mb-8">
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ Server Actions (Stable)
                    </div>
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ Partial Prerendering (Preview)
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "2022 - Next.js 13",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    L'introduzione dell'App Router e dei React Server Components cambia radicalmente il modo di costruire app Next.js.
                </p>
                <div className="mb-8">
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ App Router
                    </div>
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ React Server Components
                    </div>
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ TurboPack
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "2020 - Next.js 10",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Focus sulle performance e l'esperienza utente globale con il componente Image e l'internazionalizzazione.
                </p>
                <div className="mb-8">
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ Componente next/image
                    </div>
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ Internationalization (i18n)
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "2016 - Il Principio",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    Guillermo Rauch annuncia Next.js. Il rendering lato server per React diventa finalmente accessibile a tutti.
                </p>
                <div className="mb-8">
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ Server-Side Rendering (SSR)
                    </div>
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ File-system based routing
                    </div>
                    <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        ✅ Zero configuration
                    </div>
                </div>
            </div>
        ),
    },
];

export default function TimelinePage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                    </div>
                    <h1 className="text-lg md:text-4xl text-foreground font-bold">
                        La storia di Next.js
                    </h1>
                </div>
                <p className="text-muted-foreground text-sm md:text-base max-w-xl">
                    Dal primo rilascio nel 2016 ad oggi: l&apos;evoluzione del framework
                    React più utilizzato al mondo, creato da Vercel.
                </p>
            </div>

            {/* Timeline */}
            <Timeline data={timelineData} />
        </div>
    );
}
