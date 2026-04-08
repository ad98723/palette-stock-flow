import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, FileText, FileSpreadsheet } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Scatter,
  ScatterChart, Treemap, FunnelChart, Funnel, LabelList,
} from "recharts";
import { toast } from "sonner";

// Data
const monthlyData = [
  { month: "يناير", وارد: 420, صادر: 310, صافي: 110 },
  { month: "فبراير", وارد: 380, صادر: 290, صافي: 90 },
  { month: "مارس", وارد: 510, صادر: 400, صافي: 110 },
  { month: "أبريل", وارد: 470, صادر: 380, صافي: 90 },
  { month: "مايو", وارد: 530, صادر: 420, صافي: 110 },
  { month: "يونيو", وارد: 600, صادر: 480, صافي: 120 },
  { month: "يوليو", وارد: 550, صادر: 450, صافي: 100 },
  { month: "أغسطس", وارد: 620, صادر: 500, صافي: 120 },
  { month: "سبتمبر", وارد: 580, صادر: 470, صافي: 110 },
  { month: "أكتوبر", وارد: 640, صادر: 520, صافي: 120 },
  { month: "نوفمبر", وارد: 590, صادر: 490, صافي: 100 },
  { month: "ديسمبر", وارد: 700, صادر: 560, صافي: 140 },
];

const warehouseData = [
  { name: "مستودع أ", value: 45 },
  { name: "مستودع ب", value: 30 },
  { name: "مستودع ج", value: 25 },
];

const categoryData = [
  { name: "إلكترونيات", value: 35 },
  { name: "أثاث", value: 15 },
  { name: "مواد غذائية", value: 18 },
  { name: "ملابس", value: 12 },
  { name: "أدوات مكتبية", value: 8 },
  { name: "معدات صناعية", value: 5 },
  { name: "مستلزمات طبية", value: 4 },
  { name: "قطع غيار", value: 3 },
];

const COLORS = ["hsl(221,83%,53%)", "hsl(199,89%,48%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)", "hsl(262,83%,58%)", "hsl(330,81%,60%)", "hsl(180,60%,45%)"];

const valueData = [
  { month: "يناير", value: 280000 },
  { month: "فبراير", value: 295000 },
  { month: "مارس", value: 310000 },
  { month: "أبريل", value: 325000 },
  { month: "مايو", value: 335000 },
  { month: "يونيو", value: 345600 },
  { month: "يوليو", value: 352000 },
  { month: "أغسطس", value: 368000 },
  { month: "سبتمبر", value: 375000 },
  { month: "أكتوبر", value: 390000 },
  { month: "نوفمبر", value: 385000 },
  { month: "ديسمبر", value: 410000 },
];

const turnoverData = [
  { month: "يناير", معدل: 3.2 },
  { month: "فبراير", معدل: 3.5 },
  { month: "مارس", معدل: 3.8 },
  { month: "أبريل", معدل: 3.6 },
  { month: "مايو", معدل: 4.0 },
  { month: "يونيو", معدل: 4.2 },
  { month: "يوليو", معدل: 4.1 },
  { month: "أغسطس", معدل: 4.4 },
  { month: "سبتمبر", معدل: 4.3 },
  { month: "أكتوبر", معدل: 4.5 },
  { month: "نوفمبر", معدل: 4.2 },
  { month: "ديسمبر", معدل: 4.8 },
];

const radarData = [
  { metric: "دقة المخزون", A: 92, fullMark: 100 },
  { metric: "سرعة التوريد", A: 78, fullMark: 100 },
  { metric: "معدل الدوران", A: 85, fullMark: 100 },
  { metric: "تقليل الهدر", A: 88, fullMark: 100 },
  { metric: "رضا العملاء", A: 95, fullMark: 100 },
  { metric: "كفاءة التخزين", A: 72, fullMark: 100 },
];

const topProducts = [
  { name: "شاشة سامسونج", مبيعات: 245, إيرادات: 600250 },
  { name: "لابتوب ديل", مبيعات: 120, إيرادات: 624000 },
  { name: "طابعة HP", مبيعات: 89, إيرادات: 160200 },
  { name: "كرسي أرغونومي", مبيعات: 156, إيرادات: 138840 },
  { name: "ماوس لوجيتك", مبيعات: 340, إيرادات: 40800 },
  { name: "سماعة JBL", مبيعات: 198, إيرادات: 55440 },
  { name: "كمامات طبية", مبيعات: 890, إيرادات: 22250 },
  { name: "أقلام حبر", مبيعات: 1200, إيرادات: 18000 },
];

const stockStatus = [
  { name: "متوفر", value: 21, fill: "hsl(142,71%,45%)" },
  { name: "منخفض", value: 6, fill: "hsl(38,92%,50%)" },
  { name: "نفد", value: 3, fill: "hsl(0,84%,60%)" },
];

const dailyMovements = [
  { day: "السبت", وارد: 85, صادر: 62 },
  { day: "الأحد", وارد: 120, صادر: 95 },
  { day: "الاثنين", وارد: 145, صادر: 110 },
  { day: "الثلاثاء", وارد: 130, صادر: 108 },
  { day: "الأربعاء", وارد: 110, صادر: 88 },
  { day: "الخميس", وارد: 95, صادر: 72 },
  { day: "الجمعة", وارد: 40, صادر: 25 },
];

const userPerformance = [
  { name: "أحمد محمد", حركات: 145 },
  { name: "سارة علي", حركات: 132 },
  { name: "خالد يوسف", حركات: 98 },
  { name: "نورة أحمد", حركات: 87 },
  { name: "فهد سعود", حركات: 76 },
];

const tooltipStyle = {
  background: "hsl(0,0%,100%)",
  border: "1px solid hsl(214,32%,91%)",
  borderRadius: "8px",
  fontSize: "12px",
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
};

const handleExportPDF = () => {
  const printContent = document.getElementById("reports-content");
  if (printContent) {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html dir="rtl"><head><title>تقارير المخزون</title>
        <style>body{font-family:sans-serif;padding:20px}h1{text-align:center;margin-bottom:30px}
        .chart-placeholder{border:1px solid #ddd;padding:20px;margin:15px 0;border-radius:8px;text-align:center;color:#666}
        table{width:100%;border-collapse:collapse;margin:15px 0}th,td{border:1px solid #ddd;padding:10px;text-align:right}th{background:#f5f5f5}
        @media print{body{margin:0}.no-print{display:none}}</style></head>
        <body><h1>تقرير المخزون الشامل</h1><p>تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}</p>
        <h2>ملخص الأداء</h2>
        <table><thead><tr><th>المؤشر</th><th>القيمة</th></tr></thead><tbody>
        <tr><td>إجمالي المنتجات</td><td>30</td></tr>
        <tr><td>قيمة المخزون</td><td>410,000 ر.س</td></tr>
        <tr><td>معدل الدوران</td><td>4.8x</td></tr>
        <tr><td>منتجات منخفضة</td><td>6</td></tr>
        <tr><td>منتجات نافدة</td><td>3</td></tr>
        </tbody></table>
        <h2>أعلى المنتجات مبيعاً</h2>
        <table><thead><tr><th>المنتج</th><th>المبيعات</th><th>الإيرادات</th></tr></thead><tbody>
        ${topProducts.map(p => `<tr><td>${p.name}</td><td>${p.مبيعات}</td><td>${p.إيرادات.toLocaleString()} ر.س</td></tr>`).join("")}
        </tbody></table>
        <h2>حركة المخزون الشهرية</h2>
        <table><thead><tr><th>الشهر</th><th>وارد</th><th>صادر</th><th>صافي</th></tr></thead><tbody>
        ${monthlyData.map(d => `<tr><td>${d.month}</td><td>${d.وارد}</td><td>${d.صادر}</td><td>${d.صافي}</td></tr>`).join("")}
        </tbody></table>
        <h2>توزيع الفئات</h2>
        <table><thead><tr><th>الفئة</th><th>النسبة</th></tr></thead><tbody>
        ${categoryData.map(c => `<tr><td>${c.name}</td><td>${c.value}%</td></tr>`).join("")}
        </tbody></table>
        <script>window.print();window.close();</script></body></html>
      `);
      printWindow.document.close();
    }
  }
  toast.success("جاري تصدير التقرير...");
};

const handleExportCSV = () => {
  const headers = "الشهر,وارد,صادر,صافي\n";
  const rows = monthlyData.map(d => `${d.month},${d.وارد},${d.صادر},${d.صافي}`).join("\n");
  const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "تقرير_المخزون.csv";
  link.click();
  toast.success("تم تصدير ملف CSV بنجاح");
};

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in" id="reports-content">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">التقارير</h1>
          <p className="text-sm text-muted-foreground mt-1">تحليلات وإحصائيات مفصلة للمخزون — 12 تقرير بياني</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2"><Calendar className="h-4 w-4" />سنة كاملة</Button>
          <Button variant="outline" className="gap-2" onClick={handleExportCSV}><FileSpreadsheet className="h-4 w-4" />تصدير CSV</Button>
          <Button className="gap-2" onClick={handleExportPDF}><Download className="h-4 w-4" />تصدير PDF</Button>
        </div>
      </div>

      {/* Chart 1: Monthly Bar Chart */}
      <Card className="card-surface">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">1. حركة المخزون الشهرية</CardTitle>
          <p className="text-xs text-muted-foreground">مقارنة الوارد والصادر والصافي خلال 12 شهر</p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="وارد" fill="hsl(221,83%,53%)" radius={[4,4,0,0]} />
                <Bar dataKey="صادر" fill="hsl(199,89%,48%)" radius={[4,4,0,0]} />
                <Bar dataKey="صافي" fill="hsl(142,71%,45%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 2: Inventory Value Line */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">2. تطور قيمة المخزون</CardTitle>
            <p className="text-xs text-muted-foreground">القيمة الإجمالية بالريال خلال السنة</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={valueData}>
                  <defs>
                    <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value.toLocaleString()} ر.س`, "القيمة"]} />
                  <Area type="monotone" dataKey="value" stroke="hsl(221,83%,53%)" strokeWidth={2.5} fill="url(#valueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 3: Warehouse Pie */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">3. توزيع المستودعات</CardTitle>
            <p className="text-xs text-muted-foreground">نسبة المخزون في كل مستودع</p>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={warehouseData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {warehouseData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`, "النسبة"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {warehouseData.map((w, i) => (
                <div key={w.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} /><span className="text-muted-foreground">{w.name}</span></div>
                  <span className="tabular-nums font-medium">{w.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart 4: Category Distribution */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">4. توزيع الفئات</CardTitle>
            <p className="text-xs text-muted-foreground">نسبة كل فئة من إجمالي المخزون</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" width={90} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`, "النسبة"]} />
                  <Bar dataKey="value" radius={[0,4,4,0]}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 5: Turnover Rate */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">5. معدل دوران المخزون</CardTitle>
            <p className="text-xs text-muted-foreground">تطور معدل الدوران شهرياً</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnoverData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}x`, "المعدل"]} />
                  <Line type="monotone" dataKey="معدل" stroke="hsl(142,71%,45%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(142,71%,45%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 6: Radar - Performance */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">6. مؤشرات الأداء</CardTitle>
            <p className="text-xs text-muted-foreground">تقييم شامل لأداء إدارة المخزون</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(214,32%,91%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} stroke="hsl(215,16%,47%)" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar name="الأداء" dataKey="A" stroke="hsl(221,83%,53%)" fill="hsl(221,83%,53%)" fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 7: Stock Status Donut */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">7. حالة المخزون</CardTitle>
            <p className="text-xs text-muted-foreground">توزيع المنتجات حسب حالة التوفر</p>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stockStatus} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
                    {stockStatus.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value} منتج`, "العدد"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {stockStatus.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full" style={{ background: s.fill }} /><span className="text-muted-foreground">{s.name}</span></div>
                  <span className="tabular-nums font-medium">{s.value} منتج</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart 8: Daily Movements */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">8. الحركة اليومية</CardTitle>
            <p className="text-xs text-muted-foreground">توزيع الحركات حسب أيام الأسبوع</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyMovements}>
                  <defs>
                    <linearGradient id="dayIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="dayOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199,89%,48%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(199,89%,48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="وارد" stroke="hsl(221,83%,53%)" fill="url(#dayIn)" strokeWidth={2} />
                  <Area type="monotone" dataKey="صادر" stroke="hsl(199,89%,48%)" fill="url(#dayOut)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 9: Top Products */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">9. أعلى المنتجات مبيعاً</CardTitle>
            <p className="text-xs text-muted-foreground">حسب عدد الوحدات المباعة</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} stroke="hsl(215,16%,47%)" width={85} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="مبيعات" fill="hsl(221,83%,53%)" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 10: User Performance */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">10. أداء الموظفين</CardTitle>
            <p className="text-xs text-muted-foreground">عدد الحركات المسجلة لكل موظف</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(215,16%,47%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="حركات" radius={[4,4,0,0]}>
                    {userPerformance.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 11: Revenue by Product */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">11. الإيرادات حسب المنتج</CardTitle>
            <p className="text-xs text-muted-foreground">مقارنة إيرادات أعلى المنتجات</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(215,16%,47%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value.toLocaleString()} ر.س`, "الإيرادات"]} />
                  <Bar dataKey="إيرادات" fill="hsl(38,92%,50%)" radius={[4,4,0,0]} fillOpacity={0.8} />
                  <Line type="monotone" dataKey="إيرادات" stroke="hsl(0,84%,60%)" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 12: Monthly Comparison Composed */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">12. تحليل مقارن شهري</CardTitle>
            <p className="text-xs text-muted-foreground">الوارد والصادر مع خط الاتجاه</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(215,16%,47%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="وارد" fill="hsl(221,83%,53%)" fillOpacity={0.1} stroke="hsl(221,83%,53%)" strokeWidth={2} />
                  <Bar dataKey="صادر" fill="hsl(199,89%,48%)" radius={[4,4,0,0]} fillOpacity={0.7} />
                  <Line type="monotone" dataKey="صافي" stroke="hsl(142,71%,45%)" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(142,71%,45%)" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
