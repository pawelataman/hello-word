import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useContext, useMemo, useState } from "react";
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
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "expo-router";
import { useRefetchOnFocus } from "@/core/hooks/useRefetchOnFocus";
import { COLORS } from "@/core/constants/tailwind-colors";
import { useUser } from "@clerk/clerk-expo";

const PAGE_SIZE = 20;
interface DictionaryProps {
  onSelectWord?: (word: DictionaryWord) => void;
  selectedWords?: { [key: number]: DictionaryWord | null };
  action?: {
    label: string;
    execute: () => void;
  };
}
export default memo(function ({
  action,
  onSelectWord,
  selectedWords,
}: DictionaryProps) {
  const router = useRouter();
  const [ascending, setAscending] = useState(true);
  const [search, setSearch] = useState<string>("");
  const { user } = useUser();
  const { getDictionaryWords } = useContext(HttpClientContext)!;
  const { data, fetchNextPage, isLoading, isRefetching, hasNextPage, refetch } =
    useInfiniteQuery<GetDictionaryWordsResponse>({
      refetchOnWindowFocus: "always",
      queryKey: ["get-dictionary-words", ascending, search],
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
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
          ascending: queryKey[1] as boolean,
          search: queryKey[2] as string,
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

  return (
    <>
      <View className={"px-2 py-6 flex-1 gap-y-2"}>
        <View className={"flex-row gap-2"}>
          <Search
            onChangeText={debounce(setSearch, 500)}
            placeholder={"Wyszukaj słówka"}
          ></Search>
          <TouchableOpacity onPress={() => setAscending(!ascending)}>
            <MaterialCommunityIcons
              name={
                ascending
                  ? "sort-alphabetical-ascending"
                  : "sort-alphabetical-descending"
              }
              size={20}
              color="#6b7280"
              className={"self-start bg-white rounded-xl p-2"}
            />
          </TouchableOpacity>
        </View>
        {dataFlattened?.length ? (
          <>
            <FlatList
              data={dataFlattened}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onSelectWord?.(item)}
                >
                  <DictionaryItem
                    icon={
                      item.author === currentUserEmail && (
                        <AntDesign
                          name={"user"}
                          color={COLORS.gray["500"]}
                          size={16}
                        />
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
        ) : null}

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
      </View>
      {isLoading || isRefetching ? (
        <View className=" bg-gray-100/50 absolute top-0 bottom-0 left-0 right-0  h-full w-full items-center justify-center gap-4">
          <ActivityIndicator size="small" color={"#22c55e"} />
        </View>
      ) : null}
    </>
  );
});
