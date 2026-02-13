import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ imageId: string }> }
) {
    // Public access allowed for viewing images
    const { imageId } = await params;
    const id = parseInt(imageId); // imageId is the ID in Product_Images table

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID invalido" }, { status: 400 });
    }

    try {
        const image = db
            .prepare("SELECT Immagine FROM Product_Images WHERE ID = ?")
            .get(id) as { Immagine: Buffer } | undefined;

        if (!image) {
            return NextResponse.json({ error: "Immagine non trovata" }, { status: 404 });
        }

        const headers = new Headers();
        headers.set("Content-Type", "image/jpeg");
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        return new NextResponse(new Uint8Array(image.Immagine), { headers });
    } catch (error) {
        return NextResponse.json(
            { error: "Errore nel recupero dell'immagine" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ imageId: string }> }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const { imageId } = await params;
    const id = parseInt(imageId);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID invalido" }, { status: 400 });
    }

    try {
        const result = db.prepare("DELETE FROM Product_Images WHERE ID = ?").run(id);

        if (result.changes === 0) {
            return NextResponse.json(
                { error: "Immagine non trovata" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Errore nell'eliminazione" },
            { status: 500 }
        );
    }
}
