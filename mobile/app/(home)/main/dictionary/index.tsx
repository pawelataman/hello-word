import Dictionary from "@/components/dictionary/Dictionary";
import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import {
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabView,
} from "react-native-tab-view";
import { NativeStackHeaderRightProps } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";

const renderScene = SceneMap({
  dictionary: Dictionary,
  flashcards: () => <View></View>,
});

const routes = [
  { key: "dictionary", title: "Wszystkie słówka" },
  { key: "flashcards", title: "Fiszki" },
];

export default function () {
  const layout = useWindowDimensions();
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const headerRightButton = useCallback(
    (props: NativeStackHeaderRightProps) => (
      <TouchableOpacity
        className={" justify-center items-center text-center"}
        onPress={() => router.navigate("/(home)/main/dictionary/new-words")}
      >
        <Entypo className={"mr-4"} size={24} name={"add-to-list"}></Entypo>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View className="flex-1 relative bg-gray-200">
      <Stack.Screen
        options={{
          title: "Słownik",
          headerRight: headerRightButton,
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
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
