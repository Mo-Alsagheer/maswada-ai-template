import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesAPI from "@/hooks/useNotesAPI";
import { ArrowLeft, ArrowRight, Languages, Book, Pencil } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Note, RewriteMode } from "@/types";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import AutoSaveIndicator from "@/components/note/AutoSaveIndicator";
import useAutoSave from "@/hooks/useAutoSave";
import useAIFeaturesAPI from "@/hooks/useAIFeaturesAPI";
import { detectTextDirection } from "@/lib/utils";
import { useIntl } from "react-intl";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function NoteDetailPage() {
    const { navigate, localeNavigate } = useLocaleNavigate()
    const { getNoteById, updateNote, deleteNote } = useNotesAPI()
    const { translate, summarize, rewrite } = useAIFeaturesAPI()
    const { id } = useParams()
    const [note, setNote] = useState<Note | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [userEdited, setUserEdited] = useState(false)
    const intl = useIntl()
    const { isRTL } = useLanguage()

    const textDirection = useMemo(() => detectTextDirection(note?.content || ""), [note?.content])

    const handleSave = useCallback(async () => {
        if (!note) return
        await updateNote(note.id, { title: note.title, content: note.content })
        setUserEdited(false)
    }, [note, updateNote])

    const { autoSaveStatus, setAutoSaveStatus } = useAutoSave({ note, userEdited, handleSave })

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchNote = async () => {
            if (!id) return
            const note = await getNoteById(id)
            if (note) {
                setNote(note)
                setIsLoading(false)
            }

        }
        fetchNote()
    }, [getNoteById, id])


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(prev => prev ? { ...prev, title: e.target.value } : null)
        setUserEdited(true)
        setAutoSaveStatus("unsaved")
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(prev => prev ? { ...prev, content: e.target.value } : null)
        setUserEdited(true)
        setAutoSaveStatus("unsaved")
    }

    const handleDelete = async () => {
        if (!note) return
        const success = await deleteNote(note.id)
        if (success) {
            localeNavigate("/")
            toast.success(intl.formatMessage({ id: 'toast.noteDeleted' }))
        }
    }

    const handleTranslate = async () => {
        if (!note) return
        const result = await translate({ noteId: note.id })
        if (result) {
            setNote(prev => prev ? { ...prev, content: result } : null)
            setUserEdited(true)
            setAutoSaveStatus("unsaved")
            toast.success(intl.formatMessage({ id: 'toast.noteTranslated' }))
            return
        }

        toast.error(intl.formatMessage({ id: 'toast.translateFailed' }))
    }

    const handleSummarize = async () => {
        if (!note) return
        const result = await summarize({ noteId: note.id })
        if (result) {
            setNote(prev => prev ? { ...prev, content: result } : null)
            setUserEdited(true)
            setAutoSaveStatus("unsaved")
            toast.success(intl.formatMessage({ id: 'toast.noteSummarized' }))
            return
        }

        toast.error(intl.formatMessage({ id: 'toast.summarizeFailed' }))
    }

    const handleRewrite = async (mode: RewriteMode) => {
        if (!note) return
        const result = await rewrite({ noteId: note.id, mode })
        if (result) {
            setNote(prev => prev ? { ...prev, content: result } : null)
            setUserEdited(true)
            setAutoSaveStatus("unsaved")
            toast.success(intl.formatMessage({ id: 'toast.noteRewritten' }))
            return
        }

        toast.error(intl.formatMessage({ id: 'toast.rewriteFailed' }))
    }

    if (isLoading && !note) {
        return <div>{intl.formatMessage({ id: 'noteDetail.loading' })}</div>
    }

    return (
        <GlassCard className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="cursor-pointer" onClick={handleBack}>
                        {isRTL ? <ArrowRight /> : <ArrowLeft />}
                        {intl.formatMessage({ id: 'noteDetail.back' })}
                    </Button>
                    <AutoSaveIndicator autoSaveStatus={autoSaveStatus} />
                </div>
                <DeleteDialog 
                    handleDelete={handleDelete}
                    title={intl.formatMessage({ id: 'noteDetail.deleteTitle' })}
                    description={intl.formatMessage({ id: 'noteDetail.deleteDescription' })}
                />
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={handleTranslate}>
                    <Languages />
                    {intl.formatMessage({ id: 'noteDetail.translate' })}
                </Button>
                <Button onClick={handleSummarize}>
                    <Book />
                    {intl.formatMessage({ id: 'noteDetail.summarize' })}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <Pencil />
                            {intl.formatMessage({ id: 'noteDetail.changeTone' })}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => handleRewrite('comedy')}>
                                {intl.formatMessage({ id: 'noteDetail.comedy' })}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRewrite('formal')}>
                                {intl.formatMessage({ id: 'noteDetail.formal' })}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRewrite('casual')}>
                                {intl.formatMessage({ id: 'noteDetail.casual' })}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>  
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex flex-col gap-4">
                <Input
                    value={note?.title || ""}
                    className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 !text-5xl font-bold h-auto py-2"
                    placeholder={intl.formatMessage({ id: 'noteDetail.titlePlaceholder' })}
                    onChange={handleTitleChange}
                />
                <Textarea
                    dir={textDirection}
                    rows={20}
                    value={note?.content || ""}
                    className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[400px]"
                    placeholder={intl.formatMessage({ id: 'noteDetail.contentPlaceholder' })}
                    onChange={handleContentChange}
                />
            </div>
        </GlassCard>
    )
}

export default NoteDetailPage;