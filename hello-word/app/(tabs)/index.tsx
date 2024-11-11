import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home</Text>
        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
      </View>
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
