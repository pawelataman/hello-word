import { Stack } from "expo-router";

export default function () {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="new-flashcard"
        options={{ title: "Dodaj fiszke", presentation: "modal" }}
      />
      <Stack.Screen
        name="new-words"
        options={{
          presentation: "modal",
          title: "Dodaj słówka",
        }}
      />
    </Stack>
  );
}
