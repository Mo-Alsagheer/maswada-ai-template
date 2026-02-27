import { Link } from "react-router-dom";
import { Languages, Moon, Sun } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";

import { useIntl } from "react-intl";

export function Header() {
  const { isRTL, toggleLanguage } = useLanguage();
  const intl = useIntl();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-md font-bold tracking-wide">
              {intl.formatMessage({ id: "header.logo" })}
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {intl.formatMessage({ id: "header.description" })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="glass-border inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 hidden dark:block" />
              <Moon className="h-4 w-4 dark:hidden" />
            </button>
            <Button
              variant="secondary"
              className="glass-border inline-flex gap-2 h-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
              aria-label="Settings"
              onClick={toggleLanguage}
            >
              <Languages className="h-4 w-4" />
              {isRTL
                ? intl.formatMessage({ id: "header.langEn" })
                : intl.formatMessage({ id: "header.langAr" })}
            </Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
