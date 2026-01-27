import { useState, useEffect } from "react";
import type { AutoSaveStatus, Note } from "@/types";

type Props = {
    note: Note | null
    userEdited: boolean
    handleSave: () => void
}

function useAutoSave({ note, userEdited, handleSave }: Props) {
    const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("initial")

    // Trigger auto-save with debounce
    useEffect(() => {
        if (!note || !userEdited) return

        console.log("Auto-saving Triggered...")

        const timeoutId = setTimeout(() => {
            setAutoSaveStatus("saving")
            handleSave()
            setAutoSaveStatus("saved")
        }, 2000)

        return () => clearTimeout(timeoutId)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note?.title, note?.content, handleSave, userEdited])

    return { autoSaveStatus, setAutoSaveStatus }
}

export default useAutoSave;