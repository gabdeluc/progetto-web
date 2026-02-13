"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Package, Star, Zap } from "lucide-react";

const heroCards = [
    {
        icon: <Star className="size-4 text-amber-300" />,
        title: "Novità",
        description: "I prodotti appena arrivati",
        date: "Oggi",
        iconClassName: "text-amber-500",
        titleClassName: "text-amber-500",
        className:
            "[grid-area:stack] hover:-translate-y-10 transition-transform duration-300",
    },
    {
        icon: <Zap className="size-4 text-emerald-300" />,
        title: "Popolari",
        description: "I più venduti della settimana",
        date: "2 giorni fa",
        iconClassName: "text-emerald-500",
        titleClassName: "text-emerald-500",
        className:
            "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 transition-transform duration-300",
    },
    {
        icon: <Package className="size-4 text-blue-300" />,
        title: "Offerte",
        description: "Sconti fino al 50%",
        date: "In corso",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className:
            "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 transition-transform duration-300",
    },
];

export function HeroCards() {
    return (
        <div className="flex min-h-[300px] w-full items-center justify-center py-8">
            <DisplayCards cards={heroCards} />
        </div>
    );
}
