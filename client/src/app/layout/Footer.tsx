import { useIntl } from "react-intl";

export function Footer() {
  const intl = useIntl();
  return (
    <footer className="mt-8 border-t border-black/5">
      <div className="mx-auto flex flex-col sm:flex-row w-full max-w-6xl items-center justify-between gap-4 px-4 py-6 text-xs text-zinc-500 sm:px-6 lg:px-8">
        <span className="text-center">
          © {new Date().getFullYear()}{" "}
          {intl.formatMessage({ id: "footer.maswada" })}
        </span>
        <span className="text-center">
          {intl.formatMessage({ id: "footer.rights" })}
        </span>
      </div>
    </footer>
  );
}
