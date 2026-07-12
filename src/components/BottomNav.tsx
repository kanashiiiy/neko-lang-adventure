import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Trophy, User, Store } from "lucide-react";

const items = [
  { to: "/home", label: "Início", icon: Home },
  { to: "/home", label: "Lições", icon: BookOpen },
  { to: "/neko-ai", label: "Desafios", icon: Trophy },
  { to: "/profile", label: "Perfil", icon: User },
  { to: "/store", label: "Loja", icon: Store },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 mt-auto border-t-2 border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link key={to} to={to}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-bold transition ${
                active ? "text-primary" : "text-muted-foreground"
              }`}>
              <Icon className={`h-6 w-6 ${active ? "stroke-[2.5]" : ""}`} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
