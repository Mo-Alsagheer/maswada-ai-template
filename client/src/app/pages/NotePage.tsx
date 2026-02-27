import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Book,
  Pencil,
  Sparkles,
  Loader2,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Note, ToneMode } from "@/types";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { AutoSaveIndicator } from "@/components/note/AutoSaveIndicator";
import { useAutoSave } from "@/hooks/useAutoSave";
import useAIFeaturesAPI from "@/hooks/useAIFeaturesAPI";
import { detectTextDirection } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useIntl } from "react-intl";

export function NotePage() {
  const intl = useIntl();
  const { isRTL } = useLanguage();
  const { getNoteById, updateNote, deleteNote } = useNotesAPI();
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProcess, setActiveProcess] = useState<
    "translate" | "summarize" | "tone" | null
  >(null);
  const navigate = useNavigate();
  const { translate, summarize, rewrite } = useAIFeaturesAPI();
  const { autoSaveStatus, markAsUnsaved } = useAutoSave(note, updateNote);
  const textDirection = useMemo(
    () => detectTextDirection(note?.content || ""),
    [note?.content],
  );

  // fetch note by id
  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      const note = await getNoteById(id);
      if (note) {
        setNote(note);
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [getNoteById, id]);

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prev) => prev && { ...prev, title: e.target.value });
    markAsUnsaved();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prev) => prev && { ...prev, content: e.target.value });
    markAsUnsaved();
  };

  const handleDeleteNote = async () => {
    if (!note) return;
    await deleteNote(note.id);
    toast.success(intl.formatMessage({ id: "note.deleteSuccess" }));
    navigate(-1);
  };

  const handleTranslate = async () => {
    if (!note) return;
    setActiveProcess("translate");
    try {
      const translatedContent = await translate({ noteId: note.id });
      if (translatedContent) {
        setNote((prev) => prev && { ...prev, content: translatedContent });
        markAsUnsaved();
        toast.success(intl.formatMessage({ id: "note.translateSuccess" }));
      }
    } finally {
      setActiveProcess(null);
    }
  };

  const handleSummarize = async () => {
    if (!note) return;
    setActiveProcess("summarize");
    try {
      const summarizedContent = await summarize({ noteId: note.id });
      if (summarizedContent) {
        setNote((prev) => prev && { ...prev, content: summarizedContent });
        markAsUnsaved();
        toast.success(intl.formatMessage({ id: "note.summarizeSuccess" }));
        return;
      }
      toast.error(intl.formatMessage({ id: "note.summarizeError" }));
    } finally {
      setActiveProcess(null);
    }
  };

  const handleChangeTone = async (mode: ToneMode) => {
    if (!note) return;
    setActiveProcess("tone");
    try {
      const changedToneContent = await rewrite({ noteId: note.id, mode });
      if (changedToneContent) {
        setNote((prev) => prev && { ...prev, content: changedToneContent });
        markAsUnsaved();
        toast.success(intl.formatMessage({ id: "note.toneSuccess" }));
        return;
      }
      toast.error(intl.formatMessage({ id: "note.toneError" }));
    } finally {
      setActiveProcess(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in duration-700">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full border-t-2 border-primary/40 animate-spin-slow"></div>
          <div className="absolute w-16 h-16 rounded-full border-b-2 border-primary/60 animate-spin"></div>
          <div className="bg-primary/5 p-4 rounded-full backdrop-blur-sm animate-pulse-subtle border border-primary/20">
            <Book className="w-8 h-8 text-primary/80" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-medium tracking-tight text-foreground/80">
            {intl.formatMessage({ id: "note.loadingTitle" })}
          </h2>
          <p className="text-sm text-muted-foreground animate-pulse-subtle">
            {intl.formatMessage({ id: "note.loadingSubtitle" })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GlassCard className="flex flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="w-fit"
              onClick={handleBackButton}
            >
              {isRTL ? <ArrowRight /> : <ArrowLeft />}
              {intl.formatMessage({ id: "note.backButton" })}
            </Button>
            <AutoSaveIndicator status={autoSaveStatus} />
          </div>
          <div className="flex items-center gap-2">
            <DeleteDialog
              title={intl.formatMessage({ id: "note.deleteDialogTitle" })}
              description={intl.formatMessage({
                id: "note.deleteDialogDescription",
              })}
              handleDelete={handleDeleteNote}
              buttonText={<Trash2 />}
            />
            {/* Mobile Actions Dropdown */}
            <div className="flex sm:hidden items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={activeProcess !== null}
                  >
                    {activeProcess !== null ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <MoreHorizontal />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={handleTranslate}
                    disabled={activeProcess !== null}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {intl.formatMessage({ id: "note.translateButton" })}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSummarize}
                    disabled={activeProcess !== null}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    {intl.formatMessage({ id: "note.summarizeButton" })}
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger disabled={activeProcess !== null}>
                      <Pencil className="mr-2 h-4 w-4" />
                      {intl.formatMessage({ id: "note.changeToneButton" })}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onClick={() => handleChangeTone("formal")}
                        >
                          {intl.formatMessage({ id: "note.toneFormal" })}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleChangeTone("casual")}
                        >
                          {intl.formatMessage({ id: "note.toneCasual" })}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleChangeTone("comedy")}
                        >
                          {intl.formatMessage({ id: "note.toneComedy" })}
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              className="w-fit"
              onClick={handleTranslate}
              disabled={activeProcess !== null}
            >
              {activeProcess === "translate" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles />
              )}
              {intl.formatMessage({ id: "note.translateButton" })}
            </Button>
            <Button
              className="w-fit"
              onClick={handleSummarize}
              disabled={activeProcess !== null}
            >
              {activeProcess === "summarize" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Book />
              )}
              {intl.formatMessage({ id: "note.summarizeButton" })}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={activeProcess !== null}>
                  {activeProcess === "tone" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Pencil />
                  )}
                  {intl.formatMessage({ id: "note.changeToneButton" })}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => handleChangeTone("formal")}>
                    {intl.formatMessage({ id: "note.toneFormal" })}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeTone("casual")}>
                    {intl.formatMessage({ id: "note.toneCasual" })}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeTone("comedy")}>
                    {intl.formatMessage({ id: "note.toneComedy" })}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Input
          placeholder={intl.formatMessage({ id: "note.titlePlaceholder" })}
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 text-3xl sm:text-5xl! font-bold placeholder:text-3xl sm:placeholder:text-5xl! placeholder:font-bold h-16 sm:h-20 px-0"
          value={note?.title}
          onChange={handleTitleChange}
        />
        <Textarea
          dir={textDirection}
          rows={20}
          placeholder={intl.formatMessage({ id: "note.contentPlaceholder" })}
          className="bg-transparent dark:bg-transparent border-none text-base sm:text-lg focus-visible:ring-0 min-h-[400px] px-0"
          value={note?.content}
          onChange={handleContentChange}
        />
      </GlassCard>
    </div>
  );
}
