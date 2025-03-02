import { View } from "react-native";
import { memo, ReactNode } from "react";

interface DictionaryItemProps {
  children: ReactNode;
  isSelected: boolean;
  icon?: ReactNode;
}

export default memo(function ({
  children,
  icon,
  isSelected,
}: DictionaryItemProps) {
  return (
    <View
      className={`w-full mt-2 rounded-lg flex-row justify-between items-center px-4 py-2  flex-1 ${isSelected ? "bg-green-200" : "bg-white"}`}
    >
      <View className={"flex-row flex-wrap w-[95%] gap-x-2 "}>{children}</View>
      {icon && <View>{icon}</View>}
    </View>
  );
});
