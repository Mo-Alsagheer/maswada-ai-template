import type { CreateNoteDTO, Note, UpdateNoteDTO } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";
import { API_URL } from "@/lib/utils";

function useNotesAPI() {
  const { getToken } = useAuth();

  const getUserNotes = useCallback(async () => {
    const token = await getToken();
    if (!token) return [];

    const response = await fetch(`${API_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: { notes: Note[] } = await response.json();
    return data.notes;
  }, [getToken]);

  const createNote = async (note: CreateNoteDTO) => {
    const token = await getToken();
    if (!token) return;

    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    return data.note;
  };

  const getNoteById = useCallback(
    async (id: string) => {
      const token = await getToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.note;
    },
    [getToken],
  );

  const updateNote = useCallback(
    async (id: string, note: UpdateNoteDTO) => {
      const token = await getToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();
      return data.note;
    },
    [getToken],
  );

  const deleteNote = useCallback(
    async (id: string) => {
      const token = await getToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    },
    [getToken],
  );

  return { getUserNotes, createNote, getNoteById, updateNote, deleteNote };
}

export default useNotesAPI;
