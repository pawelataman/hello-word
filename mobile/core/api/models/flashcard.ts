import { DictionaryWord } from "@/core/api/models/dictionary";

export interface FlashcardBrief {
  id: number;
  name: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  wordQty: number;
}

export interface FlashcardDetails extends FlashcardBrief {
  words: DictionaryWord[];
}

export interface CreateFlashcardRequest {
  flashcardName: string;
  flashcardColor: string;
  wordsIds: number[];
}
export interface CreateFlashcardResponse extends FlashcardBrief {}
export interface FlashcardDetailsResponse extends FlashcardBrief {
  words: DictionaryWord[];
}

export interface UpdateFlashcardRequest extends CreateFlashcardRequest {
  id: number;
}
export interface UpdateFlashcardResponse extends CreateFlashcardResponse {}
