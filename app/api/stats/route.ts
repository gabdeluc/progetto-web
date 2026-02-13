import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const productCount = db
    .prepare("SELECT COUNT(*) as count FROM Prodotto")
    .get() as { count: number };
  const userCount = db
    .prepare("SELECT COUNT(*) as count FROM users")
    .get() as { count: number };
  const totalValue = db
    .prepare("SELECT COALESCE(SUM(Prezzo), 0) as total FROM Prodotto")
    .get() as { total: number };
  const avgPrice = db
    .prepare("SELECT COALESCE(AVG(Prezzo), 0) as avg FROM Prodotto")
    .get() as { avg: number };
  const mostExpensive = db
    .prepare("SELECT Nome, Prezzo FROM Prodotto ORDER BY Prezzo DESC LIMIT 1")
    .get() as { Nome: string; Prezzo: number } | undefined;

  // Distribuzione Categorie
  const categoriesData = db
    .prepare(`
      SELECT C.Nome as name, COUNT(P.ID) as value
      FROM Prodotto P
      LEFT JOIN Categoria C ON P.Categoria_ID = C.ID
      GROUP BY C.Nome
    `)
    .all() as { name: string; value: number }[];

  const categories = categoriesData.map((c) => ({
    name: c.name || "Nessuna",
    value: c.value,
  }));

  // Distribuzione Prezzi
  const prices = db.prepare("SELECT Prezzo FROM Prodotto").all() as {
    Prezzo: number;
  }[];

  const priceRanges = [
    { name: "0-50€", value: 0 },
    { name: "50-100€", value: 0 },
    { name: "100-300€", value: 0 },
    { name: "300€+", value: 0 },
  ];

  prices.forEach((p) => {
    if (p.Prezzo < 50) priceRanges[0].value++;
    else if (p.Prezzo < 100) priceRanges[1].value++;
    else if (p.Prezzo < 300) priceRanges[2].value++;
    else priceRanges[3].value++;
  });

  return NextResponse.json({
    products: productCount.count,
    users: userCount.count,
    totalValue: totalValue.total,
    avgPrice: avgPrice.avg,
    mostExpensive: mostExpensive || null,
    categories,
    priceRanges,
  });
}
