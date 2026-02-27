import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/app/App";
import { ClerkProvider } from "@clerk/clerk-react";
import { LanguageProvider } from "./contexts/LanguageProvider";
import { IntlWrapper } from "./components/common/IntlWrapper";
import { ThemeProvider } from "./components/theme-provider";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <IntlWrapper>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <App />
          </ThemeProvider>
        </ClerkProvider>
      </IntlWrapper>
    </LanguageProvider>
  </StrictMode>,
);
