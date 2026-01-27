import type { Note, CreateNoteDTO, UpdateNoteDTO } from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { useCallback } from "react"
import { API_BASE_URL } from "@/lib/utils"

function useNotesAPI() {
    const { getToken } = useAuth()

    const getAllNotes = useCallback(async () => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return []
        }

        const response = await fetch(API_BASE_URL + "/api/notes", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        
        const data: { notes: Note[] } = await response.json()
        
        return data.notes
    }, [getToken])

    const createNote = async (note: CreateNoteDTO) => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return null
        }

        const response = await fetch(API_BASE_URL + "/api/notes", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        
        const data: { note: Note } = await response.json()
        
        return data.note
    }

    const getNoteById = useCallback(async (id: string) => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return null
        }

        const response = await fetch(API_BASE_URL + "/api/notes/" + id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        
        const data: { note: Note } = await response.json()
        
        return data.note
    }, [getToken])

    const updateNote = async (id: string, note: UpdateNoteDTO) => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return null
        }

        const response = await fetch(API_BASE_URL + "/api/notes/" + id, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        
        const data: { note: Note } = await response.json()

        return data.note
    }

    const deleteNote = async (id: string) => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return null
        }

        const response = await fetch(API_BASE_URL + "/api/notes/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        
        return response.ok
    }

    return { getAllNotes, createNote, getNoteById, updateNote, deleteNote }
}


export default useNotesAPI;