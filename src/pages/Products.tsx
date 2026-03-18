import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter, Package } from "lucide-react";

const products = [
  { id: 1, name: "شاشة سامسونج 55 بوصة", sku: "ELC-001", category: "إلكترونيات", qty: 124, minQty: 20, price: 2450, status: "متوفر" },
  { id: 2, name: "لابتوب ديل XPS 15", sku: "ELC-002", category: "إلكترونيات", qty: 45, minQty: 10, price: 5200, status: "متوفر" },
  { id: 3, name: "طابعة HP LaserJet", sku: "ELC-003", category: "إلكترونيات", qty: 8, minQty: 15, price: 1800, status: "منخفض" },
  { id: 4, name: "كرسي مكتب أرغونومي", sku: "FRN-001", category: "أثاث", qty: 32, minQty: 10, price: 890, status: "متوفر" },
  { id: 5, name: "مكتب خشبي 160سم", sku: "FRN-002", category: "أثاث", qty: 5, minQty: 8, price: 1200, status: "منخفض" },
  { id: 6, name: "ماوس لاسلكي لوجيتك", sku: "ELC-004", category: "إلكترونيات", qty: 230, minQty: 50, price: 120, status: "متوفر" },
  { id: 7, name: "شاحن متعدد المنافذ", sku: "ELC-005", category: "إلكترونيات", qty: 0, minQty: 30, price: 85, status: "نفد" },
];

const Products = () => {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.includes(search) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">المنتجات</h1>
          <p className="text-sm text-muted-foreground mt-1">إدارة وتتبع جميع المنتجات في المخزون</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة منتج
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-surface">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">إجمالي المنتجات</p>
              <p className="text-lg font-semibold tabular-nums">{products.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-surface">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Package className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">منخفض المخزون</p>
              <p className="text-lg font-semibold tabular-nums">{products.filter(p => p.status === "منخفض").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-surface">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Package className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">نفد من المخزون</p>
              <p className="text-lg font-semibold tabular-nums">{products.filter(p => p.status === "نفد").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="بحث بالاسم أو الرمز..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border bg-card pr-9 pl-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          فلتر
        </Button>
      </div>

      {/* Table */}
      <Card className="card-surface">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header-bg">
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المنتج</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الرمز</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الفئة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الكمية</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">السعر</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="py-3.5 px-4 font-medium">{p.name}</td>
                    <td className="py-3.5 px-4 text-muted-foreground font-mono text-xs">{p.sku}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{p.category}</td>
                    <td className="py-3.5 px-4 tabular-nums">{p.qty}</td>
                    <td className="py-3.5 px-4 tabular-nums">{p.price.toLocaleString()} ر.س</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          p.status === "متوفر"
                            ? "bg-success/10 text-success"
                            : p.status === "منخفض"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
