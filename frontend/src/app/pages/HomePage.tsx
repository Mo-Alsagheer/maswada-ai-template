import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useMemo } from "react"
import type { Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate"
import { useIntl } from "react-intl"


export function HomePage() {
  const { getAllNotes, createNote } = useNotesAPI()
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { localeNavigate } = useLocaleNavigate()
  const intl = useIntl()

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getAllNotes()
      setNotes(notes)
    }
    fetchNotes()
  }, [getAllNotes])

  // Filter notes based on search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes
    }

    const query = searchQuery.toLowerCase()
    return notes.filter((note) =>
      note.title.toLowerCase().includes(query)
    )
  }, [notes, searchQuery])

  const handleCreateNote = async () => {
    const note = await createNote({
      title: intl.formatMessage({ id: 'home.newNote' }),
      content: "-"
    })
    if (note) {
      localeNavigate(`/notes/${note.id}`)
    }
  }

  const handleNoteClick = (id: string) => {
    localeNavigate(`/notes/${id}`)
  }


  return (
    <div className="space-y-12">
      {/* Hero card */}
      <GlassCard className="flex flex-col px-4 py-6 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{intl.formatMessage({ id: 'home.myNotes' })}</h1>
          <Button onClick={handleCreateNote}>
            <Plus />
            {intl.formatMessage({ id: 'home.createNote' })}
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder={intl.formatMessage({ id: 'home.searchNotes' })}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <GlassCard onClick={() => handleNoteClick(note.id)} key={note.id} className="p-4 cursor-pointer">
                <h2 className="text-lg font-bold">{note.title}</h2>
              </GlassCard>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? intl.formatMessage({ id: 'home.noResults' }) : intl.formatMessage({ id: 'home.noNotes' })}
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
