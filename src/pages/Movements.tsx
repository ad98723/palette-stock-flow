import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, ArrowDownUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const movements = [
  { id: 1, product: "شاشة سامسونج 55 بوصة", type: "وارد", qty: 45, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-03-18", time: "09:45" },
  { id: 2, product: "لابتوب ديل XPS 15", type: "صادر", qty: 12, warehouse: "مستودع ب", user: "سارة علي", date: "2026-03-18", time: "09:11" },
  { id: 3, product: "طابعة HP LaserJet", type: "وارد", qty: 30, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-03-18", time: "08:30" },
  { id: 4, product: "كرسي مكتب أرغونومي", type: "صادر", qty: 8, warehouse: "مستودع ج", user: "خالد يوسف", date: "2026-03-17", time: "16:20" },
  { id: 5, product: "ماوس لاسلكي لوجيتك", type: "وارد", qty: 100, warehouse: "مستودع أ", user: "سارة علي", date: "2026-03-17", time: "14:00" },
  { id: 6, product: "شاحن متعدد المنافذ", type: "صادر", qty: 25, warehouse: "مستودع ب", user: "خالد يوسف", date: "2026-03-17", time: "11:30" },
  { id: 7, product: "لوحة مفاتيح ميكانيكية", type: "وارد", qty: 60, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-03-16", time: "10:00" },
  { id: 8, product: "سماعة بلوتوث JBL", type: "صادر", qty: 15, warehouse: "مستودع ج", user: "سارة علي", date: "2026-03-16", time: "09:15" },
];

const Movements = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"الكل" | "وارد" | "صادر">("الكل");

  const filtered = movements.filter((m) => {
    const matchSearch = m.product.includes(search);
    const matchFilter = filter === "الكل" || m.type === filter;
    return matchSearch && matchFilter;
  });

  const totalIn = movements.filter(m => m.type === "وارد").reduce((s, m) => s + m.qty, 0);
  const totalOut = movements.filter(m => m.type === "صادر").reduce((s, m) => s + m.qty, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">حركة المخزون</h1>
          <p className="text-sm text-muted-foreground mt-1">تتبع جميع عمليات الوارد والصادر</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          تسجيل حركة
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-surface">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ArrowDownUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">إجمالي الحركات</p>
              <p className="text-lg font-semibold tabular-nums">{movements.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-surface">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <ArrowUpRight className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">إجمالي الوارد</p>
              <p className="text-lg font-semibold tabular-nums">{totalIn} وحدة</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-surface">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <ArrowDownRight className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">إجمالي الصادر</p>
              <p className="text-lg font-semibold tabular-nums">{totalOut} وحدة</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="بحث بالمنتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border bg-card pr-9 pl-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {(["الكل", "وارد", "صادر"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                filter === f ? "bg-card shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="card-surface">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header-bg">
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المنتج</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">النوع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الكمية</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المستودع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المسؤول</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium">{m.product}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        m.type === "وارد" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                      }`}>
                        {m.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 tabular-nums">{m.qty}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{m.warehouse}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{m.user}</td>
                    <td className="py-3.5 px-4 text-muted-foreground text-xs tabular-nums">{m.date} {m.time}</td>
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

export default Movements;
