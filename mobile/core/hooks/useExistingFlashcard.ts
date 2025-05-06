import { useLocalSearchParams } from "expo-router";
import { HttpClientContext } from "@/core/context/client-context";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

export function useExistingFlashcard() {
  const { flashcardId } = useLocalSearchParams<{ flashcardId: string }>();

  if (!flashcardId) return { data: null, isPending: false };

  const { getFlashcardDetails } = useContext(HttpClientContext)!;
  const { data, isPending } = useQuery({
    queryKey: [flashcardId, "get-flashcard-details"],
    enabled: Boolean(flashcardId),
    queryFn: ({ queryKey }) => getFlashcardDetails(parseInt(queryKey[0])),
  });

  return { data, isPending: Boolean(flashcardId) ? isPending : false };
}
