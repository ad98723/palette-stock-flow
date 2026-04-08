import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter, Package, Pencil, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  qty: number;
  minQty: number;
  price: number;
  warehouse: string;
}

const getStatus = (p: Product) => p.qty === 0 ? "نفد" : p.qty < p.minQty ? "منخفض" : "متوفر";

const categories = ["إلكترونيات", "أثاث", "مواد غذائية", "ملابس", "أدوات مكتبية", "معدات صناعية", "مستلزمات طبية", "قطع غيار"];
const warehouses = ["مستودع أ", "مستودع ب", "مستودع ج"];

const initialProducts: Product[] = [
  { id: 1, name: "شاشة سامسونج 55 بوصة", sku: "ELC-001", category: "إلكترونيات", qty: 124, minQty: 20, price: 2450, warehouse: "مستودع أ" },
  { id: 2, name: "لابتوب ديل XPS 15", sku: "ELC-002", category: "إلكترونيات", qty: 45, minQty: 10, price: 5200, warehouse: "مستودع أ" },
  { id: 3, name: "طابعة HP LaserJet", sku: "ELC-003", category: "إلكترونيات", qty: 8, minQty: 15, price: 1800, warehouse: "مستودع ب" },
  { id: 4, name: "كرسي مكتب أرغونومي", sku: "FRN-001", category: "أثاث", qty: 32, minQty: 10, price: 890, warehouse: "مستودع ج" },
  { id: 5, name: "مكتب خشبي 160سم", sku: "FRN-002", category: "أثاث", qty: 5, minQty: 8, price: 1200, warehouse: "مستودع ب" },
  { id: 6, name: "ماوس لاسلكي لوجيتك", sku: "ELC-004", category: "إلكترونيات", qty: 230, minQty: 50, price: 120, warehouse: "مستودع أ" },
  { id: 7, name: "شاحن متعدد المنافذ", sku: "ELC-005", category: "إلكترونيات", qty: 0, minQty: 30, price: 85, warehouse: "مستودع أ" },
  { id: 8, name: "لوحة مفاتيح ميكانيكية", sku: "ELC-006", category: "إلكترونيات", qty: 67, minQty: 20, price: 350, warehouse: "مستودع ب" },
  { id: 9, name: "سماعة بلوتوث JBL", sku: "ELC-007", category: "إلكترونيات", qty: 89, minQty: 25, price: 280, warehouse: "مستودع أ" },
  { id: 10, name: "كابل HDMI 3 متر", sku: "ELC-008", category: "إلكترونيات", qty: 340, minQty: 100, price: 35, warehouse: "مستودع أ" },
  { id: 11, name: "خزنة مكتبية", sku: "FRN-003", category: "أثاث", qty: 12, minQty: 5, price: 1650, warehouse: "مستودع ج" },
  { id: 12, name: "رف معدني صناعي", sku: "FRN-004", category: "أثاث", qty: 18, minQty: 10, price: 780, warehouse: "مستودع ب" },
  { id: 13, name: "أرز بسمتي 10 كجم", sku: "FD-001", category: "مواد غذائية", qty: 200, minQty: 50, price: 45, warehouse: "مستودع ج" },
  { id: 14, name: "زيت زيتون 2 لتر", sku: "FD-002", category: "مواد غذائية", qty: 150, minQty: 40, price: 62, warehouse: "مستودع ج" },
  { id: 15, name: "سكر أبيض 5 كجم", sku: "FD-003", category: "مواد غذائية", qty: 3, minQty: 30, price: 22, warehouse: "مستودع ج" },
  { id: 16, name: "قميص رجالي قطن", sku: "CLT-001", category: "ملابس", qty: 95, minQty: 30, price: 120, warehouse: "مستودع ب" },
  { id: 17, name: "بنطلون جينز", sku: "CLT-002", category: "ملابس", qty: 78, minQty: 25, price: 180, warehouse: "مستودع ب" },
  { id: 18, name: "حذاء رياضي", sku: "CLT-003", category: "ملابس", qty: 42, minQty: 15, price: 320, warehouse: "مستودع ب" },
  { id: 19, name: "أقلام حبر جاف (12)", sku: "OFF-001", category: "أدوات مكتبية", qty: 500, minQty: 100, price: 15, warehouse: "مستودع أ" },
  { id: 20, name: "دفتر ملاحظات A4", sku: "OFF-002", category: "أدوات مكتبية", qty: 320, minQty: 80, price: 12, warehouse: "مستودع أ" },
  { id: 21, name: "ملفات بلاستيكية", sku: "OFF-003", category: "أدوات مكتبية", qty: 0, minQty: 50, price: 8, warehouse: "مستودع أ" },
  { id: 22, name: "مثقاب كهربائي بوش", sku: "IND-001", category: "معدات صناعية", qty: 15, minQty: 5, price: 890, warehouse: "مستودع ج" },
  { id: 23, name: "مفتاح ربط هيدروليكي", sku: "IND-002", category: "معدات صناعية", qty: 8, minQty: 3, price: 1200, warehouse: "مستودع ج" },
  { id: 24, name: "قفازات عمل (صندوق)", sku: "IND-003", category: "معدات صناعية", qty: 4, minQty: 10, price: 65, warehouse: "مستودع ج" },
  { id: 25, name: "كمامات طبية (50)", sku: "MED-001", category: "مستلزمات طبية", qty: 600, minQty: 200, price: 25, warehouse: "مستودع أ" },
  { id: 26, name: "جهاز قياس ضغط", sku: "MED-002", category: "مستلزمات طبية", qty: 22, minQty: 10, price: 180, warehouse: "مستودع أ" },
  { id: 27, name: "ميزان حرارة رقمي", sku: "MED-003", category: "مستلزمات طبية", qty: 0, minQty: 15, price: 45, warehouse: "مستودع أ" },
  { id: 28, name: "فلتر زيت محرك", sku: "SP-001", category: "قطع غيار", qty: 75, minQty: 20, price: 35, warehouse: "مستودع ب" },
  { id: 29, name: "بطارية سيارة 70 أمبير", sku: "SP-002", category: "قطع غيار", qty: 18, minQty: 8, price: 420, warehouse: "مستودع ب" },
  { id: 30, name: "إطار سيارة 205/55", sku: "SP-003", category: "قطع غيار", qty: 6, minQty: 12, price: 380, warehouse: "مستودع ب" },
];

const emptyProduct: Omit<Product, "id"> = { name: "", sku: "", category: "إلكترونيات", qty: 0, minQty: 10, price: 0, warehouse: "مستودع أ" };

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("الكل");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.includes(search) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "الكل" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const openAdd = () => { setEditingProduct(null); setForm(emptyProduct); setDialogOpen(true); };
  const openEdit = (p: Product) => { setEditingProduct(p); setForm({ name: p.name, sku: p.sku, category: p.category, qty: p.qty, minQty: p.minQty, price: p.price, warehouse: p.warehouse }); setDialogOpen(true); };
  const openDelete = (p: Product) => { setDeleteTarget(p); setDeleteDialogOpen(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.sku.trim()) { toast.error("يرجى ملء جميع الحقول المطلوبة"); return; }
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...form } : p));
      toast.success("تم تعديل المنتج بنجاح");
    } else {
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts(prev => [{ id: newId, ...form }, ...prev]);
      toast.success("تمت إضافة المنتج بنجاح");
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
      toast.success("تم حذف المنتج بنجاح");
    }
    setDeleteDialogOpen(false);
  };

  const totalValue = products.reduce((s, p) => s + p.qty * p.price, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">المنتجات</h1>
          <p className="text-sm text-muted-foreground mt-1">إدارة وتتبع جميع المنتجات في المخزون ({products.length} منتج)</p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          إضافة منتج
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="card-surface"><CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10"><Package className="h-5 w-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground">إجمالي المنتجات</p><p className="text-lg font-semibold tabular-nums">{products.length}</p></div>
        </CardContent></Card>
        <Card className="card-surface"><CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10"><Package className="h-5 w-5 text-success" /></div>
          <div><p className="text-xs text-muted-foreground">قيمة المخزون</p><p className="text-lg font-semibold tabular-nums">{totalValue.toLocaleString()} ر.س</p></div>
        </CardContent></Card>
        <Card className="card-surface"><CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10"><Package className="h-5 w-5 text-warning" /></div>
          <div><p className="text-xs text-muted-foreground">منخفض المخزون</p><p className="text-lg font-semibold tabular-nums">{products.filter(p => getStatus(p) === "منخفض").length}</p></div>
        </CardContent></Card>
        <Card className="card-surface"><CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10"><Package className="h-5 w-5 text-destructive" /></div>
          <div><p className="text-xs text-muted-foreground">نفد من المخزون</p><p className="text-lg font-semibold tabular-nums">{products.filter(p => getStatus(p) === "نفد").length}</p></div>
        </CardContent></Card>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="بحث بالاسم أو الرمز..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border bg-card pr-9 pl-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px] gap-2"><Filter className="h-4 w-4" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="الكل">كل الفئات</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
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
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المستودع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الكمية</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">السعر</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const status = getStatus(p);
                  return (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{p.name}</td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{p.sku}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.category}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.warehouse}</td>
                      <td className="py-3 px-4 tabular-nums">{p.qty}</td>
                      <td className="py-3 px-4 tabular-nums">{p.price.toLocaleString()} ر.س</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          status === "متوفر" ? "bg-success/10 text-success" : status === "منخفض" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                        }`}>{status}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}><Pencil className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => openDelete(p)}><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingProduct ? "تعديل منتج" : "إضافة منتج جديد"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block">اسم المنتج *</label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="أدخل اسم المنتج" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">الرمز (SKU) *</label>
              <Input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="ELC-001" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">الفئة</label>
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">المستودع</label>
              <Select value={form.warehouse} onValueChange={v => setForm({ ...form, warehouse: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{warehouses.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">السعر (ر.س)</label>
              <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">الكمية</label>
              <Input type="number" value={form.qty} onChange={e => setForm({ ...form, qty: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">الحد الأدنى</label>
              <Input type="number" value={form.minQty} onChange={e => setForm({ ...form, minQty: Number(e.target.value) })} />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editingProduct ? "حفظ التعديلات" : "إضافة"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>تأكيد الحذف</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-2">هل أنت متأكد من حذف المنتج <strong>"{deleteTarget?.name}"</strong>؟ لا يمكن التراجع عن هذا الإجراء.</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={handleDelete}>حذف</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
