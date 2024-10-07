import { StyleSheet, View, Text, Button } from "react-native";
import { Colors } from "@/constants/Colors";
import CreditCard from "@/assets/images/icons/credit_card.svg";
import { BOLD, NORMAL, SEMIBOLD } from "@/constants/Typography";
export default function () {
  return (
    <View style={styles.container}>
      <View style={styles.tokensContainer}>
        <View style={styles.icon}>
          <CreditCard color={Colors.light.blue} />
        </View>
        <Text style={styles.credits}>200 Kredytów</Text>
      </View>
      {/*<Button title={"Dodaj tokeny"}></Button>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.bgLight,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 11,
  },
  icon: {
    color: "red",
    marginRight: 8,
  },
  tokensContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "red",
  },
  credits: {
    ...SEMIBOLD,
  },
});
