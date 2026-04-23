import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Warehouse, Eye, EyeOff, LogIn, Languages } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const { t, lang, dir, toggle } = useLang();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError(t.fillCreds);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = login(username.trim(), password);
      if (!success) {
        setError(t.invalidCreds);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative" dir={dir}>
      <Button variant="ghost" size="sm" onClick={toggle} className="absolute top-4 end-4 gap-1.5">
        <Languages className="h-4 w-4" />
        <span className="text-xs uppercase">{lang === "ar" ? "EN" : "AR"}</span>
      </Button>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-4">
            <Warehouse className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t.appName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.systemTitle}</p>
        </div>

        {/* Login Card */}
        <div className="card-surface p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">{t.login}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t.loginPrompt}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t.username}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.usernamePlaceholder}
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t.password}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="h-11 w-full rounded-lg border border-input bg-background pe-11 ps-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3 text-center animate-fade-in">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 gap-2" disabled={loading}>
              {loading ? (
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {loading ? t.verifying : t.enter}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">{t.rightsReserved}</p>
      </div>
    </div>
  );
};

export default LoginPage;
