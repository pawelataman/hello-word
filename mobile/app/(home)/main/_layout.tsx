import { Tabs } from "expo-router";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import Book from "@/assets/images/icons/book_open.svg";
import Brain from "@/assets/images/icons/brain.svg";
import Settings from "@/assets/images/icons/settings.svg";
import Person from "@/assets/images/icons/person.svg";

export default function () {
  return (
    <SafeAreaView className={"flex-1 bg-white"}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#22c55e",
          tabBarStyle: {
            height: Platform.select({ android: 64, ios: 48 }),
            paddingTop: 12,
          },
          headerStatusBarHeight: 0,
          headerShown: true,
          headerTitleAlign: "center",
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profil",
            tabBarIcon: ({ color }) => (
              <>
                <Person width={32} height={32} color={color} />
              </>
            ),
            headerShadowVisible: false,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            animation: "shift",
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            animation: "shift",
            headerShadowVisible: false,
            tabBarIcon: ({ color }) => (
              <>
                <Brain width={32} height={32} color={color} />
              </>
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="dictionary"
          options={{
            popToTopOnBlur: true,
            tabBarIcon: ({ color }) => (
              <>
                <Book width={32} height={32} color={color} />
              </>
            ),
            animation: "shift",
            headerShown: false,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="settings"
          options={{
            title: "Opcje",
            tabBarIcon: ({ color }) => (
              <>
                <Settings width={32} height={32} color={color} />
              </>
            ),
            animation: "shift",
            headerShadowVisible: false,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}
        ></Tabs.Screen>
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 12,
    marginTop: 4,
  },
});
