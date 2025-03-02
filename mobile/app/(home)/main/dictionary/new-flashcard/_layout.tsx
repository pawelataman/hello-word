import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Dodaj fiszkę" }} />
      <Stack.Screen
        name="add-flashcards-words"
        options={{ presentation: "modal", headerTitle: "Dodaj słówka" }}
      />
    </Stack>
  );
}
