import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const monthlyData = [
  { month: "يناير", وارد: 420, صادر: 310, صافي: 110 },
  { month: "فبراير", وارد: 380, صادر: 290, صافي: 90 },
  { month: "مارس", وارد: 510, صادر: 400, صافي: 110 },
  { month: "أبريل", وارد: 470, صادر: 380, صافي: 90 },
  { month: "مايو", وارد: 530, صادر: 420, صافي: 110 },
  { month: "يونيو", وارد: 600, صادر: 480, صافي: 120 },
];

const warehouseData = [
  { name: "مستودع أ", value: 45 },
  { name: "مستودع ب", value: 30 },
  { name: "مستودع ج", value: 25 },
];

const COLORS = ["hsl(221,83%,53%)", "hsl(199,89%,48%)", "hsl(142,71%,45%)"];

const valueData = [
  { month: "يناير", value: 280000 },
  { month: "فبراير", value: 295000 },
  { month: "مارس", value: 310000 },
  { month: "أبريل", value: 325000 },
  { month: "مايو", value: 335000 },
  { month: "يونيو", value: 345600 },
];

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">التقارير</h1>
          <p className="text-sm text-muted-foreground mt-1">تحليلات وإحصائيات مفصلة للمخزون</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            آخر 6 أشهر
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            تصدير PDF
          </Button>
        </div>
      </div>

      {/* Bar Chart - Monthly Movement */}
      <Card className="card-surface">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">حركة المخزون الشهرية</CardTitle>
          <p className="text-xs text-muted-foreground">مقارنة الوارد والصادر والصافي</p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0,0%,100%)",
                    border: "1px solid hsl(214,32%,91%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="وارد" fill="hsl(221,83%,53%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="صادر" fill="hsl(199,89%,48%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="صافي" fill="hsl(142,71%,45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart - Inventory Value */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">قيمة المخزون</CardTitle>
            <p className="text-xs text-muted-foreground">تطور القيمة الإجمالية بالريال</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={valueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0,0%,100%)",
                      border: "1px solid hsl(214,32%,91%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value.toLocaleString()} ر.س`, "القيمة"]}
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(221,83%,53%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(221,83%,53%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Warehouse Distribution */}
        <Card className="card-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">توزيع المستودعات</CardTitle>
            <p className="text-xs text-muted-foreground">نسبة المخزون في كل مستودع</p>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={warehouseData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {warehouseData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0,0%,100%)",
                      border: "1px solid hsl(214,32%,91%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, "النسبة"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {warehouseData.map((w, i) => (
                <div key={w.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground">{w.name}</span>
                  </div>
                  <span className="tabular-nums font-medium">{w.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
