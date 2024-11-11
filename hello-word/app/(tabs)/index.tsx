import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeUserTokens from "@/components/home/HomeUserTokens";
import { Colors } from "@/constants/Colors";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeUserTokens></HomeUserTokens>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: Colors.light.white,
    height: "100%",
  },
});
