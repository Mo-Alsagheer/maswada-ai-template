import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import { FormattedMessage, useIntl } from "react-intl"
import { UserButton } from "@clerk/clerk-react"
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate"


export function Header() {
  const { isRTL, toggleLanguage } = useLanguage()
  const { getLocalePath } = useLocaleNavigate()
  const intl = useIntl()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        {/* Using glass class directly - header doesn't need rounded-2xl from glass-card */}
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to={getLocalePath('/')}
              className="text-sm font-semibold tracking-wide"
            >
              <FormattedMessage id="title" />
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              <FormattedMessage id="tagline" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={toggleLanguage} variant="outline">
              {isRTL ? intl.formatMessage({ id: 'language.english' }) : intl.formatMessage({ id: 'language.arabic' })}
            </Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}
