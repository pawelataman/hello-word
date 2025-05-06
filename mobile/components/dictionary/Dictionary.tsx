import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { HttpClientContext } from "@/core/context/client-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  DictionaryWord,
  GetDictionaryWordsParams,
  GetDictionaryWordsResponse,
} from "@/core/api/models/dictionary";
import { LanguageCode } from "@/core/constants/common";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import Search from "@/components/ui/inputs/Search";
import { debounce } from "@/utils/timing";
import AppButton from "@/components/ui/AppButton";
import { useFocusEffect, useRouter } from "expo-router";
import { COLORS } from "@/core/constants/tailwind-colors";
import { useUser } from "@clerk/clerk-expo";
import * as Speech from "expo-speech";
import { Funnel, Pencil, SpeakerHigh } from "phosphor-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { bottomSheetBackdrop } from "../ui/BottomSheetBackDrop";
import DictionaryFilters, {
  DistionaryFiltersModel,
  INITIAL_FILTERS,
} from "./DictionaryFilters";
import EditWord from "./EditWord";
import { Word } from "@/core/api/models/quiz";
import { useRefetchOnFocus } from "@/core/hooks/useRefetchOnFocus";

const PAGE_SIZE = 20;
interface DictionaryProps {
  onSelectWord?: (word: DictionaryWord) => void;
  selectedWords?: { [key: number]: DictionaryWord | null };
  action?: {
    label: string;
    execute: () => void;
  };
}
export default function ({
  action,
  onSelectWord,
  selectedWords,
}: DictionaryProps) {
  const router = useRouter();
  const [bottomSheetView, setBottomSheetView] = useState<
    "filters" | "editWord"
  >("filters");
  const [filters, setFilters] = useState<DistionaryFiltersModel>({
    ...INITIAL_FILTERS,
  });
  const [search, setSearch] = useState<string>("");
  const [editWord, setEditWord] = useState<DictionaryWord | null>(null);
  const { user } = useUser();
  const { getDictionaryWords } = useContext(HttpClientContext)!;
  const { data, fetchNextPage, isLoading, isRefetching, hasNextPage, refetch } =
    useInfiniteQuery<GetDictionaryWordsResponse>({
      refetchOnWindowFocus: "always",
      queryKey: ["get-dictionary-words", filters, search],
      getNextPageParam: (lastPage, allPages) => {
        if (
          allPages.length < (lastPage as GetDictionaryWordsResponse).totalPages
        ) {
          return allPages.length + 1;
        }
        return null;
      },
      initialPageParam: 1,
      queryFn: ({
        pageParam,
        queryKey,
      }): Promise<GetDictionaryWordsResponse> => {
        const params: GetDictionaryWordsParams = {
          pageSize: PAGE_SIZE,
          page: pageParam as number,
          language: LanguageCode.PL,
          ascending: (queryKey[1] as DistionaryFiltersModel).ascending,
          search: queryKey[2] as string,
          usersOnly: (queryKey[1] as DistionaryFiltersModel).usersOnly,
        };
        return getDictionaryWords(params);
      },
    });

  useRefetchOnFocus(refetch);
  const currentUserEmail = useMemo(() => {
    return user?.emailAddresses?.[0]?.emailAddress;
  }, [user]);

  const dataFlattened = useMemo(() => {
    return data?.pages.flatMap((page) => page.records);
  }, [data]);

  const onReachEnd = useCallback(() => {
    if (!isLoading && hasNextPage) {
      return fetchNextPage();
    }
  }, [isLoading, hasNextPage, fetchNextPage]);

  const navigateAddWords = () => {
    router.navigate("/main/dictionary/new-words");
  };

  const playbackWord = async (word: string) => {
    if (await Speech.isSpeakingAsync()) return;

    Speech.speak(word, {
      language: LanguageCode.EN,
      rate: 0.5,
      onDone: () => {},
    });
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <>
      <View className={"px-2 py-6 flex-1 gap-y-2"}>
        <View className={"flex-row gap-2"}>
          <Search
            onChangeText={debounce(setSearch, 500)}
            placeholder={"Wyszukaj słówka"}
          ></Search>
          <TouchableOpacity
            onPress={() => {
              setBottomSheetView("filters");
              bottomSheetRef.current?.expand();
            }}
          >
            <View className={"self-start bg-white rounded-xl p-2"}>
              <Funnel size={20} color="#6b7280" />
            </View>
          </TouchableOpacity>
        </View>
        {dataFlattened?.length ? (
          <>
            <FlatList
              onRefresh={() => refetch()}
              refreshing={isRefetching}
              data={dataFlattened}
              renderItem={({ item, index }) => (
                <View className={"flex-row gap-2 items-center"}>
                  <TouchableOpacity
                    className={"flex-1 my-[5px]"}
                    key={item.id}
                    onPress={() => {
                      if (onSelectWord) {
                        onSelectWord(item);
                      } else if (item.author === currentUserEmail) {
                        setBottomSheetView("editWord");
                        setEditWord(item);
                        bottomSheetRef.current?.expand();
                      }
                    }}
                  >
                    <DictionaryItem
                      icon={
                        !onSelectWord &&
                        item.author === currentUserEmail && (
                          <Pencil color={COLORS.gray["500"]} size={20} />
                        )
                      }
                      isSelected={Boolean(selectedWords?.[item.id])}
                    >
                      <Text className={"text-xl font-bold"}>{item["pl"]}</Text>
                      <Text className={"text-lg text-gray-500"}>
                        {item["en"]}
                      </Text>
                    </DictionaryItem>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => playbackWord(item["en"])}
                    className={"bg-white p-1.5 rounded-xl"}
                  >
                    <SpeakerHigh color={COLORS["green"]["500"]} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={onReachEnd}
              onEndReachedThreshold={0.2}
            />
            <View>
              <AppButton
                variant={"primary"}
                label={action?.label || "Dodaj słówka +"}
                onPress={action?.execute || navigateAddWords}
              />
            </View>
          </>
        ) : (
          <View className={"items-center justify-center h-4/5 gap-4"}>
            <Text className={"text-gray-500 font-semibold"}>
              Nie znaleziono żadnych słówek
            </Text>
            <View>
              <AppButton
                variant={"primary"}
                label={action?.label || "Dodaj słówka +"}
                onPress={action?.execute || navigateAddWords}
              />
            </View>
          </View>
        )}

        {!isLoading && !dataFlattened?.length && (
          <View className={"items-center justify-center h-4/5"}>
            <Text className={"text-gray-500 font-semibold"}>
              Nie znaleziono żadnych słówek
            </Text>
            <AppButton
              variant={"primary"}
              label={action?.label || "Dodaj słówka +"}
              onPress={action?.execute || navigateAddWords}
            />
          </View>
        )}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          backdropComponent={bottomSheetBackdrop}
          enablePanDownToClose={false}
          handleComponent={null}
          keyboardBlurBehavior={"restore"}
          enableContentPanningGesture={false}
        >
          <BottomSheetView key={bottomSheetView}>
            {bottomSheetView === "filters" && (
              <DictionaryFilters
                onFiltersChange={(filters) => {
                  setFilters(filters);
                  bottomSheetRef.current?.close();
                }}
                initialFilters={{ ...filters }}
              />
            )}
            {bottomSheetView === "editWord" && editWord && (
              <EditWord
                word={editWord}
                key={editWord.id}
                onSuccess={() => {
                  refetch();
                  setTimeout(() => {
                    bottomSheetRef.current?.close();
                  }, 100);
                }}
              />
            )}
          </BottomSheetView>
        </BottomSheet>
      </View>
      {isLoading || isRefetching ? (
        <View className=" bg-gray-100/50 absolute top-0 bottom-0 left-0 right-0  h-full w-full items-center justify-center gap-4">
          <ActivityIndicator size="small" color={"#22c55e"} />
        </View>
      ) : null}
    </>
  );
}
