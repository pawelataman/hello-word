import { View, Text, TouchableOpacity, Touchable } from "react-native";
import React, { useMemo, useState } from "react";
import AppButton from "../ui/AppButton";
import { ArrowCounterClockwise } from "phosphor-react-native";

export interface DistionaryFiltersModel {
  ascending: boolean;
  usersOnly: boolean;
}

export const INITIAL_FILTERS: DistionaryFiltersModel = {
  ascending: true,
  usersOnly: false,
};

interface DictionaryFiltersProps {
  onFiltersChange: (filters: DistionaryFiltersModel) => void;
  initialFilters: DistionaryFiltersModel;
}

export default function DictionaryFilters(filterProps: DictionaryFiltersProps) {
  const [filters, setFilters] = useState<DistionaryFiltersModel>({
    ...filterProps.initialFilters,
  });

  const hasFiltersChanged = useMemo(() => {
    return (
      JSON.stringify(filters) !== JSON.stringify(filterProps.initialFilters)
    );
  }, [filters, filterProps.initialFilters]);

  const areInitial = useMemo(() => {
    return JSON.stringify(filters) === JSON.stringify(INITIAL_FILTERS);
  }, [filters]);

  return (
    <View className="min-h-min p-4 gap-6 relative">
      <View>
        <Text className="font-bold text-lg">Sortuj</Text>
        <View className="flex-row gap-2 mt-2">
          <TouchableOpacity
            onPress={() => setFilters({ ...filters, ascending: true })}
            className={`px-4 py-2   rounded-full border-gray-400 ${filters.ascending ? "bg-gray-300" : ""}`}
          >
            <Text className="font-semibold">Alfabetycznie A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilters({ ...filters, ascending: false })}
            className={`px-4 py-2 rounded-full border-gray-400 ${!filters.ascending ? "bg-gray-300" : ""}`}
          >
            <Text className="font-semibold">Alfabetycznie Z-A</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text className="font-bold text-lg">Autor</Text>
        <View className="flex-row gap-2 mt-2">
          <TouchableOpacity
            onPress={() => setFilters({ ...filters, usersOnly: false })}
            className={`px-4 py-2   rounded-full border-gray-400 ${!filters.usersOnly ? "bg-gray-300" : ""}`}
          >
            <Text className="font-semibold">Wszystkie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilters({ ...filters, usersOnly: true })}
            className={`px-4 py-2  rounded-full border-gray-400  ${filters.usersOnly ? "bg-gray-300" : ""}`}
          >
            <Text className="font-semibold">Tylko moje</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AppButton
        label="Zastosuj"
        onPress={() => filterProps.onFiltersChange(filters)}
        variant="primary"
        disabled={!hasFiltersChanged}
      ></AppButton>
    </View>
  );
}
