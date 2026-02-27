export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNoteDTO = {
  title: string;
  content: string;
};

export type UpdateNoteDTO = {
  title?: string;
  content?: string;
};

export type AutoSaveStatus = "initial" | "saving" | "saved" | "unsaved";

export type TranslateInputDTO = {
  noteId?: string;
  text?: string;
};

export type TranslateOutputDTO = {
  result: string;
};

export type SummarizeInputDTO = {
  noteId?: string;
  text?: string;
};

export type SummarizeOutputDTO = {
  result: string;
};

export type ToneMode = "formal" | "casual" | "comedy";

export type ChangeToneInputDTO = {
  noteId?: string;
  mode?: ToneMode;
};

export type ChangeToneOutputDTO = {
  result: string;
};
