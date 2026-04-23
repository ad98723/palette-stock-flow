import { Package, TrendingUp, AlertTriangle, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useLang } from "@/contexts/LanguageContext";

const inventoryTrendRaw = [
  { month: "يناير", in: 420, out: 310 },
  { month: "فبراير", in: 380, out: 290 },
  { month: "مارس", in: 510, out: 400 },
  { month: "أبريل", in: 470, out: 380 },
  { month: "مايو", in: 530, out: 420 },
  { month: "يونيو", in: 600, out: 480 },
];

const categoryDataRaw = [
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

const recentMovementsRaw = [
  { id: 1, product: "شاشة سامسونج 55 بوصة", type: "وارد", qty: 45, warehouse: "مستودع أ", date: "منذ 12 دقيقة" },
  { id: 2, product: "لابتوب ديل XPS 15", type: "صادر", qty: 12, warehouse: "مستودع ب", date: "منذ 34 دقيقة" },
  { id: 3, product: "طابعة HP LaserJet", type: "وارد", qty: 30, warehouse: "مستودع أ", date: "منذ ساعة" },
  { id: 4, product: "كرسي مكتب أرغونومي", type: "صادر", qty: 8, warehouse: "مستودع ج", date: "منذ ساعتين" },
  { id: 5, product: "ماوس لاسلكي لوجيتك", type: "وارد", qty: 100, warehouse: "مستودع أ", date: "منذ 3 ساعات" },
];

const Index = () => {
  const { t, lang, dir, tMonth, tCategory, tProduct, tWarehouse, tType, tRelTime } = useLang();
  const align = dir === "rtl" ? "text-right" : "text-left";
  const sar = lang === "ar" ? "ر.س" : "SAR";

  const kpis = [
    { title: t.totalProducts, value: "2,847", change: "+12%", up: true, icon: Package, color: "text-primary" },
    { title: t.inventoryValue, value: `345,600 ${sar}`, change: "+8.2%", up: true, icon: DollarSign, color: "text-success" },
    { title: t.lowStock, value: "23", change: "-5", up: false, icon: AlertTriangle, color: "text-warning" },
    { title: t.turnoverRate, value: "4.2x", change: "+0.3", up: true, icon: TrendingUp, color: "text-accent" },
  ];

  const inventoryTrend = inventoryTrendRaw.map((m) => ({
    month: tMonth(m.month),
    [t.inbound]: m.in,
    [t.outbound]: m.out,
  }));
  const categoryData = categoryDataRaw.map((c) => ({ name: tCategory(c.name), value: c.value }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{t.dashboard}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.dashboardSubtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="card-surface border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-xl font-bold tabular-nums text-foreground">{kpi.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl bg-muted shrink-0 ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-xs">
                {kpi.up ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-warning" />
                )}
                <span className={`font-medium ${kpi.up ? "text-success" : "text-warning"}`}>{kpi.change}</span>
                <span className="text-muted-foreground">{t.vsLastMonth}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="card-surface xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{t.inventoryMovement}</CardTitle>
            <p className="text-xs text-muted-foreground">{t.inOutLast6}</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inventoryTrend} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" axisLine={false} tickLine={false} width={35} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 32%, 91%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
                    }}
                  />
                  <Area type="monotone" dataKey={t.inbound} stroke="hsl(221, 83%, 53%)" strokeWidth={2} fill="url(#colorIn)" />
                  <Area type="monotone" dataKey={t.outbound} stroke="hsl(199, 89%, 48%)" strokeWidth={2} fill="url(#colorOut)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2 w-6 rounded-full bg-primary" />
                <span className="text-muted-foreground">{t.inbound}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2 w-6 rounded-full bg-accent" />
                <span className="text-muted-foreground">{t.outbound}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{t.categoryDistribution}</CardTitle>
            <p className="text-xs text-muted-foreground">{t.categoryShare}</p>
          </CardHeader>
          <CardContent>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
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
                    formatter={(value: number) => [`${value}%`, t.share]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-3">
              {categoryData.map((cat, i) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="tabular-nums font-semibold text-foreground">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Movements */}
      <Card className="card-surface">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">{t.recentMovements}</CardTitle>
          <p className="text-xs text-muted-foreground">{t.recentMovementsDesc}</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header-bg border-b">
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground text-xs`}>{t.product}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground text-xs`}>{t.type}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground text-xs`}>{t.qty}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground text-xs hidden sm:table-cell`}>{t.warehouse}</th>
                  <th className={`${align} py-3 px-4 font-medium text-muted-foreground text-xs`}>{t.time}</th>
                </tr>
              </thead>
              <tbody>
                {recentMovementsRaw.map((m) => (
                  <tr key={m.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-sm">{tProduct(m.product)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          m.type === "وارد"
                            ? "bg-success/10 text-success"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {tType(m.type)}
                      </span>
                    </td>
                    <td className="py-3 px-4 tabular-nums font-medium">{m.qty}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{tWarehouse(m.warehouse)}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{tRelTime(m.date)}</td>
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
