import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-text-primary font-jakarta-bold text-2xl">Group: {id}</Text>
    </View>
  );
}
