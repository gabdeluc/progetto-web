"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Trash2, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageManagementProps {
    productId: number;
}

interface GalleryImage {
    ID: number;
    Ordine: number;
    created_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ImageManagement({ productId }: ImageManagementProps) {
    const { data: images, error, isLoading } = useSWR<GalleryImage[]>(
        `/api/prodotti/${productId}/gallery`,
        fetcher
    );
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("foto", file);

        try {
            const res = await fetch(`/api/prodotti/${productId}/gallery`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Errore durante l'upload");

            toast.success("Immagine caricata con successo");
            mutate(`/api/prodotti/${productId}/gallery`);
        } catch {
            toast.error("Impossibile caricare l'immagine");
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    const handleDelete = async (imageId: number) => {
        if (!confirm("Sei sicuro di voler eliminare questa immagine?")) return;

        setDeleting(imageId);
        try {
            const res = await fetch(`/api/prodotti/gallery/${imageId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Errore durante l'eliminazione");

            toast.success("Immagine eliminata");
            mutate(`/api/prodotti/${productId}/gallery`);
        } catch {
            toast.error("Impossibile eliminare l'immagine");
        } finally {
            setDeleting(null);
        }
    };

    if (error) return <div className="text-destructive">Errore nel caricamento della galleria.</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Galleria Immagini</h3>
                <div className="relative">
                    <input
                        type="file"
                        id="gallery-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="gallery-upload"
                        className={`flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 ${uploading ? "pointer-events-none opacity-50" : ""
                            }`}
                    >
                        {uploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="h-4 w-4" />
                        )}
                        Aggiungi Foto
                    </label>
                </div>
            </div>

            {isLoading ? (
                <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : images?.length === 0 ? (
                <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
                    <ImageIcon className="mb-2 h-8 w-8 opacity-50" />
                    <p>Nessuna immagine nella galleria</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {images?.map((img) => (
                        <div
                            key={img.ID}
                            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                        >
                            <img
                                src={`/api/prodotti/gallery/${img.ID}`}
                                alt="Prodotto"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button
                                onClick={() => handleDelete(img.ID)}
                                disabled={deleting === img.ID}
                                className="absolute right-2 top-2 rounded-full bg-destructive/90 p-1.5 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100 disabled:opacity-50"
                                title="Elimina"
                            >
                                {deleting === img.ID ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
