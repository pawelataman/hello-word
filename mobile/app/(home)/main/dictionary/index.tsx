import Dictionary from "@/components/dictionary/Dictionary";
import { Stack } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import { TabBar, TabBarIndicator, TabView } from "react-native-tab-view";
import Flashcards from "@/components/dictionary/Flashcards";

const routes = [
  { key: "dictionary", title: "Wszystkie słówka" },
  { key: "flashcards", title: "Fiszki" },
];

export default function () {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [rerenderTrigger, setRerenderTrigger] = useState<number>(0);

  const renderScene = useCallback(
    ({ route }: { route: any }) => {
      switch (route.key) {
        case "dictionary":
          return <Dictionary />;
        case "flashcards":
          return <Flashcards key={rerenderTrigger} />;
        default:
          return null;
      }
    },
    [index],
  );

  return (
    <SafeAreaView className={"flex-1"}>
      <View className="flex-1  relative ">
        <Stack.Screen
          options={{
            title: "Słownik",
          }}
        />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{ backgroundColor: "#f3f4f6" }}
              activeColor={"#22c55e"}
              indicatorStyle={{ backgroundColor: "#22c55e" }}
              inactiveColor={"black"}
              renderIndicator={(tabBarIndicatorProps) => (
                <TabBarIndicator
                  {...tabBarIndicatorProps}
                  style={[tabBarIndicatorProps.style, { height: 3 }]}
                />
              )}
            />
          )}
          onIndexChange={(index) => {
            setRerenderTrigger((prev) => prev + 1);
            setIndex(index);
          }}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </SafeAreaView>
  );
}
