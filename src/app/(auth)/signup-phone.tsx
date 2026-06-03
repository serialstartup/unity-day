import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SignupPhoneScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-5 py-10">

          {/* Header */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 rounded-full bg-[#c89b3c] items-center justify-center mb-4">
              <Text className="text-4xl">💰</Text>
            </View>
            <Text className="text-2xl font-jakarta-bold text-text-primary text-center">
              Aramıza Katıl
            </Text>
            <Text className="text-sm font-jakarta text-text-muted text-center mt-2 px-4">
              Tasarruf yolculuğuna başlamak için telefon numaranı doğrula.
            </Text>
          </View>

          {/* Card */}
          <View className="bg-surface rounded-3xl border border-border p-6">

            {/* Phone Input */}
            <Text className="text-sm font-jakarta-semibold text-text-primary mb-2">
              Telefon Numaran
            </Text>
            <View className="flex-row items-center h-14 bg-background border border-border rounded-2xl overflow-hidden">
              <View className="px-4 h-full justify-center border-r border-border">
                <Text className="font-jakarta-semibold text-text-primary">+90</Text>
              </View>
              <TextInput
                className="flex-1 px-4 font-jakarta text-text-primary"
                placeholder="5xx xxx xx xx"
                placeholderTextColor="#5e5e5b"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={13}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="mt-6 h-14 bg-[#c89b3c] rounded-2xl items-center justify-center"
              onPress={() => router.push("/(auth)/signup-profile")}
              activeOpacity={0.9}
            >
              <Text className="font-jakarta-bold text-lg text-[#4b3500]">
                Doğrulama Kodu Gönder
              </Text>
            </TouchableOpacity>

          </View>

          {/* Disclaimer */}
          <Text className="text-xs font-jakarta text-text-muted text-center mt-6 px-4">
            Devam ederek{" "}
            <Text className="text-[#c89b3c] font-jakarta-semibold">Kullanım Koşulları</Text>
            {" "}ve{" "}
            <Text className="text-[#c89b3c] font-jakarta-semibold">Gizlilik Politikamızı</Text>
            {" "}kabul etmiş olursun.
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
