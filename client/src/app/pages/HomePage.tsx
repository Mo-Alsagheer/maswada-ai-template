import { Plus, Search, Book } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useDebounce } from "@/hooks/useDebounce";
import type { Note } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIntl } from "react-intl";

export function HomePage() {
  const intl = useIntl();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { getUserNotes, createNote } = useNotesAPI();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchNotes = async () => {
      setIsLoading(true);
      const fetchedNotes = await getUserNotes();
      if (mounted) {
        setNotes(fetchedNotes);
        setIsLoading(false);
      }
    };
    fetchNotes();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreateNote = async () => {
    const note = await createNote({
      title: intl.formatMessage({ id: "home.untitledNote" }),
      content: "",
    });
    if (note) {
      navigate(`/note/${note.id}`);
    }
  };

  const handleNoteClick = (id: string) => {
    navigate(`/note/${id}`);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredNotes = notes.filter((note) => {
    const title = note.title || intl.formatMessage({ id: "home.untitledNote" });
    return title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
  });

  return (
    <div className="space-y-12">
      {/* Hero card */}
      <GlassCard className="px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {intl.formatMessage({ id: "home.title" })}
          </h1>
          <Button onClick={handleCreateNote}>
            <Plus />
            {intl.formatMessage({ id: "home.createNote" })}
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={intl.formatMessage({ id: "home.searchPlaceholder" })}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 animate-in fade-in duration-700">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full border-t-2 border-primary/40 animate-spin-slow"></div>
              <div className="absolute w-12 h-12 rounded-full border-b-2 border-primary/60 animate-spin"></div>
              <div className="bg-primary/5 p-3 rounded-full backdrop-blur-sm animate-pulse-subtle border border-primary/20">
                <Book className="w-6 h-6 text-primary/80" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-lg font-medium text-foreground/80">
                {intl.formatMessage({ id: "home.loadingVault" })}
              </h3>
              <p className="text-sm text-muted-foreground animate-pulse-subtle">
                {intl.formatMessage({ id: "home.syncingNotes" })}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                <p>
                  {debouncedSearchQuery
                    ? intl.formatMessage({ id: "home.noSearchResults" })
                    : intl.formatMessage({ id: "home.noNotes" })}
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <GlassCard
                  onClick={() => handleNoteClick(note.id)}
                  key={note.id}
                  className="p-4 h-40 flex flex-col justify-between cursor-pointer hover:bg-black/5 hover:border-black/20 dark:hover:bg-white/5 dark:hover:border-white/20 transition-all group"
                >
                  <h3 className="font-semibold text-2xl group-hover:text-primary transition-colors">
                    {note.title ||
                      intl.formatMessage({ id: "home.untitledNote" })}
                  </h3>
                  <p className="text-sm text-muted-foreground opacity-80 mt-auto text-end">
                    {new Date(note.updatedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </GlassCard>
              ))
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
