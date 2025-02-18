import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { HttpClientContext } from "@/core/context/client-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  GetDictionaryWordsParams,
  GetDictionaryWordsResponse,
} from "@/core/api/models/dictionary";
import { LANG_CODE } from "@/core/constants/common";
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
export default function () {
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
          language: LANG_CODE.PL,
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
      <View className={"px-2 flex-1 gap-y-2"}>
        <View className={"flex-row gap-2 mt-4"}>
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
                <View key={item.id}>
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
                  >
                    <Text className={"text-xl font-bold"}>{item["pl"]}</Text>
                    <Text className={"text-lg text-gray-500"}>
                      {item["en"]}
                    </Text>
                  </DictionaryItem>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={onReachEnd}
              onEndReachedThreshold={0.2}
            />
            <View className={"my-2"}>
              <AppButton
                variant={"primary"}
                label={"Dodaj słówka +"}
                onPress={navigateAddWords}
              />
            </View>
          </>
        ) : null}

        {!isLoading && !dataFlattened?.length && (
          <View className={"items-center justify-center h-4/5"}>
            <Text className={"text-gray-500 font-semibold mb-4"}>
              Nie znaleziono żadnych słówek
            </Text>
            <AppButton
              variant={"primary"}
              label={"Dodaj słówka +"}
              onPress={navigateAddWords}
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
}
