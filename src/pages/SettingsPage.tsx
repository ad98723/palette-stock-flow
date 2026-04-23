import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User, Bell, Shield } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const SettingsPage = () => {
  const { t } = useLang();
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">{t.settings}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.settingsSubtitle}</p>
      </div>

      <Card className="card-surface">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{t.companyInfo}</CardTitle>
              <CardDescription>{t.companyInfoDesc}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t.companyName}</label>
              <input className="mt-1 h-10 w-full rounded-lg border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" defaultValue={t.appName} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t.email}</label>
              <input className="mt-1 h-10 w-full rounded-lg border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" defaultValue="info@warehouespro.com" />
            </div>
          </div>
          <Button>{t.saveChanges}</Button>
        </CardContent>
      </Card>

      <Card className="card-surface">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <User className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-base">{t.profile}</CardTitle>
              <CardDescription>{t.profileDesc}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t.name}</label>
              <input className="mt-1 h-10 w-full rounded-lg border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" defaultValue={t.adminUserName} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t.role}</label>
              <input className="mt-1 h-10 w-full rounded-lg border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 text-muted-foreground" defaultValue={t.inventoryManager} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-surface">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Bell className="h-5 w-5 text-warning" />
            </div>
            <div>
              <CardTitle className="text-base">{t.notifications}</CardTitle>
              <CardDescription>{t.notificationsDesc}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm">{t.notifyLow}</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">{t.notifyOut}</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">{t.dailyReportEmail}</span>
            <input type="checkbox" className="h-4 w-4 rounded accent-primary" />
          </label>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
