"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function DocsPage() {
    return (
        <div className="bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-foreground">API Documentation</h1>
                    <p className="text-muted-foreground">Documentazione tecnica delle API di Circuitry.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm overflow-hidden">
                    <SwaggerUI url="/openapi.json" />
                </div>
            </div>
        </div>
    );
}
