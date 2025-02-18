import { DictionaryWord } from "@/core/api/models/dictionary";

export interface FlashcardBrief {
  id: number;
  name: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
}

export interface FlashcardDetails extends FlashcardBrief {
  words: DictionaryWord[];
}

export interface CreateFlashcardRequest {
  name: string;
}
