import { Package, TrendingUp, AlertTriangle, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { title: "إجمالي المنتجات", value: "2,847", change: "+12%", up: true, icon: Package, color: "text-primary" },
  { title: "قيمة المخزون", value: "٣٤٥,٦٠٠ ر.س", change: "+8.2%", up: true, icon: DollarSign, color: "text-success" },
  { title: "منتجات منخفضة", value: "23", change: "-5", up: false, icon: AlertTriangle, color: "text-warning" },
  { title: "معدل الدوران", value: "4.2x", change: "+0.3", up: true, icon: TrendingUp, color: "text-accent" },
];

const inventoryTrend = [
  { month: "يناير", وارد: 420, صادر: 310 },
  { month: "فبراير", وارد: 380, صادر: 290 },
  { month: "مارس", وارد: 510, صادر: 400 },
  { month: "أبريل", وارد: 470, صادر: 380 },
  { month: "مايو", وارد: 530, صادر: 420 },
  { month: "يونيو", وارد: 600, صادر: 480 },
];

const categoryData = [
  { name: "إلكترونيات", value: 35 },
  { name: "أثاث", value: 25 },
  { name: "مواد غذائية", value: 20 },
  { name: "ملابس", value: 12 },
  { name: "أخرى", value: 8 },
];

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(199, 89%, 48%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(215, 16%, 47%)",
];

const recentMovements = [
  { id: 1, product: "شاشة سامسونج 55 بوصة", type: "وارد", qty: 45, warehouse: "مستودع أ", date: "منذ 12 دقيقة" },
  { id: 2, product: "لابتوب ديل XPS 15", type: "صادر", qty: 12, warehouse: "مستودع ب", date: "منذ 34 دقيقة" },
  { id: 3, product: "طابعة HP LaserJet", type: "وارد", qty: 30, warehouse: "مستودع أ", date: "منذ ساعة" },
  { id: 4, product: "كرسي مكتب أرغونومي", type: "صادر", qty: 8, warehouse: "مستودع ج", date: "منذ ساعتين" },
  { id: 5, product: "ماوس لاسلكي لوجيتك", type: "وارد", qty: 100, warehouse: "مستودع أ", date: "منذ 3 ساعات" },
];

const Index = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground mt-1">نظرة عامة على حالة المخزون — آخر تحديث: منذ 12 ثانية</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="card-surface">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-semibold tabular-nums">{kpi.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-muted ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs">
                {kpi.up ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-warning" />
                )}
                <span className={kpi.up ? "text-success" : "text-warning"}>{kpi.change}</span>
                <span className="text-muted-foreground">مقارنة بالشهر السابق</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <Card className="card-surface lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">حركة المخزون</CardTitle>
            <p className="text-xs text-muted-foreground">الوارد والصادر خلال الأشهر الستة الأخيرة</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inventoryTrend}>
                  <defs>
                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="وارد" stroke="hsl(221, 83%, 53%)" strokeWidth={2} fill="url(#colorIn)" />
                  <Area type="monotone" dataKey="صادر" stroke="hsl(199, 89%, 48%)" strokeWidth={2} fill="url(#colorOut)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">توزيع الفئات</CardTitle>
            <p className="text-xs text-muted-foreground">نسبة كل فئة من المخزون</p>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, "النسبة"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {categoryData.map((cat, i) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="tabular-nums font-medium">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Movements Table */}
      <Card className="card-surface">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">آخر الحركات</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">أحدث عمليات الوارد والصادر</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header-bg">
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground rounded-tr-lg">المنتج</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">النوع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الكمية</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المستودع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground rounded-tl-lg">الوقت</th>
                </tr>
              </thead>
              <tbody>
                {recentMovements.map((m) => (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium">{m.product}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          m.type === "وارد"
                            ? "bg-success/10 text-success"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {m.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 tabular-nums">{m.qty}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{m.warehouse}</td>
                    <td className="py-3.5 px-4 text-muted-foreground text-xs">{m.date}</td>
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

export default Index;
