import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, ArrowDownUp, ArrowUpRight, ArrowDownRight, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";

interface Movement {
  id: number;
  product: string;
  type: "وارد" | "صادر";
  qty: number;
  warehouse: string;
  user: string;
  date: string;
  time: string;
  notes: string;
}

const users = ["أحمد محمد", "سارة علي", "خالد يوسف", "نورة أحمد", "فهد سعود"];
const warehouses = ["مستودع أ", "مستودع ب", "مستودع ج"];
const productNames = [
  "شاشة سامسونج 55 بوصة", "لابتوب ديل XPS 15", "طابعة HP LaserJet", "كرسي مكتب أرغونومي",
  "مكتب خشبي 160سم", "ماوس لاسلكي لوجيتك", "شاحن متعدد المنافذ", "لوحة مفاتيح ميكانيكية",
  "سماعة بلوتوث JBL", "كابل HDMI 3 متر", "أرز بسمتي 10 كجم", "زيت زيتون 2 لتر",
  "قميص رجالي قطن", "أقلام حبر جاف", "مثقاب كهربائي بوش", "كمامات طبية",
];

const initialMovements: Movement[] = [
  { id: 1, product: "شاشة سامسونج 55 بوصة", type: "وارد", qty: 45, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-04-08", time: "09:45", notes: "شحنة من الموزع" },
  { id: 2, product: "لابتوب ديل XPS 15", type: "صادر", qty: 12, warehouse: "مستودع ب", user: "سارة علي", date: "2026-04-08", time: "09:11", notes: "طلب عميل #1245" },
  { id: 3, product: "طابعة HP LaserJet", type: "وارد", qty: 30, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-04-08", time: "08:30", notes: "" },
  { id: 4, product: "كرسي مكتب أرغونومي", type: "صادر", qty: 8, warehouse: "مستودع ج", user: "خالد يوسف", date: "2026-04-07", time: "16:20", notes: "تجهيز مكتب" },
  { id: 5, product: "ماوس لاسلكي لوجيتك", type: "وارد", qty: 100, warehouse: "مستودع أ", user: "سارة علي", date: "2026-04-07", time: "14:00", notes: "" },
  { id: 6, product: "شاحن متعدد المنافذ", type: "صادر", qty: 25, warehouse: "مستودع ب", user: "خالد يوسف", date: "2026-04-07", time: "11:30", notes: "بيع بالجملة" },
  { id: 7, product: "لوحة مفاتيح ميكانيكية", type: "وارد", qty: 60, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-04-06", time: "10:00", notes: "شحنة جديدة" },
  { id: 8, product: "سماعة بلوتوث JBL", type: "صادر", qty: 15, warehouse: "مستودع ج", user: "سارة علي", date: "2026-04-06", time: "09:15", notes: "" },
  { id: 9, product: "كابل HDMI 3 متر", type: "وارد", qty: 200, warehouse: "مستودع أ", user: "نورة أحمد", date: "2026-04-05", time: "14:30", notes: "مورد جديد" },
  { id: 10, product: "أرز بسمتي 10 كجم", type: "وارد", qty: 80, warehouse: "مستودع ج", user: "فهد سعود", date: "2026-04-05", time: "11:00", notes: "" },
  { id: 11, product: "زيت زيتون 2 لتر", type: "صادر", qty: 40, warehouse: "مستودع ج", user: "نورة أحمد", date: "2026-04-05", time: "09:20", notes: "توزيع فروع" },
  { id: 12, product: "قميص رجالي قطن", type: "صادر", qty: 30, warehouse: "مستودع ب", user: "خالد يوسف", date: "2026-04-04", time: "16:45", notes: "" },
  { id: 13, product: "أقلام حبر جاف", type: "وارد", qty: 300, warehouse: "مستودع أ", user: "سارة علي", date: "2026-04-04", time: "10:30", notes: "تموين مكاتب" },
  { id: 14, product: "مثقاب كهربائي بوش", type: "وارد", qty: 10, warehouse: "مستودع ج", user: "فهد سعود", date: "2026-04-04", time: "08:00", notes: "" },
  { id: 15, product: "كمامات طبية", type: "صادر", qty: 200, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-04-03", time: "15:00", notes: "طلب مستشفى" },
  { id: 16, product: "شاشة سامسونج 55 بوصة", type: "صادر", qty: 10, warehouse: "مستودع أ", user: "نورة أحمد", date: "2026-04-03", time: "12:20", notes: "" },
  { id: 17, product: "لابتوب ديل XPS 15", type: "وارد", qty: 20, warehouse: "مستودع ب", user: "أحمد محمد", date: "2026-04-03", time: "09:00", notes: "دفعة جديدة" },
  { id: 18, product: "مكتب خشبي 160سم", type: "صادر", qty: 5, warehouse: "مستودع ب", user: "سارة علي", date: "2026-04-02", time: "14:10", notes: "" },
  { id: 19, product: "خزنة مكتبية", type: "وارد", qty: 6, warehouse: "مستودع ج", user: "فهد سعود", date: "2026-04-02", time: "11:30", notes: "" },
  { id: 20, product: "رف معدني صناعي", type: "وارد", qty: 12, warehouse: "مستودع ب", user: "خالد يوسف", date: "2026-04-02", time: "08:45", notes: "توسيع المستودع" },
  { id: 21, product: "حذاء رياضي", type: "صادر", qty: 20, warehouse: "مستودع ب", user: "نورة أحمد", date: "2026-04-01", time: "16:00", notes: "" },
  { id: 22, product: "بنطلون جينز", type: "وارد", qty: 50, warehouse: "مستودع ب", user: "سارة علي", date: "2026-04-01", time: "13:30", notes: "تشكيلة جديدة" },
  { id: 23, product: "جهاز قياس ضغط", type: "صادر", qty: 5, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-04-01", time: "10:15", notes: "" },
  { id: 24, product: "فلتر زيت محرك", type: "وارد", qty: 40, warehouse: "مستودع ب", user: "فهد سعود", date: "2026-03-31", time: "15:00", notes: "" },
  { id: 25, product: "بطارية سيارة 70 أمبير", type: "صادر", qty: 8, warehouse: "مستودع ب", user: "خالد يوسف", date: "2026-03-31", time: "11:45", notes: "طلب ورشة" },
  { id: 26, product: "إطار سيارة 205/55", type: "وارد", qty: 24, warehouse: "مستودع ب", user: "نورة أحمد", date: "2026-03-31", time: "09:30", notes: "" },
  { id: 27, product: "سكر أبيض 5 كجم", type: "صادر", qty: 60, warehouse: "مستودع ج", user: "سارة علي", date: "2026-03-30", time: "14:00", notes: "توزيع" },
  { id: 28, product: "ملفات بلاستيكية", type: "وارد", qty: 150, warehouse: "مستودع أ", user: "أحمد محمد", date: "2026-03-30", time: "10:30", notes: "" },
  { id: 29, product: "قفازات عمل", type: "صادر", qty: 15, warehouse: "مستودع ج", user: "فهد سعود", date: "2026-03-30", time: "08:00", notes: "ورشة عمل" },
  { id: 30, product: "ميزان حرارة رقمي", type: "وارد", qty: 25, warehouse: "مستودع أ", user: "نورة أحمد", date: "2026-03-29", time: "13:15", notes: "" },
];

type MovementForm = { product: string; type: "وارد" | "صادر"; qty: number; warehouse: string; user: string; date: string; time: string; notes: string };
const emptyMovement: MovementForm = { product: productNames[0], type: "وارد", qty: 1, warehouse: "مستودع أ", user: users[0], date: new Date().toISOString().split("T")[0], time: new Date().toTimeString().slice(0, 5), notes: "" };

const Movements = () => {
  const { t, dir, tProduct, tWarehouse, tUser, tType } = useLang();
  const align = dir === "rtl" ? "text-right" : "text-left";
  const [movements, setMovements] = useState<Movement[]>(initialMovements);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"الكل" | "وارد" | "صادر">("الكل");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingMovement, setEditingMovement] = useState<Movement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Movement | null>(null);
  const [form, setForm] = useState(emptyMovement);

  const filtered = movements.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = m.product.toLowerCase().includes(q) || tProduct(m.product).toLowerCase().includes(q);
    const matchFilter = filter === "الكل" || m.type === filter;
    return matchSearch && matchFilter;
  });

  const totalIn = movements.filter(m => m.type === "وارد").reduce((s, m) => s + m.qty, 0);
  const totalOut = movements.filter(m => m.type === "صادر").reduce((s, m) => s + m.qty, 0);

  const openAdd = () => { setEditingMovement(null); setForm(emptyMovement); setDialogOpen(true); };
  const openEdit = (m: Movement) => { setEditingMovement(m); setForm({ product: m.product, type: m.type, qty: m.qty, warehouse: m.warehouse, user: m.user, date: m.date, time: m.time, notes: m.notes }); setDialogOpen(true); };
  const openDelete = (m: Movement) => { setDeleteTarget(m); setDeleteDialogOpen(true); };

  const handleSave = () => {
    if (!form.product || form.qty <= 0) { toast.error(t.fillRequired); return; }
    if (editingMovement) {
      setMovements(prev => prev.map(m => m.id === editingMovement.id ? { ...m, ...form } : m));
      toast.success(t.movementEdited);
    } else {
      const newId = Math.max(...movements.map(m => m.id), 0) + 1;
      setMovements(prev => [{ id: newId, ...form }, ...prev]);
      toast.success(t.movementAdded);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setMovements(prev => prev.filter(m => m.id !== deleteTarget.id));
      toast.success(t.movementDeleted);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t.movements}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.movementsSubtitle} ({movements.length})</p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          {t.recordMovement}
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-surface"><CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10"><ArrowDownUp className="h-5 w-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground">{t.totalMovements}</p><p className="text-lg font-semibold tabular-nums">{movements.length}</p></div>
        </CardContent></Card>
        <Card className="card-surface"><CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10"><ArrowUpRight className="h-5 w-5 text-success" /></div>
          <div><p className="text-xs text-muted-foreground">{t.totalIn}</p><p className="text-lg font-semibold tabular-nums">{totalIn} {t.unit}</p></div>
        </CardContent></Card>
        <Card className="card-surface"><CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10"><ArrowDownRight className="h-5 w-5 text-accent" /></div>
          <div><p className="text-xs text-muted-foreground">{t.totalOut}</p><p className="text-lg font-semibold tabular-nums">{totalOut} {t.unit}</p></div>
        </CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
          <input type="text" placeholder={t.searchProductOnly} value={search} onChange={(e) => setSearch(e.target.value)}
            className={`h-10 w-full rounded-lg border bg-card ${dir === "rtl" ? "pr-9 pl-4" : "pl-9 pr-4"} text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all`} />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {(["الكل", "وارد", "صادر"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${filter === f ? "bg-card shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"}`}>
              {f === "الكل" ? t.all : tType(f)}
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
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground`}>{t.product}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground`}>{t.type}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground`}>{t.qty}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground`}>{t.warehouse}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground`}>{t.user}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground`}>{t.date}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground`}>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{tProduct(m.product)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${m.type === "وارد" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}`}>{tType(m.type)}</span>
                    </td>
                    <td className="py-3 px-4 tabular-nums">{m.qty}</td>
                    <td className="py-3 px-4 text-muted-foreground">{tWarehouse(m.warehouse)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{tUser(m.user)}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs tabular-nums">{m.date} {m.time}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(m)}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => openDelete(m)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingMovement ? t.editMovement : t.newMovement}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block">{t.product} *</label>
              <Select value={form.product} onValueChange={v => setForm({ ...form, product: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{productNames.map(p => <SelectItem key={p} value={p}>{tProduct(p)}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t.movementType}</label>
              <Select value={form.type} onValueChange={(v: "وارد" | "صادر") => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="وارد">{tType("وارد")}</SelectItem>
                  <SelectItem value="صادر">{tType("صادر")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t.qty} *</label>
              <Input type="number" min={1} value={form.qty} onChange={e => setForm({ ...form, qty: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t.warehouse}</label>
              <Select value={form.warehouse} onValueChange={v => setForm({ ...form, warehouse: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{warehouses.map(w => <SelectItem key={w} value={w}>{tWarehouse(w)}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t.user}</label>
              <Select value={form.user} onValueChange={v => setForm({ ...form, user: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{users.map(u => <SelectItem key={u} value={u}>{tUser(u)}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t.date}</label>
              <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t.time}</label>
              <Input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block">{t.notes}</label>
              <Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder={t.notesPlaceholder} />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>{t.cancel}</Button>
            <Button onClick={handleSave}>{editingMovement ? t.saveChanges : t.record}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>{t.confirmDelete}</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-2">{t.confirmDeleteMovement} {t.cannotUndo}</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>{t.cancel}</Button>
            <Button variant="destructive" onClick={handleDelete}>{t.delete}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Movements;
