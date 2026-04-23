import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, LogOut, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { t, lang, dir, toggle } = useLang();
  const userName = lang === "en" && user?.username === "admin" ? t.adminUserName : (user?.name || t.adminUserName);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" dir={dir}>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-14 shrink-0 flex items-center justify-between border-b bg-card px-4 gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="relative hidden md:block">
                <Search className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none`} />
                <input
                  type="text"
                  placeholder={t.quickSearch}
                  className={`h-9 w-64 rounded-lg border border-input bg-muted/50 ${dir === "rtl" ? "pr-9 pl-4" : "pl-9 pr-4"} text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground`}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5 font-medium" title={t.language}>
                <Languages className="h-4 w-4" />
                <span className="text-xs uppercase">{lang === "ar" ? "EN" : "AR"}</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className={`absolute top-1.5 ${dir === "rtl" ? "left-1.5" : "right-1.5"} h-2 w-2 rounded-full bg-destructive`} />
              </Button>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {userName.charAt(0)}
                </div>
                <span className="text-foreground font-medium">{userName}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} title={t.logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
