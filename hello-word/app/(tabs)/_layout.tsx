import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.yellow,
        tabBarInactiveTintColor: Colors.light.white,
        tabBarStyle: {
          backgroundColor: Colors.light.green,
        },
        headerStyle: {
          backgroundColor: Colors.light.green,
        },
        headerTitleStyle: {
          color: Colors.light.white,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Start" }}
      />
      <Tabs.Screen name="dictionary" options={{ title: "Słownik" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
      <Tabs.Screen name="settings" options={{ title: "Ustawienia" }} />
    </Tabs>
  );
}
