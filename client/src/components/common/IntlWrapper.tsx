
import { useLanguage } from "@/hooks/useLanguage";
import { messages } from "@/i18n";
import { IntlProvider } from "react-intl";

type IntlWrapperProps = {
    children: React.ReactNode;
}


export function IntlWrapper({ children }: IntlWrapperProps) {
    const { locale } = useLanguage();
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            {children}
        </IntlProvider>
    );
}