import type { AutoSaveStatus } from "@/types";
import { CircleAlertIcon, CircleCheckIcon, Loader2Icon } from "lucide-react";
import { useIntl } from "react-intl";

type Props = {
    autoSaveStatus: AutoSaveStatus
}

function AutoSaveIndicator({ autoSaveStatus }: Props) {
    const intl = useIntl()

    switch (autoSaveStatus) {
        case "saving":
            return (
                <div className="flex items-center gap-2">
                    <Loader2Icon className="size-4 text-zinc-500 animate-spin" />
                    <span className="text-sm text-zinc-500">
                        {intl.formatMessage({ id: 'autoSave.saving' })}
                    </span>
                </div>
            )
        case "saved":
            return (
                <div className="flex items-center gap-2">
                    <CircleCheckIcon className="size-4 text-green-500" />
                    <span className="text-sm text-green-500">
                        {intl.formatMessage({ id: 'autoSave.savedSuccessfully' })}
                    </span>
                </div>
            )
        case "unsaved":
            return (
                <div className="flex items-center gap-2">
                    <CircleAlertIcon className="size-4 text-orange-500" />
                    <span className="text-sm text-orange-500">
                        {intl.formatMessage({ id: 'autoSave.unsavedChanges' })}
                    </span>
                </div>
            )
        case "initial":
            return null
        default:
            return null
    }
}

export default AutoSaveIndicator;