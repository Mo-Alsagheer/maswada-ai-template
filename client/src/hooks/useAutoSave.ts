import { useState, useEffect, useCallback } from "react";
import type { AutoSaveStatus, Note } from "@/types";
import { toast } from "sonner";

export function useAutoSave(
  note: Note | null,
  updateNoteFn: (
    id: string,
    update: { title: string; content: string },
  ) => Promise<any>,
) {
  const [isNoteEditing, setIsNoteEditing] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] =
    useState<AutoSaveStatus>("initial");

  const handleUpdateNote = useCallback(async () => {
    if (!note) return;
    setAutoSaveStatus("saving");
    try {
      await updateNoteFn(note.id, { title: note.title, content: note.content });
      setIsNoteEditing(false);
      setAutoSaveStatus("saved");
    } catch (error) {
      setAutoSaveStatus("unsaved");
      toast.error("Failed to update note");
    }
  }, [note, updateNoteFn]);

  useEffect(() => {
    if (!isNoteEditing || !note) return;

    const timer = setTimeout(() => {
      handleUpdateNote();
    }, 1000);

    return () => clearTimeout(timer);
  }, [note?.title, note?.content, isNoteEditing, handleUpdateNote]);

  const markAsUnsaved = useCallback(() => {
    setIsNoteEditing(true);
    setAutoSaveStatus("unsaved");
  }, []);

  return {
    autoSaveStatus,
    markAsUnsaved,
  };
}
