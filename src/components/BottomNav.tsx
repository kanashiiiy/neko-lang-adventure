import { Link, useLocation } from "@tanstack/react-router";
import { Home, Target, Sparkles, Languages, Gem, User } from "lucide-react";

const items = [
  { to: "/home", label: "Início", icon: Home },
  { to: "/missoes", label: "Missões", icon: Target },
  { to: "/neko-ai", label: "NEKO AI", icon: Sparkles },
  { to: "/alfabeto", label: "Alfabeto", icon: Languages },
  { to: "/store", label: "Premium", icon: Gem },
  { to: "/profile", label: "Perfil", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 mt-auto border-t-2 border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around px-1 py-1.5">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[9px] font-bold transition ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
